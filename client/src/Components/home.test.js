import { mount } from "enzyme";
import Home from "./home";
import { Provider } from "react-redux";
import store from "../redux/store";
import Name from "./name";
import Room from "./room";
import Game from "./game";

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
  });
});
