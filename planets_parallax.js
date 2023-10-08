
const planets = document.getElementById('planets');

let planetsStartY = []; 

for(const planet of planets.children) {
    planetsStartY.push(planet.getBoundingClientRect().top);
}

window.addEventListener('scroll', (event) => {

    for(let i = 0; i < planets.children.length; ++i) {
        
        const planet = planets.children[i];

        let parallaxScroll = planet.attributes.getNamedItem('parallaxScroll').value;

        if (parallaxScroll < 5) {
            continue;
        }
        
        let translateY = Math.min((parallaxScroll / 10) * (window.innerHeight * 0.7), planetsStartY[i] + window.scrollY);

        planet.style.transform = `translateY(${translateY - planetsStartY[i]}px)`;
    }
});
