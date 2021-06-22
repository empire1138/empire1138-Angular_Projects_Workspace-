const CIRCLE_CLASS = 'circle';
const X_CLASS = 'x';

let circleTurn;

const cellElements = document.querySelectorAll('[data-cell]');

cellElements.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true })
});

function handleClick(event) {
    const cell = event.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;

    placeMark(cell, currentClass)

}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}