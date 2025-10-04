// import { HSLtoRGB, RGBtoHSL } from "./color_convertors";

document.querySelectorAll(".collapsible").forEach((collapsibleElm) => {
  const btn = collapsibleElm.querySelector(
    ".collapse-btn"
  ) as HTMLButtonElement;
  const ul = collapsibleElm.querySelector("ul") as HTMLUListElement;
  {
    ul.style.maxHeight = ul.scrollHeight + "px";
  }

  btn.addEventListener("click", () => {
    const isCollapsed = ul.style.maxHeight == "0px";

    collapsibleElm.classList.toggle("collapsed", !isCollapsed);
    ul.style.maxHeight = isCollapsed ? ul.scrollHeight + "px" : "0px";
  });

  window.addEventListener("resize", () => {
    if (!collapsibleElm.classList.contains("collapsed"))
      ul.style.maxHeight = ul.scrollHeight + "px";
  });
});

const filtersAside = document.getElementById("filters-aside") as HTMLDivElement;
const filtersAsideToggleBtn = filtersAside.querySelector(
  "header button"
) as HTMLButtonElement;
filtersAsideToggleBtn.addEventListener("click", () =>
  filtersAside.classList.toggle("collapsed")
);

const timeline = document.getElementById("timeline")!;
document.querySelectorAll("#timeline > div").forEach((elem) => {
  const track = elem as HTMLDivElement;
  track.style.width = timeline.scrollWidth + "px";
});

// const getDominantColor = (imageEl: HTMLImageElement) => {
//   const canvas = document.createElement("canvas");
//   const ctx = canvas.getContext("2d")!;

//   canvas.width = 1;
//   canvas.height = 1;

//   ctx.drawImage(imageEl, 0, 0, 1, 1);
//   const imageData = ctx.getImageData(0, 0, 1, 1).data;

//   const red = imageData[0] / 255;
//   const green = imageData[1] / 255;
//   const blue = imageData[2] / 255;

//   return [red, green, blue];
// };

// const img = document.querySelector("#player img") as HTMLImageElement;
// let [red, green, blue] = getDominantColor(img);
// let [hue, saturation, luminace] = RGBtoHSL(red, green, blue);
// luminace = 0.5;
// [red, green, blue] = HSLtoRGB(hue, saturation, luminace);
// document.body.style.setProperty("--accent-clr", `${red} ${green} ${blue}`);
