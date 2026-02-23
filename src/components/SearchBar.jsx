import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { pokemonCache } from "../customHooks/usePokemon";

const pokeUrl = "https://pokeapi.co/api/v2/pokemon"

export default function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const [allPokemon, setAllPokemon] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    fetch(`${pokeUrl}?limit=1302`)
      .then(res => res.json())
      .then(data => {
        const pokemonNames = data.results.map(x => x.name)
        setAllPokemon(pokemonNames);

        const queue = [...data.results]

        const runNext = () => {
          const next = queue.shift();
          if(!next) return;

          if(!pokemonCache.has(next.name)){
            fetch(next.url)
              .then(res => res.json())
              .then(data => {
                pokemonCache.set(next.name, data)
                pokemonCache.set(String(data.id), data)
                runNext()
              })
          }else{
            runNext();
          }
        }

        for(let i = 0; i<10; i++){
          runNext()
        }
      })
  }, [])


  const filteredPokemon = useMemo(() => {
    if (!inputValue) return [];

    return allPokemon.filter(pokemon =>
      pokemon.toLowerCase().includes(inputValue.toLowerCase())).slice(0, 20);
  }, [allPokemon, inputValue]);

  const handleRandomon = async () => {
    if (!allPokemon.length) return;

    const random = allPokemon[Math.floor(Math.random() * allPokemon.length)]

    if(!pokemonCache.has(random)){
      const res = await fetch(`${pokeUrl}/${random}`)
      const data = await res.json()

      pokemonCache.set(random, data);
      pokemonCache.set(String(data.id), data)
    }

    navigate(`/details/${random}`)
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleSearch = () => {
    filteredPokemon.length >= 1 ? navigate(`/details/${filteredPokemon[0]}`) : alert("That is not a pokemon")
    setInputValue("")
    document.querySelector("#root").focus()
  }

  return (
    <div className="searchBar">
      <button id="randomButton" onClick={handleRandomon} disabled={!allPokemon.length}>RANDOMON</button>
      <input list="pokemans" className="pokeSearch" id="pokefinder" placeholder="POKE NAME" onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleEnter} />
      <datalist id='pokemans'>
        {filteredPokemon.map(pkmn => <option value={pkmn} key={pkmn}>{pkmn}</option>)}
      </datalist>
      <button id="locateButton" onClick={handleSearch}>LOCATE</button>
    </div>
  );
}