document.addEventListener('DOMContentLoaded', () => {
    const characterSelect = document.getElementById('characterSelect');
    const characterInfo = document.getElementById('characterInfo');
    const planetSelect = document.getElementById('planetSelect');
    const planetInfo = document.getElementById('planetInfo');
    const starshipSelect = document.getElementById('starshipSelect');
    const starshipInfo = document.getElementById('starshipInfo');

    async function fetchData(url, selectElement, infoElement, displayFunction) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            data.results.forEach(item => {
                const option = document.createElement('option');
                option.value = item.url;
                option.textContent = item.name || item.title;
                selectElement.appendChild(option);
            });

            selectElement.addEventListener('change', async (event) => {
                const itemUrl = event.target.value;
                if (itemUrl) {
                    try {
                        const itemResponse = await fetch(itemUrl);
                        if (!itemResponse.ok) {
                            throw new Error(`HTTP error! Status: ${itemResponse.status}`);
                        }
                        const item = await itemResponse.json();
                        displayFunction(item, infoElement);
                    } catch (itemError) {
                        console.error('Error fetching item details:', itemError.message);
                    }
                }
            });
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    }

    function displayCharacterDetails(character, element) {
        element.innerHTML = `
            <h2>${character.name}</h2>
            <p><strong>Height:</strong> ${character.height} cm</p>
            <p><strong>Mass:</strong> ${character.mass} kg</p>
            <p><strong>Hair Color:</strong> ${character.hair_color}</p>
            <p><strong>Skin Color:</strong> ${character.skin_color}</p>
            <p><strong>Eye Color:</strong> ${character.eye_color}</p>
            <p><strong>Birth Year:</strong> ${character.birth_year}</p>
            <p><strong>Gender:</strong> ${character.gender}</p>
        `;
    }

    function displayPlanetDetails(planet, element) {
        element.innerHTML = `
            <h2>${planet.name}</h2>
            <p><strong>Climate:</strong> ${planet.climate}</p>
            <p><strong>Terrain:</strong> ${planet.terrain}</p>
            <p><strong>Population:</strong> ${planet.population}</p>
            <p><strong>Diameter:</strong> ${planet.diameter} km</p>
            <p><strong>Gravity:</strong> ${planet.gravity}</p>
        `;
    }

    function displayStarshipDetails(starship, element) {
        element.innerHTML = `
            <h2>${starship.name}</h2>
            <p><strong>Model:</strong> ${starship.model}</p>
            <p><strong>Manufacturer:</strong> ${starship.manufacturer}</p>
            <p><strong>Cost:</strong> ${starship.cost_in_credits} credits</p>
            <p><strong>Length:</strong> ${starship.length} meters</p>
            <p><strong>Crew:</strong> ${starship.crew}</p>
            <p><strong>Passengers:</strong> ${starship.passengers}</p>
        `;
    }

    // fetch data 4 each category if elements is present
    if (characterSelect) {
        fetchData('https://swapi.dev/api/people/', characterSelect, characterInfo, displayCharacterDetails);
    }
    if (planetSelect) {
        fetchData('https://swapi.dev/api/planets/', planetSelect, planetInfo, displayPlanetDetails);
    }
    if (starshipSelect) {
        fetchData('https://swapi.dev/api/starships/', starshipSelect, starshipInfo, displayStarshipDetails);
    }
});
