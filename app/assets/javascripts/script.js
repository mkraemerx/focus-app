let draggedElement = null;

document.addEventListener('dragstart', (event) => {
  draggedElement = event.target;
  event.target.style.opacity = 0.5;
});

document.addEventListener('dragend', (event) => {
  event.target.style.opacity = '';
  checkOverlap(draggedElement);
});

document.addEventListener('dragover', (event) => {
  event.preventDefault();
});

document.addEventListener('drop', (event) => {
  event.preventDefault();
  if (event.target.classList.contains('container')) {
    const rect = draggedElement.getBoundingClientRect();
    draggedElement.style.left = `${event.clientX - rect.width / 2}px`;
    draggedElement.style.top = `${event.clientY - rect.height / 2}px`;
  }
});

document.querySelectorAll('.box').forEach(box => {
  box.addEventListener('click', (event) => {
    const range = document.createRange();
    range.selectNodeContents(event.target);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  });
});

function checkOverlap(element) {
  const boxes = document.querySelectorAll('.box');
  const rect1 = element.getBoundingClientRect();

  boxes.forEach((box) => {
    if (box !== element) {
      const rect2 = box.getBoundingClientRect();

      if (
        rect1.left < rect2.left + rect2.width &&
        rect1.left + rect1.width > rect2.left &&
        rect1.top < rect2.top + rect2.height &&
        rect1.top + rect1.height > rect2.top
      ) {
        // Adjust position to avoid overlap
        const containerRect = document.querySelector('.container').getBoundingClientRect();
        element.style.left = `${Math.min(containerRect.width - rect1.width, rect2.right)}px`;
        element.style.top = `${Math.min(containerRect.height - rect1.height, rect2.bottom)}px`;
      }
    }
  });
}
