///////////////////////////////////
// art generator
//////////////////////////////

let boxes = [];
let mode = "both";
let bg;
const pauseTime = 10000; // time between spins
const lrgBoxHeight = lrgBoxWidth = lrgBoxDepth = 40;
const smBoxHeight = smBoxWidth = 20;
const smBoxDepth = 10;
let isSpinning = false;
let grow = true;
let groups = [];
let mlStrength = .75
let checker = true
let currentBGColor = "#ffffff"
let illo = new Zdog.Illustration({
    // set canvas with selector
    element: '.zdog-canvas',
    dragRotate: true,
    zoom: 16,
    fill: false,
    translate: { y: -10 }
});

function updatePower(){
    const power = document.getElementById('mlPower').value;
    document.getElementById('powerValue').innerHTML = power
    console.log(power)
    mlStrength = Number(power);
}
async function startML() {
    const mlImages = document.getElementById('mlImages');
    mlImages.style.display = 'block';
    
}
function swapImages() {
    const contentImg = document.getElementById('content');
    const styleImg = document.getElementById('styleImg');
    let contentValue = contentImg.src
    let styleValue = styleImg.src
    contentImg.src = styleValue
    styleImg.src = contentValue
}
async function makeMLArt() {
    const model = new mi.ArbitraryStyleTransferNetwork();
    await model.initialize()
    const contentImg = document.getElementById('content');
    const styleImg = document.getElementById('styleImg');
    const stylizedCanvas = document.getElementById('stylized');
    model.stylize(contentImg, styleImg, mlStrength).then((imageData) => {
        stylizedCanvas.getContext('2d').putImageData(imageData, 0, 0);
    });
}

// (height, width, depth, x, y, color) 
// for each box in the Codeplant logo
const locations = [
    { x: 10, y: -44, color: '#042D3A', h: lrgBoxHeight, w: lrgBoxWidth, d: lrgBoxDepth },
    { x: 0, y: 100, color: '#49C04C', h: smBoxHeight, w: smBoxWidth, d: smBoxDepth },
    { x: -64, y: 78, color: '#DBEA0A', h: smBoxHeight, w: smBoxWidth, d: smBoxDepth },
    { x: 0, y: 78, color: '#49C04C', h: smBoxHeight, w: smBoxWidth, d: smBoxDepth },
    { x: 0, y: 56, color: '#0B7334', h: smBoxHeight, w: smBoxWidth, d: smBoxDepth },
    { x: 0, y: 34, color: '#0CA139', h: smBoxHeight, w: smBoxWidth, d: smBoxDepth },
    { x: -22, y: 56, color: '#99C353', h: smBoxHeight, w: smBoxWidth, d: smBoxDepth },
    { x: 44, y: 100, color: '#DBEA0A', h: smBoxHeight, w: smBoxWidth, d: smBoxDepth },
    { x: -22, y: 34, color: '#0B7334', h: smBoxHeight, w: smBoxWidth, d: smBoxDepth },
    { x: -44, y: 12, color: '#0B7334', h: smBoxHeight, w: smBoxWidth, d: smBoxDepth },
    { x: -66, y: -10, color: '#0B7334', h: smBoxHeight, w: smBoxWidth, d: smBoxDepth },
    { x: -66, y: 12, color: '#0DA13A', h: smBoxHeight, w: smBoxWidth, d: smBoxDepth },
    { x: -44, y: 34, color: '#0DA13A', h: smBoxHeight, w: smBoxWidth, d: smBoxDepth },
    { x: -22, y: 12, color: '#DDE90B', h: smBoxHeight, w: smBoxWidth, d: smBoxDepth },
    { x: -44, y: -10, color: '#93C536', h: smBoxHeight, w: smBoxWidth, d: smBoxDepth },
    { x: 22, y: 34, color: '#15852E', h: smBoxHeight, w: smBoxWidth, d: smBoxDepth },
    { x: 22, y: 11, color: '#0AA336', h: smBoxHeight, w: smBoxWidth, d: smBoxDepth },
    { x: 44, y: 12, color: '#3FBD38', h: smBoxHeight, w: smBoxWidth, d: smBoxDepth },
    { x: 66, y: 12, color: '#3FBD38', h: smBoxHeight, w: smBoxWidth, d: smBoxDepth },
    { x: 44, y: 34, color: '#3FBD38', h: smBoxHeight, w: smBoxWidth, d: smBoxDepth },
    { x: 44, y: -10, color: '#94CF28', h: smBoxHeight, w: smBoxWidth, d: smBoxDepth },
    { x: 66, y: -10, color: '#0A7435', h: smBoxHeight, w: smBoxWidth, d: smBoxDepth },
    { x: 66, y: -88, color: '#DBEA0A', h: smBoxHeight, w: smBoxWidth, d: smBoxDepth },
]
const color1 = "#F8A21E"
const color2 = "#868507"
const color3 = "#FB2A1D"
const color4 = "#551008"
const color5 = "#D35705"
const colors = [color1, color2, color3, color4, color5];
const colors2 = ["#D4E6B5", "#AFC97E", "#E2D686", "#FFDF64", "#877B66"];
const colors3 = ["#7A918D", "#93B1A7", "#99C2A2", "#C5EDAC", "#DBFEB8"];
const colors4 = ["#7A8D9B", "#B2B9BF", "#E3D4D0", "#EED0C6", "#DABEB6"];
const colors5 = ["#011f4b", "#03396c", "#005b96", "#6497b1", "#b3cde0"];
const colors6 = ["#643F24", "#A35426", "#C47E5D", "#FFA902", "#A28220"];
const colors7 = ["#011f4b", "#03396c", "#005b96", "#6497b1", "#b3cde0"];
const colors8 = ["#011f4b", "#03396c", "#005b96", "#6497b1", "#b3cde0"];
const pallettes = [colors, colors2, colors3, colors4, colors5];
let currentPallette = colors;
document.getElementById('color1').value = currentPallette[0]
document.getElementById('color2').value = currentPallette[1]
document.getElementById('color3').value = currentPallette[2]
document.getElementById('color4').value = currentPallette[3]
document.getElementById('color5').value = currentPallette[4]
document.getElementById('color6').value = currentBGColor

