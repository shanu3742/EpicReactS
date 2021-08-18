// useTransition for improved loading states


import * as React from 'react'
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
  PokemonErrorBoundary,
} from '../pokemon'
import {createResource} from '../utils'

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

//set timeout upto that time loading will not come
const SUSPENSE_CONFIG ={
  timeoutMs:4000,
  busyDelayMs:300,
  busyMinDurationMs:700
}

function createPokemonResource(pokemonName) {
   let delay = 200
  return createResource(fetchPokemon(pokemonName, delay))
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')
  //set startTransition and ispending 
  const [startTransition,ispending] = React.useTransition(SUSPENSE_CONFIG) 
  const [pokemonResource, setPokemonResource] = React.useState(null)

  React.useEffect(() => {
    if (!pokemonName) {
      setPokemonResource(null)
      return
    }
    //pass the data in startTransition 
   startTransition(() => {

     setPokemonResource(createPokemonResource(pokemonName))
   })
   
  }, [pokemonName,startTransition])

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function handleReset() {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
     
     
      <div className={`pokemon-info ${ispending?'pokemon-loading':''}`} >
        {pokemonResource ? (
          <PokemonErrorBoundary
            onReset={handleReset}
            resetKeys={[pokemonResource]}
          >
            <React.Suspense
              fallback={<PokemonInfoFallback name={pokemonName} />}
            >
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
