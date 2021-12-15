import { useEffect, useState } from "react";
import "../scss/home.scss";
import Name from "../Components/name";
import Room from "../Components/room";
import Game from "../Components/game";
import { ToastContainer } from "react-toastify";
import { socket } from "../socket/socket";
import { connect } from "react-redux"
import { clearChatMessages, newPLayer, newRoom } from "../redux/actions/sockets/socketsActions";

function Home(props) {
	const { clearChatMessages, stages, newPLayer, newRoom } = props;
	const [username, setusername] = useState("");
	const [clicked, setclicked] = useState(0);
	const [created, setcreated] = useState(false);
	const [roomName, setroomName] = useState("");
	const [mode, setmode] = useState("solo");
	const [start, setstart] = useState(true);

	useEffect(() => {
		if (window.location.hash) {
			const hash = window.location.hash.substring(1);
			const regex = /^[a-zA-Z0-9]{1,12}[[][a-zA-Z0-9]{1,12}]$/;
			if (regex.test(hash)) {
				let i = 0;
				while (i < hash.length) {
					if (hash[i] === "[") {
						setroomName(hash.substring(0, i));
						setusername(hash.substring(i + 1, hash.length - 1));
						setclicked(2);
						setcreated(true);
						if (username && roomName) {
							socket.emit("create_user_room", { username, room: roomName, stages })
							newPLayer(username);
							newRoom(roomName);
						} break;
					}
					i++;
				}
			}
			else {
				if (clicked === 0)
					window.location.href = `${window.location.origin}/#`;
			}
		} else {
			// console.log("no hash");
			if (username && roomName && created) {
				window.location.href = `${window.location.origin}/#${roomName}[${username}]`;
			}
		}
	}, [roomName, username, created, clicked]);

	return (
		<div className="home">
			<div className="navigation">
				<div style={{ width: "33%" }}>
					{created ? (
						<button
							className="home-button"
							onClick={() => {
								setcreated(false);
								setclicked(1);
								setroomName("");
								setstart(true);
								window.location.href = `${window.location.origin}/#`;
								socket.emit("leaveRoom");
								clearChatMessages();
							}}
						>
							home
						</button>
					) : (
						""
					)}
				</div>
				<h1 className="title">Tetris</h1>
				<div className="name-player">{clicked ? username : ""}</div>
			</div>
			{clicked === 1 ? (
				<Room data={{ created, setcreated, roomName, setroomName, mode, start }} />
			) : clicked === 0 ? (
				<Name data={{ username, setusername, clicked, setclicked }} />
			) : (
				""
			)}
			{created ? (
				<Game data={{ clicked, setclicked, username, setusername, roomName, setroomName, setmode, start, setstart }} />
			) : (
				""
			)}
			{/* <Game data={{clicked, setclicked, username, setusername, setmode, start, setstart}}/> */}
			{/* <Room data={{ created, setcreated, roomName, setroomName}}/> */}
			<ToastContainer />
		</div>
	);
}

const mapStatetoProps = (state) => ({
	stages: state.sockets.stages
})

const mapDispatchtoProps = { clearChatMessages, newPLayer, newRoom }
export default connect(mapStatetoProps, mapDispatchtoProps)(Home);
