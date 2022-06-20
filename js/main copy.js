///////////////////////////////////
// CODEPLANT SPINNING LOGO
//////////////////////////////

const boxes = []; // array to store our boxes
const pauseTime = 10000; // time between spins
const lrgBoxHeight = lrgBoxWidth = lrgBoxDepth = 40;
const smBoxHeight = smBoxWidth = 20;
const smBoxDepth = 10;
let isSpinning = false; // flag for spinning
let grow = true;

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

const grid = [
    { x: 0, y: 20, size: 1.5, pulse: false },
    { x: 5, y: 20, size: 2, pulse: false },
    { x: 10, y: 20, size: 3, pulse: true },
    { x: 15, y: 20, size: 2, pulse: false },
    { x: 20, y: 20, size: 1.5, pulse: false },

    { x: 0, y: 15, size: 2, pulse: false },
    { x: 5, y: 14.75, size: 1.5, pulse: false },
    { x: 10, y: 14.5, size: 2, pulse: true },
    { x: 15, y: 14.75, size: 1.5, pulse: false },
    { x: 20, y: 15, size: 2, pulse: false },

    { x: 0, y: 10, size: 3, pulse: true },
    { x: 5, y: 10, size: 2, pulse: true },
    { x: 10, y: 10, size: 1.5, pulse: true },
    { x: 15, y: 10, size: 2, pulse: true },
    { x: 20, y: 10, size: 3, pulse: true },

    { x: 0, y: 5, size: 2, pulse: false },
    { x: 5, y: 5.25, size: 1.5, pulse: false },
    { x: 10, y: 5.5, size: 2, pulse: true },
    { x: 15, y: 5.25, size: 1.5, pulse: false },
    { x: 20, y: 5, size: 2, pulse: false },

    { x: 0, y: 0, size: 1.5, pulse: false },
    { x: 5, y: 0, size: 2, pulse: false },
    { x: 10, y: 0, size: 3, pulse: true },
    { x: 15, y: 0, size: 2, pulse: false },
    { x: 20, y: 0, size: 1.5, pulse: false }
]

// create illo main object
let illo = new Zdog.Illustration({
    // set canvas with selector
    element: '.zdog-canvas',
    dragRotate: false,
    zoom: 7,
    fill: false,
    translate: { y: -10 }
});

grid.forEach((eachLocation, i) => {
    boxes[i] = new Zdog.Shape({
        addTo: illo,
        // no path set, default to single point
        stroke: 1.5 * eachLocation.size,
        color: '#00F4F7',
        translate: { y: eachLocation.y, x: eachLocation.x - 10, z: 0 }
    });
})


// for each location make a box and place it on the stage
// locations.forEach((eachLocation, i) => {

//     boxes[i] = new Zdog.Box({
//         addTo: illo,
//         width: eachLocation.w,
//         height: eachLocation.h,
//         depth: eachLocation.d,
//         stroke: false,
//         color: eachLocation.color, // default face color
//         leftFace: getSideColor(),
//         rightFace: getSideColor(),
//         topFace: getSideColor(),
//         bottomFace: getSideColor(),
//         translate: { y: eachLocation.y, x: eachLocation.x, z: getDepth(-100, 100) }
//     });

// })

// utility functions
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

    if (true) {


        // illo.rotate.x += 0.05; // this one makes me dizzy :)



        if (counter > 150) {

            boxes.forEach((eachOne, i) => {

                if (grid[i].pulse) {
                    eachOne.stroke -= getSpinSpeed();
                    eachOne.updatePath();
                }

            })


        } else {
            boxes.forEach((eachOne, i) => {

                if (grid[i].pulse) {
                    eachOne.stroke += getSpinSpeed();
                    eachOne.updatePath();
                }

            })
        }
        counter++
        if (counter > 300) {
            counter = 0
        }


    }

    illo.updateRenderGraph();
    requestAnimationFrame(animate);
}

// kick off the animation
animate();

// update & render
illo.updateRenderGraph();

// spin on interval
// setInterval(() => {
//     isSpinning = true;
// }, pauseTime)

// click event on canvas to start spinning
// document.getElementById("can").addEventListener('click', () => {
//     isSpinning = !isSpinning
// })