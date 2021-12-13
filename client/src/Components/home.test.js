import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Home from "./home";
import Room from "./room";

// configure({ adapter: new Adapter() });

describe("Home", () => {
  it("should render components without crashing", () => {
    const wrapper = shallow(<Home />);
    // console.log(wrapper.debug());
    // expect(wrapper.find(<Room />));
  });
});
