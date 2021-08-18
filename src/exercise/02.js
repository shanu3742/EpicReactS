// Render as you fetch
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import { createResource } from 'utils'
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
  PokemonErrorBoundary
  // 🐨 you'll need PokemonErrorBoundary here
} from '../pokemon'




function PokemonInfo({pokemonResource}) {
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
  const [pokemonName, setPokemonName] = React.useState('')
  const [pokemonResource,setPokemonResource] = React.useState(null)
  const createPokemonResource = (pokemonName) => {
   return createResource(fetchPokemon(pokemonName))
  }
 
  React.useEffect(() => {
    if(!pokemonName){
      setPokemonResource(null)
      return
    }
   setPokemonResource(createPokemonResource(pokemonName) )
    },[pokemonName])

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }
  const handleReset = () => {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        {pokemonResource ? ( 
          <PokemonErrorBoundary onReset={handleReset} resetKeys={[pokemonResource]}>
          <React.Suspense fallback={<PokemonInfoFallback name={pokemonName} />}>
          <PokemonInfo pokemonResource={pokemonResource} />
          </React.Suspense>
          </PokemonErrorBoundary>
         
          
        ) : (
          'Submit a pokemon'
        )}
      </div>
    </div>
  )
}

export default App
