const pokedex = document.getElementById("pokedex");

let url;

//buat array kosongan jika menggunakan promise
const promises = [];

for (let i = 1; i < 150; i++) {
    url = `https://pokeapi.co/api/v2/pokemon/${i}`;

    // ini fetch url jika tanpa promise
    // fetch(url)
    //     .then(res => res.json())
    //     .then(pokemon => {
    //         console.log(pokemon)
    //     });

    promises.push(fetch(url).then(res => res.json()));
}

// Get result menggunakan promise
Promise.all(promises).then(res => {

    const pokemon = res.map(data => ({
        id: data.id,
        name: data.name,
        image: data.sprites["front_default"],
        type: data.types.map(type => type.type.name).join(", ")
    }));

    displayPokemon(pokemon);
});

const displayPokemon = pokemon => {

    const pokemonHTMLString = pokemon.map(data =>
        `<li class="card">
            <img class="card-image" src="${data.image}"/>
            <h2 class="card-title">${data.id}. ${data.name}</h2>
            <p class="card-subtitle">Type: ${data.type}</p>
        </li>`
    ).join("");

    pokedex.innerHTML = pokemonHTMLString;
};