document.querySelectorAll(".collapsible").forEach((collapsibleElm) => {
  const btn = collapsibleElm.querySelector(
    ".collapse-btn"
  ) as HTMLButtonElement;
  const ul = collapsibleElm.querySelector("ul") as HTMLUListElement;
  ul.style.maxHeight = ul.scrollHeight + "px";

  btn.addEventListener("click", () => {
    const isCollapsed = ul.style.maxHeight == "0px";

    collapsibleElm.classList.toggle("collapsed", !isCollapsed);
    if (isCollapsed) {
      ul.style.maxHeight = ul.scrollHeight + "px";
    } else {
      ul.style.maxHeight = "0px";
    }
  });
});

const filtersAside = document.getElementById("filters-aside") as HTMLDivElement;
const filtersAsideToggleBtn = filtersAside.querySelector(
  "header button"
) as HTMLButtonElement;
const mainElem = document.querySelector("main") as HTMLDivElement;

let isFiltersOpen = false;
filtersAsideToggleBtn.addEventListener("click", () => {
  const options = {
    fill: "forwards",
    duration: 250,
  } as KeyframeAnimationOptions;
  if (isFiltersOpen) {
    filtersAside.animate({ width: "3.75rem" }, options);
    mainElem.animate({ width: "calc(80vw - 3.75rem)" }, options);
  } else {
    filtersAside.animate({ width: "20vw" }, options);
    mainElem.animate({ width: "60vw" }, options);
  }
  isFiltersOpen = !isFiltersOpen;
  filtersAside.classList.toggle("collapsed", !isFiltersOpen);
});

const timeline = document.getElementById("timeline")!;
timeline.addEventListener("resize", () => {
  document.querySelectorAll("#timeline > div").forEach((elem) => {
    const track = elem as HTMLDivElement;
    track.style.width = timeline.scrollWidth + "px";
  });
});

document.querySelectorAll("#timeline > div").forEach((elem) => {
  const track = elem as HTMLDivElement;
  track.style.width = timeline.scrollWidth + "px";
});
