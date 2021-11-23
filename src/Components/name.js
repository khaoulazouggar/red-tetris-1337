import { useEffect, useState } from "react";
import "../scss/home.scss";
import Isvalidname from "../tools/isvalidname";

function Name(props) {
  //   const [username, setusername] = useState("");
  const [isTrue, setisTrue] = useState(true);
  const [errusername, seterrusername] = useState("");
  useEffect(() => {
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
  const handelName = () => {
    props.data.setclicked(true);
  };

  return (
    <div className="content">
      <div className="namefield">
        {/* <label
        class="label-field"
        for="name"
        id="name-label"
      >
        Enter your name...
      </label> */}
        <div className="input-div">
          <input
            className="inputfield"
            type="text"
            value={props.data.username}
            onChange={(e) => {
              props.data.setusername(e.target.value);
            }}
            // placeholder="Enter your name..."
          />
          <fieldset aria-hidden="true">
            <legend className="legend-field">
              <span>Enter your name...</span>
            </legend>
          </fieldset>
        </div>

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

export default Name;
