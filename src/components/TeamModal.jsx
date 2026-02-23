import { createPortal } from "react-dom";
import MyPokemon from "./MyPokemon";

export default function TeamModal({ isModalOpen, setIsModalOpen }) {
  if (!isModalOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h1>DROP POKEMON TO MAKE ROOM</h1>
        <MyPokemon setIsModalOpen={setIsModalOpen}/>
        <button className="modal-close-button" onClick={() => setIsModalOpen(false)}>
          SET TEAM
        </button>
      </div>
    </div>,
    document.getElementById('root')
  );
}