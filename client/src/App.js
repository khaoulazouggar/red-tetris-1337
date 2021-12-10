import Home from "./Components/home";
import AOS from "aos";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";
AOS.init();

function App() {
	return (
		<div className="App">
			<Home />
		</div>
	);
}

export default App;
