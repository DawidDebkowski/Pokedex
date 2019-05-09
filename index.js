const api = 'https://pokeapi.co/api/v2'

function renderPokemon(pokemon) {
	return `
		<div class = "row pokemon">
			<img src="${pokemon.sprites.front_default}">
			<div class="col">
				<span>${pokemon.name}</span>
				<span>type: ${pokemon.types.map(type => type.type.name).join(",")}</span>
				<span>weight: ${pokemon.weight / 10} kg</span>
			</div>
		</div>
	`
}

function loadPokemons(pageNumber) {
	if (typeof pageNumber === "undefined") pageNumber = 0;
	const pro = fetch(api + "/pokemon?limit=10offset=" + 10 * pageNumber); // Promise
	pro.then(function (resp) {
		return resp.json();
	})
		.then(function (json) {
			let listaPokemonow = json.results; // [{},{}]
			let requesty = listaPokemonow.map(
				(pokemon) => {
					return fetch(pokemon.url)
						.then(function (resp) {
							return resp.json();
						})
				}
			)
			Promise.all(requesty).then(function (pokemony) {
				const listaHtmliPokemonow = pokemony
					.map((pokemon) => renderPokemon(pokemon))
				const htmlWszystkichPokemonow = listaHtmliPokemonow.join(""); // ""
				document.querySelector("#pokemony").innerHTML = htmlWszystkichPokemonow;
			})

		})
		.catch(function (err) {
			console.error(err)
		})
}
let pageNumber = 0;
function init() {
	document.querySelector("#next").addEventListener("click", e => {
		pageNumber++;
		loadPokemons(pageNumber);
	})
	document.querySelector("#prev").addEventListener("click", e => {
		pageNumber = pageNumber - 1 > 0 ? pageNumber - 1 : 0;
		loadPokemons(pageNumber);
	})
}

window.addEventListener("load", init)
//document.addEventListener("load",loadPokemons)