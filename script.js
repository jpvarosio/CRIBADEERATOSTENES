const gridSize = 100; // Números del 0 al 99
let numbers = [];
const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6', '#e67e22', '#1abc9c', '#d35400', '#8e44ad', '#27ae60'];

function createGrid() {
    const table = document.getElementById('numberTable');
    let row = null;

    for (let i = 0; i < gridSize; i++) {
        if (i % 10 === 0) {
            row = document.createElement('tr');
            table.appendChild(row);
        }

        const cell = document.createElement('td');
        cell.textContent = i;
        cell.addEventListener('click', () => toggleMultiples(i));
        row.appendChild(cell);
        numbers.push(cell);
    }
}

function getColorForBase(base) {
    return colors[(base - 1) % colors.length];
}

function toggleMultiples(base) {
    if (base === 0 || base === 1) return; // El 0 y el 1 no son primos ni compuestos
    const isMarked = numbers[base].dataset.marked === 'true';
    const color = isMarked ? 'black' : getColorForBase(base);

    // Cambiar el color del número primo seleccionado
    numbers[base].style.color = isMarked ? 'black' : color;

    for (let i = base * 2; i < gridSize; i += base) {
        if (isMarked) {
            numbers[i].classList.remove('crossed-out');
            numbers[i].style.color = 'black';
        } else {
            numbers[i].classList.add('crossed-out');
            numbers[i].style.color = color;
        }
    }

    // Alternar estado de marcado
    numbers[base].dataset.marked = isMarked ? 'false' : 'true';
}

function resetGrid() {
    numbers.forEach(number => {
        number.classList.remove('crossed-out');
        number.style.color = 'black';
        number.dataset.marked = 'false';
    });
}

window.onload = createGrid;
