import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import SideBar from "./components/SideBar/SideBar";
import Ren from "./pages/Horenso/Ren/Ren";
import So from "./pages/Horenso/So/So";


function App() {
  return (
    <Router>
      <div className="App">
        <SideBar />

        <Switch>
          <Route path="/meeting">
            <So />
          </Route>
          <Route path="/chat">
            <Ren />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
