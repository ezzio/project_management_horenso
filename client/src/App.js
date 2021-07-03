import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import SideBar from "./components/SideBar/SideBar";
import Meeting from "./pages/Horenso/Meeting/Meeting";
import Chat from "./pages/Horenso/Chat/Chat";

function App() {
  return (
    <Router>
      <div className="App">
        <SideBar />

        <Switch>
          <Route path="/meeting">
            <Meeting />
          </Route>
          <Route path="/chat">
            <Chat />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
