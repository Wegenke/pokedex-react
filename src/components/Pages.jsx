export default function Pages({nextPage,prevPage,setCurPage}){
  return (<div className="pages">
    {prevPage != null? <button onClick={() => setCurPage(prevPage)} className="pageButton">PREV</button> : <button disabled className="pageButton">Prev</button>}
    {nextPage != null? <button onClick={() => setCurPage(nextPage)} className="pageButton">NEXT</button> : <button disabled className="pageButton">Next</button>}
  </div>)
}