import Home from "./Components/home";
import AOS from "aos";
import "aos/dist/aos.css";
import initSocket from "./socket";
import "react-toastify/dist/ReactToastify.css";
AOS.init();

function App() {
  initSocket();
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
