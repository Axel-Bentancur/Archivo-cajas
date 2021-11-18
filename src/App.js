import { Route } from "react-router";

/* COMPONENTS */
import Nav from "./Components/Navbar/Navbar";
import CreateBox from "./Components/Createbox/CreateBox";
import Home from "./Components/Home/Home";

/* STYLES */
import "./App.css";

function App() {
  return (
    <div className="container-grid">
      <Nav />
      <Route exact path="/" render={() => <Home />} />
      <Route path="/boxes" render={() => <CreateBox />} />
    </div>
  );
}

export default App;
