document.getElementById('search-button').addEventListener('click', function() {
    const searchInput = document.getElementById('search-input').value.trim().toLowerCase();
    const apiUrl = `https://pokeapi-proxy.freecodecamp.rocks/api/v2/pokemon/${searchInput}`;
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon not found');
            }
            return response.json();
        })
        .then(data => {
            displayPokemon(data);
        })
        .catch(error => {
            alert(error.message);
            clearResults();
        });
});

function displayPokemon(data) {
    document.getElementById('pokemon-name').textContent = data.name.toUpperCase();
    document.getElementById('pokemon-id').textContent = `#${data.id}`;
    document.getElementById('weight').textContent = `Weight: ${data.weight / 10} kg`;
    document.getElementById('height').textContent = `Height: ${data.height / 10} m`;
    document.getElementById('hp').textContent = `HP: ${data.stats[0].base_stat}`;
    document.getElementById('attack').textContent = `Attack: ${data.stats[1].base_stat}`;
    document.getElementById('defense').textContent = `Defense: ${data.stats[2].base_stat}`;
    document.getElementById('special-attack').textContent = `Special Attack: ${data.stats[3].base_stat}`;
    document.getElementById('special-defense').textContent = `Special Defense: ${data.stats[4].base_stat}`;
    document.getElementById('speed').textContent = `Speed: ${data.stats[5].base_stat}`;

    const typesElement = document.getElementById('types');
    typesElement.innerHTML = '';
    data.types.forEach(type => {
        const typeElement = document.createElement('p');
        typeElement.textContent = type.type.name.toUpperCase();
        typesElement.appendChild(typeElement);
    });

    const spriteElement = document.getElementById('sprite');
    spriteElement.src = data.sprites.front_default;
    spriteElement.alt = `${data.name} sprite`;
}

function clearResults() {
    document.getElementById('pokemon-name').textContent = '';
    document.getElementById('pokemon-id').textContent = '';
    document.getElementById('weight').textContent = '';
    document.getElementById('height').textContent = '';
    document.getElementById('hp').textContent = '';
    document.getElementById('attack').textContent = '';
    document.getElementById('defense').textContent = '';
    document.getElementById('special-attack').textContent = '';
    document.getElementById('special-defense').textContent = '';
    document.getElementById('speed').textContent = '';
    document.getElementById('types').innerHTML = '';
    document.getElementById('sprite').src = '';
    document.getElementById('sprite').alt = '';
}
