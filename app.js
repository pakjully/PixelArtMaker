
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
let cells = [];
const cellSize = document.getElementById('cellSize');

start.addEventListener('click',(event) => {
    event.preventDefault();
    makeGrid();
    start.disabled = true;
    clearButton.disabled = false;
});
clear.addEventListener('click',(event) => {
    event.preventDefault();
    clearGrid();
    makeGrid();
});
finish.addEventListener('click', (event) => {
    event.preventDefault();
    clearGrid();
    start.disabled = false;
    inputHeight.value = 1;
    inputWidth.value = 1;
});

function makeGrid () {
    for(let h=0; h<inputHeight.value; h++) {
        const row = canvas.insertRow(h);
        for (let w=0; w<inputWidth.value; w++) {
            let cell = row.insertCell(w);
            cells.push(cell);
            cell.style.backgroundColor = 'white';
            cell.addEventListener('click', function () {
                cell.style.backgroundColor = `${firstColor.value}`;
            });
            cell.addEventListener('contextmenu', function(){
                cell.style.backgroundColor = `${secondColor.value}`;
            })
            setGridLines();
            setCellSize();
        }
    }
}

function clearGrid() {
    while(canvas.firstChild){
        canvas.removeChild(canvas.firstChild)
    }
    cells = [];
}

canvas.addEventListener ('mousedown', () => {
    draw = true;
})

canvas.addEventListener ('mouseover', function (event) {
    if (draw) {
       let target = event.target;
       if (event.which === 1) {
           target.style.background = `${firstColor.value}`;
       } else if (event.which === 3) {
           target.style.background = `${secondColor.value}`;
       } console.log(event.which)
    }
 });

canvas.addEventListener('mouseup', () => {
    draw = false;
});

gridLines.addEventListener ('change', setGridLines);

cellSize.addEventListener ('change', setCellSize);

function setCellSize () {
    let index = cellSize.selectedIndex;
    let cellHeight = document.querySelectorAll('tr');
    for (let i=0; i<cellHeight.length; i=i+1) {
        if (index === 1) {
             cells[i].style.width = '15px';
             cellHeight[i].style.height = '15px';
        } else if (index === 2) {
             cells[i].style.width = '20px';
             cellHeight[i].style.height = '20px';
        } else if (index === 3) {
            cells[i].style.width = '25px';
            cellHeight[i].style.height = '25px';
        }
    }
}

function setGridLines () {
    if (!gridLines.checked) {
        for (let i=0; i<cells.length; i=i+1) {
            cells[i].style.borderColor = 'transparent';
        }
    } else {
        for (let i=0; i<cells.length; i=i+1) {
            cells[i].style.borderColor = 'black';
        }
    }
}


