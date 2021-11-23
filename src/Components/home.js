import { useState } from "react";
import "../scss/home.scss";
import Name from "../Components/name";
import Room from "../Components/room";

function Home() {
  const [username, setusername] = useState("");
  const [clicked, setclicked] = useState(false);

  return (
    <div className="home">
      <div className="navigation">
        <div style={{width: "33%"}}></div>
        <h1 className="title">Tetris</h1>
        <div className="name-player">{clicked ? username : ""}</div>
      </div>
      {clicked ? <Room /> : <Name data={{ username, setusername, clicked, setclicked }} />}
    </div>
  );
}

export default Home;
