import { useEffect, useState, useRef } from "react";
import Isvalidname from "../tools/isvalidname";
import "../scss/home.scss";
import "../scss/room.scss";
import { socket } from "../socket/socket";
import Api from "../socket/Api";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { getRooms, newRoom } from "../redux/actions/sockets/socketsActions";

function Home(props) {
  const { getRooms, rooms, newRoom } = props;
  const [errRoomname, seterrRoomname] = useState("");
  const [isTrue, setisTrue] = useState(true);
  const roomRef = useRef(null);
  useEffect(() => {
    getRooms();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    roomRef.current.focus();
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
  const handelRoom = (e) => {
    e?.preventDefault();
    if (props.data.roomName) {
      newRoom(props.data.roomName);
      socket.emit("create_room", props.data.roomName);
      props.data?.setcreated(true);
    }
  };
  const joinRoom = (room) => {
    if (props.data.mode === "solo") {
    //   console.log("here");

      toast("This is a solo room", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (props.data.mode === "4/4") {
      toast("this room is full", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (props.data.mode === "batlle" && props.data.start === false) {
      toast("this room is in game", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      props.data.setroomName(room);
      socket.emit("join_room", room);
      props.data?.setcreated(true);
    }
  };
  return (
    <div className="room-field">
      <div className="left-field" data-aos="zoom-in" data-aos-duration="1000">
        <div className="create-room" data-aos="fade-right" data-aos-duration="2000" data-aos-delay="300">
          <form className="room-div" onSubmit={handelRoom}>
            <div className="input-div">
              <input
                className="inputfield"
                id="id2"
                type="text"
                value={props.data?.roomName}
                onChange={(e) => {
                  props.data?.setroomName(e.target.value);
                }}
                ref={roomRef}
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
          </form>
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
            {/* <div className="content-list-item">khaoula</div>
              <div className="content-list-item">Solo</div>
              <div className="content-list-item">1/1</div>
              <div className="content-list-item">In game</div> */}
            {rooms.length > 0 &&
              rooms.map((room, i) => {
                return (
                  <div className="list-item" key={i} onClick={() => joinRoom(room)}>
                    <div className="content-list-item">{room}</div>
                    <div className="content-list-item">{props.data.mode}</div>
                    <div className="content-list-item">{props.data.mode === "solo" ? "1/1" : "1/4"}</div>
                    <div className="content-list-item">{props.data.start ? "In Menu" : "In game"}</div>
                  </div>
                );
              })}
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

const mapStateToProps = (state) => ({
  rooms: state.sockets.rooms,
});

const mapDispatchToProps = { getRooms, newRoom };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
