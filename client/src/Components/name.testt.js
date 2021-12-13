import {  shallow } from "enzyme";
import Name from "./name";

describe("name", () => {
  it("should render without crashing", () => {
    const wrapper = shallow(<Name />);
    expect(wrapper.find('.content')).to.have.lengthOf(0);
  });
});
