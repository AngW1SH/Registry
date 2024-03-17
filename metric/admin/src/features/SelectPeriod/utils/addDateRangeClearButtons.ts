export const addRangeClearButtons = (
  container: HTMLElement,
  handleDeleteStart: (e: MouseEvent) => void,
  handleDeleteEnd: (e: MouseEvent) => void
) => {
  const calendar = container.querySelector(".rdrDateDisplay");

  if (calendar) {
    if (calendar.children[0]) {
      const deleteStart = document.createElement("div");
      deleteStart.classList.add("rdrDateInput__Delete");
      deleteStart.addEventListener("click", handleDeleteStart);
      calendar.children[0].appendChild(deleteStart);
    }

    if (calendar.children[1]) {
      const deleteEnd = document.createElement("div");
      deleteEnd.classList.add("rdrDateInput__Delete");
      deleteEnd.addEventListener("click", handleDeleteEnd);
      calendar.children[1].appendChild(deleteEnd);
    }
  }
};
