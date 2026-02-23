import { useNavigate } from "react-router-dom"
import SearchBar from "./SearchBar"

export default function NavBar() {
  console.log("NAVBAR")
  const navigate = useNavigate()
  return (
    <div id="navBar">
      <div id="navButtons">
      <button id="homeButton" onClick={() => navigate('/')}>GO HOME</button>
      <button id="teamButton" onClick={() => navigate('/my-pokemon')}>MY TEAM</button>
      </div>
      <SearchBar />
    </div>
  )
}