
let planets = document.getElementById('planets');

let planetsTransforms = [];

for(const planet of planets.children) {

    const style = getComputedStyle(planet, null);

    const top = parseFloat(style.getPropertyValue('top').replace("px", ""));
    const left = parseFloat(style.getPropertyValue('left').replace("px", ""));
    const transform = style.getPropertyValue('transform');

    let rotate = 0;
    if (transform && transform !== "none") {

        var values = transform.split('(')[1],
        values = values.split(')')[0],
        values = values.split(',');

        const b = values[1];
        rotate = Math.round(Math.asin(b) * (180 / Math.PI));
    }

    planetsTransforms.push({ top, left, rotate });
}

function updatePlanetPosition(planet, transform) {

    planet.style.left = `${transform.left}px`;
    planet.style.top = `${transform.top}px`;
    
    if (transform.rotate) {
        planet.style.transform = `rotate(${transform.rotate}deg)`;
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

const MAX_PLANET_TURN = 2;

setInterval(() => {

    for(let i = 0; i < planets.children.length; ++i) {
        const planet = planets.children[i];
        
        const jiggleAmount = getPlanetAttribute(planet, "jiggleAmount");

        updatePlanetPosition(planet, { 
            top: planetsTransforms[i].top + Math.random() * jiggleAmount, 
            left: planetsTransforms[i].left + Math.random() * jiggleAmount, 
            rotate: planetsTransforms[i].rotate + ((Math.random() * MAX_PLANET_TURN) - MAX_PLANET_TURN / 2)
        });
    }
}, 1000);
