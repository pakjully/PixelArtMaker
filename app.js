
const inputHeight = document.getElementById('inputHeight');
const inputWidth = document.getElementById('inputWidth');
const sizePicker = document.getElementById('sizePicker');
const canvas = document.getElementById('pixelCanvas');
const firstColor = document.getElementById('firstColorPicker');
const secondColor = document.getElementById('secondColorPicker');
const start = document.getElementById('submit');
const clear = document.getElementById('clearButton');
const finish = document.getElementById('finishButton');
let draw = false;
const gridLines = document.getElementById('checkbox');
const cellSize = document.getElementById('cellSize');

const sizeDict = {
    1: 'small',
    2: 'medium',
    3: 'large',
};

start.addEventListener('click',(event) => {
    event.preventDefault();
    makeGrid();
    start.disabled = true;
    clearButton.disabled = false;
});
clear.addEventListener('click',() => {
    clearGrid();
    makeGrid();
});
finish.addEventListener('click', () => {
    clearGrid();
    start.disabled = false;
    clear.disabled = true;
    inputHeight.value = 10;
    inputWidth.value = 10;
});

const paintCell = (event) => {
    event.preventDefault();
    const cell = event.target;
    if (event.which === 1) {
        cell.style.backgroundColor = `${firstColor.value}`;
    } else if (event.which === 3) {
        cell.style.backgroundColor = `${secondColor.value}`;
    }
}

function makeGrid () {
    for(let h=0; h<inputHeight.value; h++) {
        const row = canvas.insertRow(h);
        for (let w=0; w<inputWidth.value; w++) {
            let cell = row.insertCell(w);
            cell.addEventListener('mousedown', paintCell);
            cell.addEventListener('contextmenu', function(e) {
                e.preventDefault();
            })
        }
    }

    setGridLines();
    setCellSize();
}

function clearGrid() {
    canvas.textContent = '';
}

canvas.addEventListener ('mousedown', () => {
    draw = true;
})

canvas.addEventListener ('mouseover', function (event) {
    if (draw) {
        paintCell(event);
    }
 });

canvas.addEventListener('mouseup', () => {
    draw = false;
});

gridLines.addEventListener ('change', setGridLines);

cellSize.addEventListener ('change', setCellSize);

function setCellSize () {
    const index = cellSize.selectedIndex;
    canvas.dataset.size = sizeDict[index]
}

function setGridLines () {
    if (gridLines.checked) {
        canvas.classList.remove('without-grid');
    } else {
        canvas.classList.add('without-grid');
    }
}
