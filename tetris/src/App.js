import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Components/home"
import Room from "./Components/room"
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/home" element={<Home/>} />
        </Routes>
        <Routes>
          <Route path="/room" element={<Room/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
