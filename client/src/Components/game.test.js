import { mount } from "enzyme";
import Home from "./home";
import { Provider } from "react-redux";
import store from "../redux/store";
import Name from "./name";
import Room from "./room";
import Game from "./game";

describe("Game", () => {
  it("should render components without crashing", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Game
          data={{
            clicked: 0,
            setclicked: () => {},
            username: "ab",
            setusername: () => {},
            roomName: "ab",
            setroomName: () => {},
            setmode: () => {},
            start: false,
            setstart: () => {},
          }}
        />
      </Provider>
    );
  });
});
