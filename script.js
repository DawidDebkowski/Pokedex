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
            const listaPokemonow = json.resultrs;
            const listaHtmliPokemonow = listaPokemonow.map(
                function (pokemon) { return buildPokemon(pokemon.name); })
            const htmlWszystkichPokemonow = listaHtmliPokemonow.join();
            document.querySelector("#pokemony").innerHTML = htmlWszystkichPokemonow
        })
        .catch(function (err) {
            console.error(err)
        })
}
document.addEventListener("load", loadPokemons)
