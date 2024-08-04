document.getElementById('search-button').addEventListener('click', function () {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    if (!searchInput) return;

    fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput}`)
        .then(response => {
            if (!response.ok) {
                alert("Pokémon not found");
                throw new Error("Pokémon not found");
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('pokemon-name').textContent = data.name.toUpperCase();
            document.getElementById('pokemon-id').textContent = `#${data.id}`;
            document.getElementById('weight').textContent = `Weight: ${data.weight}`;
            document.getElementById('height').textContent = `Height: ${data.height}`;
            document.getElementById('hp').textContent = data.stats[0].base_stat;
            document.getElementById('attack').textContent = data.stats[1].base_stat;
            document.getElementById('defense').textContent = data.stats[2].base_stat;
            document.getElementById('special-attack').textContent = data.stats[3].base_stat;
            document.getElementById('special-defense').textContent = data.stats[4].base_stat;
            document.getElementById('speed').textContent = data.stats[5].base_stat;

            const typesElement = document.getElementById('types');
            typesElement.innerHTML = '';
            data.types.forEach(typeInfo => {
                const typeElement = document.createElement('div');
                typeElement.textContent = typeInfo.type.name.toUpperCase();
                typesElement.appendChild(typeElement);
            });

            const spriteContainer = document.getElementById('sprite-container');
            spriteContainer.innerHTML = '';
            const spriteImage = document.createElement('img');
            spriteImage.id = 'sprite';
            spriteImage.src = data.sprites.front_default;
            spriteContainer.appendChild(spriteImage);
        })
        .catch(error => console.error('Error:', error));
});

// For initial testing, set the price and cid here.
document.getElementById('search-input').value = "pikachu"; // Change this for different testing values
document.getElementById('search-button').click(); // Simulate a click for testing
