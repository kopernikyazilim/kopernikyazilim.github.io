
let planets = document.getElementById('planets');

let planetsTransforms = [];

for(const planet of planets.children) {

    const style = getComputedStyle(planet, null);

    const top = parseFloat(style.getPropertyValue('top').replace("px", ""));
    const left = parseFloat(style.getPropertyValue('left').replace("px", ""));
    let transform = style.getPropertyValue('transform');

    transform = /matrix\(.*,.*,(.*),.*,.*\)/.exec(transform);

    let rotate = 0;
    if (transform) {
        rotate = parseFloat(transform[1]);
    }

    planetsTransforms.push({ top, left, rotate });
}

function updatePlanetPosition(planet, transform) {

    planet.style.left = `${transform.left}px`;
    planet.style.top = `${transform.top}px`;
    
    if (transform.rotate) {
        planet.style.transform = `rotate(${transform.rotate})`;
    }
}

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

        let maxMovement = (parallaxScroll / 10) * (window.innerHeight * 0.7);

        let movement = Math.min(maxMovement, window.scrollY);
        
        updatePlanetPosition(planet, { top: planetsTransforms[i].top + movement, left: planetsTransforms[i].left });
    }
});

// const INTERVAL = 10;
// let time = 0;

// setInterval(() => {

//     for(let i = 0; i < planets.children.length; ++i) {
//         const planet = planets.children[i];
        
//         const jiggleAmount = getPlanetAttribute(planet, "jiggleAmount");
        
//         if (jiggleAmount == 0) {
//             continue;
//         }

//         // planetsTransforms[i].x += Math.cos(time / INTERVAL) * jiggleAmount;
//         // planetsTransforms[i].y += Math.sin(time / INTERVAL) * jiggleAmount;

//         updatePlanetPosition(planet, i);
//     }

//     time += INTERVAL;
// }, INTERVAL);
