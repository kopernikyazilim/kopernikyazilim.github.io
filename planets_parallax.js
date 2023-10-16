
let planets = document.getElementById('planets');

let planetsStartTransforms = [];

for(const planet of planets.children) {

    const style = getComputedStyle(planet, null);

    const top = parseFloat(style.getPropertyValue('top').replace("px", ""));
    const left = parseFloat(style.getPropertyValue('left').replace("px", ""));
    const transform = style.getPropertyValue('transform');

    let matrix;
    if (transform && transform !== "none") {
        matrix = new WebKitCSSMatrix(transform);
    } else {
        matrix = new WebKitCSSMatrix([1, 0, 0, 1, 0, 0]);
    }

    matrix.m41 = 0;

    if (window.innerWidth < 768 && (planet.className === "planet sun" || planet.className === "planet earth")) {
        const width = parseInt(style.width.replace("px", ""));
        matrix.m41 = -width / 2;
    }

    planetsStartTransforms.push({ top, left, matrix });
}

let planetTopPositions = planetsStartTransforms.map(({ top, left, matrix }) => top);

function getPlanetAttribute(planet, attribute) {
    return parseInt(planet.attributes.getNamedItem(attribute).value);
}

window.addEventListener('scroll', (event) => {

    for(let i = 0; i < planets.children.length; ++i) {

        const planet = planets.children[i];

        const parallaxScroll = getPlanetAttribute(planet, "parallaxScroll");
        
        if (parallaxScroll == 0) {
            continue;
        }

        // Get document height from:
        // https://stackoverflow.com/questions/1145850/how-to-get-height-of-entire-document-with-javascript
        const body = document.body;
        const html = document.documentElement;
        const height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );

        let maxMovement = (parallaxScroll / 100) * height;

        let movement = Math.min(maxMovement, window.scrollY);

        planetTopPositions[i] = planetsStartTransforms[i].top + movement;

        planet.style.top = `${planetTopPositions[i]}px`;
    }
});

const MAX_PLANET_TURN = 2;

setInterval(() => {

    for(let i = 0; i < planets.children.length; ++i) {
        const planet = planets.children[i];
        
        const jiggleAmount = getPlanetAttribute(planet, "jiggleAmount");

        planet.style.top = `${planetTopPositions[i] + Math.random() * jiggleAmount}px`;
        planet.style.left = `${planetsStartTransforms[i].left + Math.random() * jiggleAmount}px`;
        
        const matrix = planetsStartTransforms[i].matrix.rotate((Math.random() * MAX_PLANET_TURN) - MAX_PLANET_TURN / 2);

        planet.style.transform = `${matrix}`;
    }
}, 1000);
