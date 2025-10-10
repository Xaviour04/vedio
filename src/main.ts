document.querySelectorAll(".collapsible").forEach((collapsibleElm) => {
  const btn = collapsibleElm.querySelector(
    ".collapse-btn"
  ) as HTMLButtonElement;
  const ul = collapsibleElm.querySelector("ul") as HTMLUListElement;
  ul.style.maxHeight = ul.scrollHeight + "px";

  btn.addEventListener("click", () => {
    if (ul.children.length === 0) return;

    const isCollapsed = ul.style.maxHeight == "0px";
    collapsibleElm.classList.toggle("collapsed", !isCollapsed);

    // const rows = Math.ceil(ul.children.length / 2)
    // const cellHeight = ul.children[0].getBoundingClientRect().height
    // const height = rows * cellHeight + (rows - 1) * 8;

    ul.style.maxHeight = isCollapsed ? ul.scrollHeight + "px" : "0px";
  });

  window.addEventListener("resize", () => {
    if (collapsibleElm.classList.contains("collapsed")) return;

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

document
  .querySelectorAll(".collapsible:has(> ul:empty)")
  .forEach((elem) => elem.classList.toggle("collapsed", true));
