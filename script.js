const api = 'http://pokeapi.co/api/v2'

function buildPokemon(name) {
    return `
    <div id = "pokedex"><div class = "pokemon row"> 
    <img src = "" class = "img">
    <div class = "col">
        <span class = "text"> ${name} </span>
        <span class = "text "> TYP </span>
        <span class = "text"> WAGA </span>
    </div>
</div>
</div>"
`
}
function loadPokemons() {
    fetch(api + "/pokemon")
        .then(function (resp) {
            return resp.json();
        })
        .then(function (json) {
            let listaPokemonow = json.results;
            let requesty = listaPokoemonow.map(
                (pokemon) => {
                    return fetch(pokemon.url)
                        .then(function (resp) {
                            return resp.json()
                        })
                }
            )
            Promise.all(requesty).then(function (pokemony) {
                const listaHtmliPokemonow = listaPokemonow
                    .map((pokemon) => buildPokomen(pokemon.name))
                const htmlWszystkichPokemonow = listaHtmliPokemonow.join("");
                document.querySelector("#pokemon").innerHTML = htmlWszystkichPokemonow
            })
        })
        .catch(function (err) {
            console.error(err)
        })
}
document.addEventListener("load", loadPokemons)
loadPokemons()
