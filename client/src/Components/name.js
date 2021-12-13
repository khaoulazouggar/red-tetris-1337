import { useEffect, useState, useRef } from "react";
import "../scss/home.scss";
import Isvalidname from "../tools/isvalidname";
import { socket } from "../socket/socket";
import { newPLayer } from "../redux/actions/sockets/socketsActions"
import { connect } from "react-redux";

function Name(props) {
  //   const [username, setusername] = useState("");
  const { newPLayer } = props;
  const [isTrue, setisTrue] = useState(true);
  const [errusername, seterrusername] = useState("");
  const nameRef = useRef(null);
  useEffect(() => {
    nameRef.current.focus();
    props.data.username ? setisTrue(false) : setisTrue(true);
    checkUsername();
    // eslint-disable-next-line
  }, [props.data.username, isTrue]);

  //handle check username inputs
  const checkUsername = () => {
    if (Isvalidname(props.data.username)) {
      seterrusername(Isvalidname(props.data.username));
      setisTrue(true);
    } else seterrusername("");
  };
  const handelName = (e) => {
    e?.preventDefault();
    if (props.data.username && !isTrue) {

      props.data.setclicked(1);
      socket.emit("new_user", { username: props.data.username });
      newPLayer(props.data.username)

    }
  };

  return (
    <div className="content" data-aos="flip-left" data-aos-duration="1000" data-aos-delay="300">
      <div className="namefield">
        {/* <label
        class="label-field"
        for="name"
        id="name-label"
      >
        Enter your name...
      </label> */}
        <form className="input-div" onSubmit={handelName}>
          <input
            className="inputfield"
            type="text"
            value={props.data.username}
            onChange={(e) => {
              props.data.setusername(e.target.value);
            }}
            ref={nameRef}
          // placeholder="Enter your name..."
          />
          <fieldset aria-hidden="true">
            <legend className="legend-field">
              <span>Enter your name...</span>
            </legend>
          </fieldset>
        </form>

        <button
          type="submit"
          className="submit"
          disabled={isTrue}
          onClick={() => {
            handelName();
          }}
        >
          <div className="submit-div">
            <div className="green-dev">
              <p className="p-field">P</p>
            </div>
            <div className="pink-dev">
              <p className="p-field">L</p>
            </div>
            <div className="green-dev">
              <p className="p-field">A</p>
            </div>
            <div className="pink-dev">
              <p className="p-field">Y</p>
            </div>
          </div>
        </button>
        <span className="errors">{errusername}</span>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = { newPLayer }

export default connect(mapStateToProps, mapDispatchToProps)(Name);
