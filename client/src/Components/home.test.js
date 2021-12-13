import { mount } from "enzyme";
import Home from "./home";
import { Provider } from "react-redux";
import store from "../redux/store";
import Name from "./name";
import Room from "./room";
import Game from "./game";
import NextPiece from "./NextPiece";
import Board from "./board";
import chat from "./chat";
import PlayersStage from "./PlayersStage";

describe("Home", () => {
  it("should render components without crashing", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(wrapper.find(Name).length).toEqual(1);
    // console.log(wrapper.find("form").debug());
    wrapper.find("#id1").simulate("change", { target: { value: "test" } });
    wrapper.find(".input-div").simulate("submit");
    expect(wrapper.find(Name).length).toEqual(0);
    expect(wrapper.find(Room).length).toEqual(1);
    // console.log(wrapper.find("form").debug());
    wrapper.find("#id2").simulate("change", { target: { value: "test" } });
    wrapper.find(".room-button").simulate("submit");
    expect(wrapper.find(Name).length).toEqual(0);
    expect(wrapper.find(Game).length).toEqual(1);
    expect(wrapper.find(Board).length).toEqual(1);
    expect(wrapper.find(chat).length).toEqual(1);
    expect(wrapper.find(PlayersStage).length).toEqual(0);
    // console.log(wrapper.debug());
    // wrapper.find(".room-field").simulate("keyPress", { key: "Enter" });
    // expect(wrapper.find(NextPiece).length).toEqual(1);
  });
});
