import { useState } from "react";
import "../scss/home.scss";
import Name from "../Components/name";
import Room from "../Components/room";
import Game from "../Components/game";

function Home() {
  const [username, setusername] = useState("");
  const [clicked, setclicked] = useState(0);
  const [created, setcreated] = useState(false);

  return (
    <div className="home">
      <div className="navigation">
        <div style={{ width: "33%" }}></div>
        <h1 className="title">Tetris</h1>
        <div className="name-player">{clicked ? username : ""}</div>
      </div>
      {/* {clicked === 1 ? <Room data={{ created, setcreated}}/> : clicked === 0 ? <Name data={{ username, setusername, clicked, setclicked }} /> : ""} */}
      {/* {created ? <Game data={{clicked, setclicked}}/> : ""} */}
      <Game data={{clicked, setclicked}}/>
    </div>
  );
}

export default Home;