const sizes = [.5, 1, 1.5, 2, 2.5, 3, 3.5, 4];
function getSize() {
    return sizes[Math.floor(Math.random() * sizes.length)]
}
function getColor() {
    return colors2[Math.floor(Math.random() * colors.length)]
}
function getRandomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16)
}
function setBGColor() {
    currentBGColor = document.getElementById('color6').value
}
function generateRandomColorPallette() {
    document.getElementById('color1').value = getRandomColor()
    document.getElementById('color2').value = getRandomColor()
    document.getElementById('color3').value = getRandomColor()
    document.getElementById('color4').value = getRandomColor()
    document.getElementById('color5').value = getRandomColor()
    currentBGColor = getRandomColor()
    document.getElementById('color6').value = currentBGColor
}
function getRandomFloat(min, max, decimals) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);

    return parseFloat(str);
}
function getRandomBetween(min, max) {
    const str = (Math.random() * (max - min) + min).toFixed(2);

    return parseFloat(str);
}
const grid = [
    { x: 0, y: 20, size: getSize(), pulse: false, color: getColor() },
    { x: 5, y: 20, size: getSize(), pulse: true, color: getColor() },
    { x: 10, y: 20, size: getSize(), pulse: false, color: getColor() },
    { x: 15, y: 20, size: getSize(), pulse: false, color: getColor() },
    { x: 20, y: 20, size: getSize(), pulse: false, color: getColor() },

    { x: 0, y: 15, size: getSize(), pulse: false, color: getColor() },
    { x: 5, y: 15, size: getSize(), pulse: true, color: getColor() },
    { x: 10, y: 15, size: getSize(), pulse: false, color: getColor() },
    { x: 15, y: 15, size: getSize(), pulse: false, color: getColor() },
    { x: 20, y: 15, size: getSize(), pulse: false, color: getColor() },

    { x: 0, y: 10, size: getSize(), pulse: false, color: getColor() },
    { x: 5, y: 10, size: getSize(), pulse: false, color: getColor() },
    { x: 10, y: 10, size: getSize(), pulse: true, color: getColor() },
    { x: 15, y: 10, size: getSize(), pulse: false, color: getColor() },
    { x: 20, y: 10, size: getSize(), pulse: false, color: getColor() },

    { x: 0, y: 5, size: getSize(), pulse: false, color: getColor() },
    { x: 5, y: 5, size: getSize(), pulse: false, color: getColor() },
    { x: 10, y: 5, size: getSize(), pulse: false, color: getColor() },
    { x: 15, y: 5, size: getSize(), pulse: false, color: getColor() },
    { x: 20, y: 5, size: getSize(), pulse: true, color: getColor() },

    { x: 0, y: 0, size: getSize(), pulse: false, color: getColor() },
    { x: 5, y: 0, size: getSize(), pulse: false, color: getColor() },
    { x: 10, y: 0, size: getSize(), pulse: false, color: getColor() },
    { x: 15, y: 0, size: getSize(), pulse: true, color: getColor() },
    { x: 20, y: 0, size: getSize(), pulse: false, color: getColor() }
]
const generate = () => {
    let c1 = document.getElementById('color1').value;
    let c2 = document.getElementById('color2').value;
    let c3 = document.getElementById('color3').value;
    let c4 = document.getElementById('color4').value;
    let c5 = document.getElementById('color5').value;
    console.log(c5)
    if (c1 !== '#000000', c2 !== '#000000', c3 !== '#000000', c4 !== '#000000', c5 !== '#000000') {
        currentPallette = [c1, c2, c3, c4, c5]
    }
    buildGrid();
}
document.getElementById("btn1").addEventListener("click", () => {
    mode = "ellipse";
})
document.getElementById("btn2").addEventListener("click", () => {
    mode = "cube";
})
document.getElementById("btn3").addEventListener("click", () => {
    mode = "both";
})
const transferStyle = () => {
    startML()
}
var fisherYates = (array) => {
    // we start at the end of the array
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element between current location and beginning
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1; // And swap it with the current element.
        // get the value of our current index

        temporaryValue = array[currentIndex]; // replace it with our new random element's value from whats left

        array[currentIndex] = array[randomIndex]; // copy the value that was at this point in the array to the random index

        array[randomIndex] = temporaryValue; // this will stop swapping when the index is at 0
    }

    return array;
};
const setPallette = () => {
    let pal = document.getElementById('pallette').value;
    switch (pal) {
        case "1":
            currentPallette = colors
            break;
        case "2":
            currentPallette = colors2
            break;
        case "3":
            currentPallette = colors3
            break;
        case "4":
            currentPallette = colors4
            break;
        case "5":
            currentPallette = colors5
            break;
        case "6":
            currentPallette = colors6
            break;

    }
    document.getElementById('color1').value = currentPallette[0];
    document.getElementById('color2').value = currentPallette[1];
    document.getElementById('color3').value = currentPallette[2];
    document.getElementById('color4').value = currentPallette[3];
    document.getElementById('color5').value = currentPallette[4];

}
const buildGrid = () => {

    if (boxes.length > 0) {
        bg.remove()
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].remove()

        }
    }
    grid.forEach((eachLocation, i) => {
        bg = new Zdog.Box({
            addTo: illo,
            width: 100,
            height: 100,
            stroke: false,
            color: currentBGColor, // default face color
            translate: { z: -1 }
        })
        const randColors = fisherYates(currentPallette)


        if (mode === 'both') {

            if (checker) {

                boxes.push(new Zdog.Box({
                    addTo: illo,
                    width: 1.5 * 3,
                    height: 1.5 * 3,
                    stroke: false,
                    color: randColors[1], // default face color
                    translate: { y: eachLocation.y, x: eachLocation.x - 10, z: 0 }
                }))
            }
            checker = !checker

            boxes.push(new Zdog.Shape({
                addTo: illo,
                // no path set, default to single point
                stroke: 1.5 * 3.3,
                color: randColors[0],
                translate: { y: eachLocation.y, x: eachLocation.x - 10, z: 2 }
            }));

            boxes.push(new Zdog.Shape({
                addTo: illo,
                // no path set, default to single point
                stroke: 2,
                color: randColors[2],
                translate: { y: eachLocation.y + getRandomBetween(-.5, .5), x: (eachLocation.x - 10) + getRandomBetween(-.5, .5), z: 4 }
            }));

            boxes.push(new Zdog.Hemisphere({
                addTo: illo,
                diameter: getRandomBetween(3, 4.25),
                stroke: false,
                color: randColors[1],
                translate: { y: eachLocation.y + getRandomBetween(-.15, .15), x: (eachLocation.x - 10) + getRandomBetween(-.15, .15), z: 6 },
                rotate: { y: Zdog.TAU / Math.floor(getRandomBetween(1, 4)), x: Zdog.TAU / 4 },
            }))


            boxes.push(new Zdog.Shape({
                addTo: illo,
                // no path set, default to single point
                stroke: getRandomBetween(.25, 1),
                color: randColors[4],
                translate: { y: eachLocation.y + getRandomBetween(-.2, .2), x: (eachLocation.x - 10) + getRandomBetween(-.2, .2), z: 8 }
            }));
        }

        if (mode === "cube") {
            boxes.push(new Zdog.Box({
                addTo: illo,
                width: 1.5 * 3,
                height: 1.5 * 3,
                stroke: false,
                color: randColors[1], // default face color
                translate: { y: eachLocation.y, x: eachLocation.x - 10, z: 0 }
            }))

            boxes.push(new Zdog.Box({
                addTo: illo,
                width: 1.5 * 2.5,
                height: 1.5 * 2.5,
                stroke: false,
                color: randColors[0], // default face color
                translate: { y: eachLocation.y + getRandomBetween(-.25, .25), x: (eachLocation.x - 10) + getRandomBetween(-.25, .25), z: 2 },
                rotate: { z: getRandomBetween(-.1, .1) }

            }))




            boxes.push(new Zdog.Box({
                addTo: illo,
                width: 1.5 * 1.75,
                height: 1.5 * 1.75,
                stroke: false,
                color: randColors[2], // default face color
                translate: { y: eachLocation.y + getRandomBetween(-.25, .25), x: (eachLocation.x - 10) + getRandomBetween(-.25, .25), z: 4 },
                rotate: { z: getRandomBetween(-.1, .1) }
            }))

            boxes.push(new Zdog.Box({
                addTo: illo,
                width: 1.25,
                height: 1.25,
                stroke: false,
                color: randColors[3], // default face color
                translate: { y: eachLocation.y + getRandomBetween(-.15, .15), x: (eachLocation.x - 10) + getRandomBetween(-.15, .15), z: 6 },
                rotate: { z: getRandomBetween(-.1, .1) }
            }))




            boxes.push(new Zdog.Box({
                addTo: illo,
                width: .35,
                height: .35,
                stroke: false,
                color: randColors[4], // default face color
                translate: { y: eachLocation.y, x: (eachLocation.x - 10 + Math.random() * .2), z: 8 },
                rotate: { z: getRandomBetween(-.5, .5) }
            }))
        }

        if (mode === "ellipse") {
            boxes.push(new Zdog.Shape({
                addTo: illo,
                // no path set, default to single point
                stroke: 1.5 * 3.3,
                color: randColors[0],
                translate: { y: eachLocation.y, x: (eachLocation.x - 10), z: 2 }
            }));

            boxes.push(new Zdog.Shape({
                addTo: illo,
                // no path set, default to single point
                stroke: 1.5 * 2.5,
                color: randColors[2],
                translate: { y: eachLocation.y + getRandomBetween(-.35, .35), x: (eachLocation.x - 10) + getRandomBetween(-.35, .35), z: 4 }
            }));
            boxes.push(new Zdog.Shape({
                addTo: illo,
                // no path set, default to single point
                stroke: 2,
                color: randColors[3],
                translate: { y: eachLocation.y + getRandomBetween(-.25, .25), x: (eachLocation.x - 10) + getRandomBetween(-.25, .25), z: 6 }
            }));
            boxes.push(new Zdog.Shape({
                addTo: illo,
                // no path set, default to single point
                stroke: .5,
                color: randColors[4],
                translate: { y: eachLocation.y + getRandomBetween(-.25, .25), x: (eachLocation.x - 10) + getRandomBetween(-.25, .25), z: 8 }
            }));
        }

    })


    illo.updateRenderGraph();
}
function getDepth(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
function getSideColor() {
    const colors = ['#FFFF00', '#49C04C', '#0B7334', '#032D3B', '#3FBD38']
    return colors[Math.floor(Math.random() * colors.length)]
}
function getSpinSpeed() {
    return .005
}
let flipper = true
let counter = 0
function animate() {

    illo.updateRenderGraph();
    requestAnimationFrame(animate);
}


animate();

