///////////////////////////////////
// CODEPLANT SPINNING LOGO
//////////////////////////////

let isSpinning = false; // flag for spinning
const boxes = []; // array to store our boxes
const pauseTime = 10000; // time between spins
const lrgBoxHeight = lrgBoxWidth = lrgBoxDepth = 40;
const smBoxHeight = smBoxWidth = 20;
const smBoxDepth = 10;

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

// create illo main object
let illo = new Zdog.Illustration({
    // set canvas with selector
    element: '.zdog-canvas',
    dragRotate: false,
    zoom: 1.5,
    fill: false
});


// for each location make a box and place it on the stage
locations.forEach((eachLocation, i) => {
    boxes[i] = new Zdog.Box({
        addTo: illo,
        width: eachLocation.w,
        height: eachLocation.h,
        depth: eachLocation.d,
        stroke: false,
        color: eachLocation.color, // default face color
        leftFace: getSideColor(),
        rightFace: getSideColor(),
        topFace: getSideColor(),
        bottomFace: getSideColor(),
        translate: { y: eachLocation.y, x: eachLocation.x, z: getDepth(-100, 100) }
    });
})


// utility functions
function getDepth(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
function getSideColor() {
    const colors = ['#FFFF00', '#49C04C', '#0B7334', '#032D3B', '#3FBD38']
    return colors[Math.floor(Math.random() * colors.length)]
}
function getSpinSpeed() {
    return 0.05
}
function animate() {

    if (isSpinning && (illo.rotate.y <= Zdog.TAU)) {

        illo.rotate.y += 0.05;
        // illo.rotate.x += 0.05; // this one makes me dizzy :)

        boxes.forEach((eachOne, i) => {
            if (i % 2 == 0) {
                eachOne.rotate.x += getSpinSpeed();
                //eachOne.rotate.y -= getSpinSpeed();
            } else {
                // eachOne.rotate.x -= getSpinSpeed();
                eachOne.rotate.y += getSpinSpeed();
            }
            eachOne.updatePath();
        })

    } else {
        illo.rotate.y = 0;
        // illo.rotate.x = 0;

        boxes.forEach((eachOne) => {
            eachOne.rotate.x = 0;
            eachOne.rotate.y = 0;
            eachOne.updatePath()
        })


        isSpinning = false;
    }

    illo.updateRenderGraph();
    requestAnimationFrame(animate);
}

// kick off the animation
animate();

// update & render
illo.updateRenderGraph();


// spin on interval
setInterval(() => {
    isSpinning = true;
}, pauseTime)


// click event on canvas to start spinning
document.getElementById("can").addEventListener('click', () => {
    isSpinning = !isSpinning
})