import { mount } from "enzyme";
import { Provider } from "react-redux";
// import store from "../redux/store";
import Game from "./game";
import NextPiece from "./NextPiece";
import Board from "./board";
import chat from "./chat";
import PlayersStage from "./PlayersStage";
import rootReducer from "../redux/reducers";
import { createStore } from "redux";

describe("Game", () => {
  const store = createStore(rootReducer, {
    sockets: { tetriminos: [], Stages: [{ stage: [[]], username: "" }], userName: "khaoula" },
  });
  it("should render components without crashing", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Game
          data={{
            clicked: 1,
            setclicked: () => {},
            username: "khaoula",
            setusername: () => {},
            roomName: "room",
            setroomName: () => {},
            setmode: () => {},
            start: true,
            setstart: () => {},
          }}
        />
      </Provider>
    );
    expect(wrapper.find(Board).length).toEqual(1);
    expect(wrapper.find(chat).length).toEqual(1);
    wrapper.find(".room-field").simulate("keypress", { key: "Enter" });
    wrapper.find(".room-field").simulate("keydown");
  });

  it("should render components without crashing", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Game
          data={{
            clicked: 1,
            setclicked: () => {},
            username: "khaoula",
            setusername: () => {},
            roomName: "room",
            setroomName: () => {},
            setmode: () => {},
            start: false,
            setstart: () => {},
          }}
        />
      </Provider>
    );
    expect(wrapper.find(Board).length).toEqual(1);
    expect(wrapper.find(chat).length).toEqual(1);
    expect(wrapper.find(NextPiece).length).toEqual(1);
    expect(wrapper.find(PlayersStage).length).toEqual(1);

    // wrapper.setProps({ start: false });
    // wrapper.find(".room-field").simulate("keypress", { key: "Enter" });
    // console.log(wrapper.find(".room-field").debug());
  });
});
