import { useEffect, useState } from "react";
import "../scss/home.scss";

function Home() {
  const [username, setusername] = useState("");
  const [isTrue, setisTrue] = useState(true);

  useEffect(() => {
    username ? setisTrue(false) : setisTrue(true);
    console.log(username);
    console.log(isTrue);
  }, [username, isTrue]);

  return (
    <div className="home">
      <div className="navigation">
        <h1 className="title">Tetris</h1>
      </div>
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
              value={username}
              onChange={(e) => {
                setusername(e.target.value);
              }}
              // placeholder="Enter your name..."
            />
            <fieldset aria-hidden="true">
              <legend className="legend-field">
                <span>Enter your name...</span>
              </legend>
            </fieldset>
          </div>

          <button type="submit" className="submit" disabled={isTrue}>
            <div className="sc-hmzhuo submit-div">
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
        </div>
      </div>

      {/* <div class="sc-kgAjT jtjtag">
        <form class="sc-cJSrbW knQtXQ">
          <div
            class="MuiFormControl-root MuiTextField-root jss1 jss2 MuiFormControl-marginNormal"
            spellcheck="false"
          >
            <label
              class="MuiFormLabel-root MuiInputLabel-root jss4 MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-outlined"
              data-shrink="false"
              for="name"
              id="name-label"
            >
              Enter your name...
            </label>
            <div class="MuiInputBase-root MuiOutlinedInput-root jss3 MuiInputBase-formControl">
              <input
                autocomplete="off"
                id="name"
                type="text"
                class="MuiInputBase-input MuiOutlinedInput-input"
                value=""
              />
              <fieldset
                aria-hidden="true"
                class="jss67 MuiOutlinedInput-notchedOutline"
                
              >
                <legend class="jss68" >
                  <span>&ZeroWidthSpace;</span>
                </legend>
              </fieldset>
            </div>
          </div>
          <button type="submit" class="sc-ksYbfQ dMEnhK" disabled="">
            <div class="sc-hmzhuo kDWVuN">
              <div color="#ff8b00" class="sc-jDwBTQ gbzTqk">
                <p class="sc-gPEVay hdphgb">P</p>
              </div>
              <div color="#dc143c" class="sc-jDwBTQ jnoeMX">
                <p class="sc-gPEVay hdphgb">L</p>
              </div>
              <div color="#ff8b00" class="sc-jDwBTQ gbzTqk">
                <p class="sc-gPEVay hdphgb">A</p>
              </div>
              <div color="#dc143c" class="sc-jDwBTQ jnoeMX">
                <p class="sc-gPEVay hdphgb">Y</p>
              </div>
            </div>
          </button>
        </form>
      </div> */}
    </div>
  );
}

export default Home;
