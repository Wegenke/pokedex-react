import React from "react";
import { useNavigate } from 'react-router-dom'
import usePokemon from "../customHooks/usePokemon";
import Loading from "./Loading";

function Pokeman({name}){

  const {data, loading} = usePokemon(name)
  const navigate = useNavigate()

  if(loading) return <Loading />
  if(!data) return null

  const type = data.types[0].type.name;
  const sprite = data.sprites.other['official-artwork'].front_default;

  const handleClick = () =>{
    navigate(`/details/${name}`)
  }

  return(
      <div className={`pokeman ${type}`} onClick={handleClick}>
        <h2 className="listName">{name}</h2>
        <img className="onlymon" src={sprite} alt={name} />
      </div>
  );
}

export default React.memo(Pokeman);