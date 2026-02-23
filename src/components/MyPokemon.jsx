import { useContext } from "react";
import TeamContext from "../context/TeamContext";
import Pokeman from "./Pokeman";
import Loading from "./Loading";

export default function MyPokemon({setIsModalOpen}) {
  const {team, setTeam} = useContext(TeamContext);

  const handleDrop = (name) => {
    setTeam(prev => prev.filter(p => p !== name));
    !setIsModalOpen ? null : setIsModalOpen(false)
  };

  const handlePurge = () => {
    confirm('YOU SURE?') ? console.log("SURE") : console.log("Nevermind")
  }


  return (
    <div className="teamPage">
      <h1 id="teamTitle">My caught Pokemon</h1>
      <div className="myTeam">
        {team.length === 0
          ? <><h1>TRY CATCHING A POKEMON YOU NERD</h1><Loading /></>
          : team.map(pokemon => {
            return (<div key={pokemon} className="teamMember">
              <Pokeman name={pokemon} />
              <button className="dropPokemon" onClick={(() => handleDrop(pokemon))}>DROP</button>
            </div>
            )
          })}
      </div>
      <button id="purgeButton" onClick={handlePurge}>PURGE TEAM</button>
    </div>
  )
}