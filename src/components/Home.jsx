import { useMemo } from 'react'
import Pokeman from './Pokeman'
import Pages from './Pages'
import Loading from './Loading'

export default function Home({pokeList = [],nextPage,prevPage,setCurPage}){
  if (pokeList.length === 0)return <Loading />

  const pokemonCards = useMemo(()=>{
    return pokeList.map(pokemon => <Pokeman name={pokemon.name} key ={pokemon.name}/>)
  }, [pokeList])

  return (
    <div className="homePage">
      <div className="pokeList">
        {pokemonCards}
      </div>
      <Pages nextPage={nextPage} prevPage={prevPage} setCurPage={setCurPage}/>
    </div>
  )
}