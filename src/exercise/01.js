

import * as React from 'react'
import {PokemonDataView,fetchPokemon,PokemonInfoFallback ,PokemonErrorBoundary} from '../pokemon'
import {createResource} from '../utils'

let  pokemonResource = createResource(fetchPokemon('pikachu'))



function PokemonInfo() {
  const pokemon = pokemonResource.read()
 return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  )
}

function App() {
  return (
    <div className="pokemon-info-app">
      <div className="pokemon-info">
      <PokemonErrorBoundary>
          <React.Suspense fallback={<PokemonInfoFallback />}>
            <PokemonInfo />
          </React.Suspense>
        </PokemonErrorBoundary>
      
       
      </div>
    </div>
  )
}

export default App
