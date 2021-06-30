import React from "react";

import "./App.css";
import SideBar from "./components/SideBar/SideBar";
import So from "./pages/Horenso/So/So";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <SideBar />

        <Switch>
          <Route path="/meeting">
            <So />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
