let rows = 16;
let columns = 16;
let isMousePressed = false;
var r = document.querySelector(':root');

const pixelCanvas = document.querySelector('#canvas');
const palette = document.querySelector('#palette');

const paletteColours = [
    "#eee1c4",
    "#e6d9bd",
    "#dbcfb1",
    "#d6c7a3",
    "#c3b797",
    "#ada387",
    "#cc9970",
    "#a97e5c",
    "#937b6a",
    "#a0a0a0",
    "#838383",
    "#9eb5c0",
    "#839ca9",
    "#6d838e",
    "#c87e7e",
    "#a05e5e", 
    "#b089ab",
    "#8e6d89",
    "#b9ab73", 
    "#978c63", 
    "#87a985", 
    "#6f8b6e" 
];

let penColour = paletteColours[paletteColours.length-1];

// Mouse down / up event trackers
document.addEventListener('mousedown', () => {
    isMousePressed = true;
})

document.addEventListener('mouseup', () => {
    isMousePressed = false;
})

// Welcome in console and run five rounds
function main() {
    createPalette();
    createCanvas();
}

// Create a palette
function createPalette(e) {

    // For each palette colour in the array, create the div, apply background colour and add it to DOM
    paletteColours.forEach((element) => {
        const pixel = document.createElement("div");
        pixel.classList.add("swatch");
        pixel.dataset.colour = element;
        pixel.style.backgroundColor = element;
        palette.prepend(pixel);
    });

    // Set the first swatch to selected
    var firstPixel = document.querySelector('div.swatch');
    firstPixel.classList.add("selected");
    
    // Set pen colour to the first swatch
    r.style.setProperty('--pen-colour', paletteColours[paletteColours.length-1]);

    // Add listeners to the palette swatches
    const paletteSwatches = document.querySelectorAll('div.swatch');

    paletteSwatches.forEach(swatch => {
        swatch.addEventListener("click", setColour);
    })
}

// Palette event
function setColour(e) {

    let colour = this.dataset.colour;

    // Deselect previous colour 
    const previousColour = document.querySelector("div.swatch.selected");
    previousColour.classList.remove("selected");

    // Apply selected class to clicked colour
    this.classList.add("selected");
    r.style.setProperty('--pen-colour', colour);

    penColour = colour;
}

// Create canvas
function createCanvas() {

    // Add rows to the canvas
    for(var i = 0; i < rows; i++) {

        const div = document.createElement("div");
        div.classList.add("row");

        //Add columns within the row
        for(var j = 0; j < columns; j++) {

            const pixel = document.createElement("div");
            pixel.classList.add("pixel");

            div.appendChild(pixel);
        }

        pixelCanvas.appendChild(div);   
    }

    // Add listeners to each pixel
    const everyPixel = document.querySelectorAll('div.pixel');

    everyPixel.forEach(swatch => {
        swatch.addEventListener("mousedown", drawPixel);
        swatch.addEventListener("mouseover", drawPixel);
    })
}

// Palette event
function drawPixel(e) {

    if (e.type == 'mousedown') {
        this.style.backgroundColor = penColour;
    }    

    if(isMousePressed) {
        this.style.backgroundColor = penColour;
    }
}

// Paint entire canvas in default colour
function resetCanvas(e) {
    const everyPixel = document.querySelectorAll('div.pixel');
    
    // Remove inline background-colour from every pixel
    everyPixel.forEach(pixel => {
        pixel.style.backgroundColor = '';
    })
}

function canvasSize(e) {
    rows = prompt("Enter a grid size (e.g. 16 for a 16x16 grid)");
    columns = rows;

    // Delete all the pixels in the canvas
    while (pixelCanvas.firstChild) {
        pixelCanvas.removeChild(pixelCanvas.firstChild);
    }

    // Create a new canvas
    createCanvas();
}

main();