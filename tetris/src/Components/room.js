import { useEffect, useState } from "react";
import "../scss/home.scss";
import "../scss/room.scss";

function Home() {
    const [roomName, setroomName] = useState("");
    const [isTrue, setisTrue] = useState(true);
  
    useEffect(() => {
      roomName ? setisTrue(false) : setisTrue(true);
      console.log(roomName);
      console.log(isTrue);
    }, [roomName, isTrue]);
  
  return (
    <div className="home">
      <div className="navigation">
        <h1 className="title">Tetris</h1>
      </div>
      <div className="content">
        <div className="room-field">
          <div className="left-field">
            <div className="create-room">
              <div className="room-div">
                <label className="room-label">Create room</label>
                <div className="input-div">
                  <input
                    className="inputfield"
                    type="text"
                      value={roomName}
                    onChange={(e) => {
                      setroomName(e.target.value);
                    }}
                  />
                  <fieldset aria-hidden="false">
                    {/* <legend className="legend-field">
                <span>Create room</span>
              </legend> */}
                  </fieldset>
                </div>

                <button className="room-button" disabled={isTrue}>
                  <p className="room-p">Press Enter</p>
                </button>
              </div>
            </div>
            <div className="room-list">
            <h2 className="room-list-h2">Rooms :</h2>
            <div className="header-list"></div>
            <div className="body-list"></div>
            </div>
          </div>
          <div className="right-field">
            <div className="score"></div>
            <div className="chat"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
