import { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Home from "./home";
import Room from "./room";
import { Provider } from "react-redux";
import store from "../redux/store";

describe("Home", () => {
  it("should render components without crashing", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Home />
      </Provider>
    );
    console.log(wrapper.debug());
    expect(wrapper.find(Home).length).toEqual(1);
  });
});
