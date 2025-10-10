class Asset {
  protected file: File;
  protected element: HTMLElement;

  constructor(file: File, element: HTMLElement) {
    this.file = file;
    this.element = element;
  }

  static NewAsset(file: File): Asset {
    if (file.type.startsWith("video")) return new VideoAsset(file);
    if (file.type.startsWith("audio")) return new AudioAsset(file);
    if (file.type.startsWith("image")) return new ImageAsset(file);
    throw new Error("unreachable");
  }

  getElem(): HTMLElement {
    return this.element;
  }
}

class VideoAsset extends Asset {
  private thumbnailElem: HTMLImageElement;
  private durationElem: HTMLSpanElement;

  constructor(file: File) {
    const element = document.createElement("li");
    super(file, element);

    this.thumbnailElem = document.createElement("img");
    this.durationElem = document.createElement("span");

    const hoverElem = document.createElement("div");
    hoverElem.classList.add("hover");
    hoverElem.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#e3e3e3">
        <path d="M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z"/>
    </svg>`;

    element.append(this.thumbnailElem, this.durationElem, hoverElem);

    this.getMetadata();
  }

  private getMetadata() {
    const videoElem = document.createElement("video");
    videoElem.src = URL.createObjectURL(this.file);
    console.log(videoElem);
    videoElem.load();
    videoElem.addEventListener("loadedmetadata", () => {
      console.log("loaded");
      videoElem.currentTime = videoElem.duration * 0.1;
      this.durationElem.innerText = formatTime(videoElem.duration);

      videoElem.addEventListener("seeked", () => {
        const canvas = document.createElement("canvas");
        canvas.width = videoElem.videoWidth;
        canvas.height = videoElem.videoHeight;

        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(videoElem, 0, 0, canvas.width, canvas.height);

        ctx.canvas.toBlob(
          (blob) => (this.thumbnailElem.src = URL.createObjectURL(blob!))
        );
      });
    });
  }
}

class ImageAsset extends Asset {
  constructor(file: File) {
    const element = document.createElement("li");
    super(file, element);

    const thumbnail = document.createElement("img");

    const hoverElem = document.createElement("div");
    hoverElem.classList.add("hover")
    hoverElem.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#e3e3e3">
      <path d="M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z"/>
    </svg>`;

    element.append(thumbnail, hoverElem);

    thumbnail.src = URL.createObjectURL(this.file);
  }
}

class AudioAsset extends Asset {
  private durationElem: HTMLSpanElement;
  constructor(file: File) {
    const element = document.createElement("li");
    super(file, element);

    // const iconElem = document.createElement("span");
    element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#e3e3e3">
      <path d="M400-120q-66 0-113-47t-47-113q0-66 47-113t113-47q23 0 42.5 5.5T480-418v-382q0-17 11.5-28.5T520-840h160q17 0 28.5 11.5T720-800v80q0 17-11.5 28.5T680-680H560v400q0 66-47 113t-113 47Z"/>
    </svg>`;

    const label = document.createElement("p");
    this.durationElem = document.createElement("span");

    element.append(label, this.durationElem);

    label.innerText = file.name;
    this.durationElem.innerText = `00:00`;

    this.getMetadata();
  }

  private getMetadata() {
    const audioElem = document.createElement("audio");
    audioElem.src = URL.createObjectURL(this.file);
    audioElem.load();
    audioElem.addEventListener("loadedmetadata", () => {
      this.durationElem.innerText = formatTime(audioElem.duration);
    });
  }
}

class Assets {
  private assets: Array<Asset>;

  constructor() {
    this.assets = [];
  }

  append(asset: Asset) {
    this.assets.push(asset);
    let parentElem: HTMLUListElement;

    if (asset instanceof VideoAsset) {
      parentElem = videoAssetsElem;
    } else if (asset instanceof AudioAsset) {
      parentElem = audioAssetsElem;
    } else if (asset instanceof ImageAsset) {
      parentElem = imageAssetsElem;
    }

    parentElem = parentElem!

    const parentElemID = parentElem!.id;
    parentElem.appendChild(asset.getElem());

    

    document
      .querySelector(
        `#assets-aside section.collapsible:has(> #${parentElemID})`
      )!
      .classList.toggle("collapsed", false);
    
    const rows = Math.ceil(parentElem.children.length / 2)
    const cellHeight = parentElem.children[0].getBoundingClientRect().height
    const height = rows * cellHeight + (rows - 1) * 8;

    parentElem.style.maxHeight = height + "px";
  }
}

const assetsUploadBtn = document.getElementById(
  "upload-assets-btn"
) as HTMLButtonElement;
const videoAssetsElem = document.getElementById(
  "video-assets-ul"
) as HTMLUListElement;
const imageAssetsElem = document.getElementById(
  "image-assets-ul"
) as HTMLUListElement;
const audioAssetsElem = document.getElementById(
  "audio-assets-ul"
) as HTMLUListElement;

const assets = new Assets();

assetsUploadBtn.addEventListener("click", () => {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.multiple = true;
  fileInput.accept = "audio/*,video/*,image/*";

  fileInput.click();
  fileInput.addEventListener("change", () =>
    [...fileInput.files!].forEach((file) => assets.append(Asset.NewAsset(file)))
  );
});

const formatTime = (seconds: number): string => {
  let minutes = Math.floor(seconds / 60);
  seconds %= 60;

  const hours = Math.floor(minutes / 60);
  minutes %= 60;

  seconds = Math.floor(seconds);

  const secondsStr = seconds.toString().padStart(2, "0");
  const minutesStr = minutes.toString().padStart(2, "0");
  const hoursStr = hours.toString().padStart(2, "0");

  if (hours > 0) {
    return hoursStr + ":" + minutesStr + ":" + secondsStr;
  }
  return minutesStr + ":" + secondsStr;
};
