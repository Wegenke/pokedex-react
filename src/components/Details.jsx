import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import usePokemon from "../customHooks/usePokemon";
import TeamModal from "./TeamModal";
import Loading from "./Loading";

export default function Details({ team, setTeam }) {
  const { pokemon } = useParams();
  const { data, loading } = usePokemon(pokemon);
  const navigate = useNavigate()

  const [isModalOpen, setIsModalOpen] = useState(false)

  if (loading) return <div className="detailPage"><Loading /></div>;
  //Create a no pokemon found default component.
  if (!data) return <h1>No Pokémon found.</h1>;

  const sprite = data.sprites.other["official-artwork"].front_default;
  const type = data.types[0].type.name
  const name = data.name
  const moves = data.moves

  const handleAdd = () => {
    if (team.includes(name)) {
      alert(`${name} already on the team!`)
      return
    }

    if (team.length >= 6) {
      setIsModalOpen(true)
      return
    }

    const updatedTeam = [...team, name]

    setTeam(updatedTeam)

    navigate('/my-pokemon')
  }

  return (
    <div className="detailPage">
      <div className={`details pokeman ${type}`} key={pokemon}>
        <div className="name-img">
          <h1>{name}</h1>
          <img src={sprite} alt={name} />
        </div>

        <div className="moves">
          <h2>MOVES:</h2>
          <ul>
            {moves.slice(0, 10).map(move => (
              <li key={move.move.name}>
                {move.move.name}
              </li>
            ))}
          </ul>
        </div>
        <button id="addButton" onClick={handleAdd}>ADD TO TEAM</button>
      </div>
      <TeamModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} team={team}/>
    </div>
  );
}