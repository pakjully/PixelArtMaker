
const inputHeight = document.getElementById('inputHeight');
const inputWidth = document.getElementById('inputWidth');
const sizePicker = document.getElementById('sizePicker');
const canvas = document.getElementById('pixelCanvas');
const colorPicker = document.getElementById('colorPicker');
const start = document.getElementById('submit');
const clear = document.getElementById('clearButton');
const finish = document.getElementById('finishButton');
const inputNumH = document.getElementById('inputHeight');
const inputNumW = document.getElementById('inputWidth');

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
    inputNumH.value = 1;
    inputNumW.value = 1;
});

function makeGrid () {
    for(let h=0; h<inputHeight.value; h++) {
        const row = canvas.insertRow(h);
        for (let w=0; w<inputWidth.value; w++) {
            const cells = row.insertCell(w);
            cells.addEventListener('click', () => {
                cells.setAttribute('style',`background-color: ${colorPicker.value}`)
            })
        }
    }
}

function clearGrid() {
    while(canvas.firstChild){
        canvas.removeChild(canvas.firstChild)
    }
}


