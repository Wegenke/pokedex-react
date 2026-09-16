import { useState, useEffect, useMemo } from "react";
import RouteController from "./controllers/RouteController";
import TeamContext from "./context/TeamContext";
import Layout from "./components/Layout";

function App() {
  const [team, setTeam] = useState(() => {
    const saved = localStorage.getItem('team')
    return saved ? JSON.parse(saved) : []
  });

  const [pokeList, setPokeList] = useState([]);

  const [curPage, setCurPage] = useState("https://pokeapi.co/api/v2/pokemon?limit=9");
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  useEffect(() => {
    fetch(curPage)
      .then(res => res.json())
      .then(data => {
        setPokeList(data.results);
        setNextPage(data.next);
        setPrevPage(data.previous);
      });
  }, [curPage]);

  useEffect(() => {
    localStorage.setItem("team", JSON.stringify(team))
  }, [team])

  const value = useMemo(() => ({
    team,
    setTeam
  }), [team]);

  return (
    <>
      <TeamContext.Provider value={value}>
        <Layout >
        <RouteController pokeList={pokeList} nextPage={nextPage} prevPage={prevPage} setCurPage={setCurPage} team={team} setTeam={setTeam} />
        </Layout>
      </TeamContext.Provider>
    </>
  );
}

export default App;