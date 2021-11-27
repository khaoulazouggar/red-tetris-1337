import { useEffect, useState } from "react";
import Isvalidname from "../tools/isvalidname";
import "../scss/home.scss";
import "../scss/room.scss";

function Home(props) {
  const [errRoomname, seterrRoomname] = useState("");
  const [isTrue, setisTrue] = useState(true);

  useEffect(() => {
    props.data?.roomName ? setisTrue(false) : setisTrue(true);
    checkRoomname();
    // eslint-disable-next-line
  }, [props.data?.roomName, isTrue]);

  //handle check Roomname inputs
  const checkRoomname = () => {
    if (Isvalidname(props.data?.roomName)) {
      seterrRoomname(Isvalidname(props.data?.roomName));
      setisTrue(true);
    } else seterrRoomname("");
  };
  const handelRoom = () => {
    props.data?.setcreated(true);
  };
  return (
    <div className="room-field">
      <div className="left-field" data-aos="zoom-in" data-aos-duration="1000">
        <div className="create-room" data-aos="fade-right" data-aos-duration="2000" data-aos-delay="300">
          <div className="room-div">
            <div className="input-div">
              <input
                className="inputfield"
                type="text"
                value={props.data?.roomName}
                onChange={(e) => {
                  props.data?.setroomName(e.target.value);
                }}
              />
              <fieldset aria-hidden="false">
                <legend className="legend-field">
                  <span>Create room</span>
                </legend>
              </fieldset>
            </div>

            <button
              className="room-button"
              disabled={isTrue}
              onClick={() => {
                handelRoom();
              }}
            >
              <p className="room-p">Press Enter</p>
            </button>
            <span className="errors" style={{ marginTop: "50px" }}>
              {errRoomname}
            </span>
          </div>
        </div>
        <div className="room-list" data-aos="fade-left" data-aos-duration="2000" data-aos-delay="300">
          <h2 className="room-list-h2">Rooms :</h2>
          <div className="header-list">
            <div className="list-name">
              <p className="header-p">Name</p>
            </div>
            <div className="list-attribute">
              <p className="header-p">Mode</p>
            </div>
            <div className="list-attribute">
              <p className="header-p">Players</p>
            </div>
            <div className="list-attribute">
              <p className="header-p">Status</p>
            </div>
          </div>
          <div className="body-list">
            <div className="list-item">
              <div className="content-list-item">khaoula</div>
              <div className="content-list-item">Solo</div>
              <div className="content-list-item">1/1</div>
              <div className="content-list-item">In game</div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="right-field">
      <div className="score"></div>
      <div className="chat"></div>
    </div> */}
    </div>
  );
}

export default Home;
