import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../components/Home";
import Details from "../components/Details";
import MyPokemon from "../components/MyPokemon";
import NavBar from "../components/NavBar"

export default function RouteController({ pokeList, nextPage, prevPage, setCurPage, team, setTeam }) {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home pokeList={pokeList} nextPage={nextPage} prevPage={prevPage} setCurPage={setCurPage} />} />
        <Route path='/*' element={<Navigate to='/' replace />} />
        <Route path='/details/:pokemon' element={<Details team={team} setTeam={setTeam} />} />
        <Route path='/my-pokemon' element={<MyPokemon />} />
      </Routes>
    </>
  )
}