import { mount } from "enzyme";
import { Provider } from "react-redux";
import store from "../redux/store";
import Name from "./name";
import Room from "./room";
import Game from "./game";
import rootReducer from "../redux/reducers";
import { createStore } from "redux";

describe("Name", () => {
    const store = createStore(rootReducer, {
        sockets: { userexists: null },
      });

  it("should render components without crashing", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Name data={{ username: "", setusername: () => {}, clicked: 0, setclicked: () => {} }} />
      </Provider>
    );

    expect(wrapper.find(Name).length).toEqual(1);
    // // console.log(wrapper.find("form").debug());
    // wrapper.find("#id1").simulate("change", { target: { value: "test" } });
    // wrapper.find(".submit").simulate("click");
    // expect(wrapper.find(Name).length).toEqual(0);
    // expect(wrapper.find(Room).length).toEqual(1);
    // // console.log(wrapper.find("form").debug());
    // wrapper.find("#id2").simulate("change", { target: { value: "test" } });
    // wrapper.find(".room-button").simulate("click");
    // expect(wrapper.find(Game).length).toEqual(1);
    // expect(wrapper.find(".home-button").simulate("click"));
    // expect(wrapper.find(Room).length).toEqual(1);
  });
});
