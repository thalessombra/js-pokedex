const pokemonList = document.getElementById('pokemonlist')
const loadMore = document.getElementById('loadmore')

const maxRecords = 151;
const limit = 12;
let offset = 0;




function loadPokemonItens (offset, limit) {
    
pokeApi.getPokemons(offset, limit).then((pokemons = []) =>  {
    const newHtml = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}" >
                <span class="number" >${pokemon.number}</span>
            <span class="name" > ${pokemon.name}</span>

            <div class="detail" >
                <ol class="types" >
                    ${pokemon.types.map((type) => ` <li class="type  ${type}">${type}</li>`).join('')}
                </ol>
                
                <img src="${pokemon.photo}" 
                alt="${pokemon.name}">

            </div>
                
            </li>
    
    `).join('')

    pokemonList.innerHTML += newHtml
    
    })
}

loadPokemonItens(offset, limit)

loadMore.addEventListener('click', () => {
    offset += limit

  const qtdRecord = offset + limit

    if (qtdRecord >= maxRecords) {
        const newLimit = qtdRecord - maxRecords
        loadPokemonItens(offset, newLimit)

        loadMore.parentElement.removeChild(loadMore)

    }
    else {
           loadPokemonItens(offset, limit)
    }

})



