import { mount } from "enzyme";
import { Provider } from "react-redux";
import Room from "./room";
import rootReducer from "../redux/reducers";
import { createStore } from "redux";

it("should render components without crashing", () => {
  const store = createStore(rootReducer, {
    sockets: { rooms: [""] },
  });

  const wrapper = mount(
    <Provider store={store}>
      <Room
        data={{
          created: false,
          setcreated: () => {},
          roomName: "roomname",
          setroomName: () => {},
          mode: "solo",
          start: true,
        }}
      />
    </Provider>
  );

});
