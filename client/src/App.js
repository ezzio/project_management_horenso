import SideBar from "components/SideBar/SideBar";
import KanbanDashBoard from "features/KanbanDashBoard/components/KanbanDashBoard";
import Conversation from "pages/Horenso/Conversation/Conversation";
import Report from "pages/Horenso/Report/Report";

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation
} from 'react-router-dom';
import './App.scss';
import Meeting from './pages/Horenso/Meeting/Meeting';
import Source from './pages/Storage/Source/Source';


function App() {
  return (
    <Router>
      <div className="App">
        <SideBar />
        <AnimatedRouter />
        {/* <Board /> */}
      </div>
    </Router>
  );
}

const AnimatedRouter = () => {
  const location = useLocation();
  const [transitionStage, setTransitionStage] = React.useState("in");
  const [displayLocation, setDisplayLocation] = React.useState(location);
  React.useEffect(() => {
    if (location.pathname !== displayLocation.pathname)
      setTransitionStage("out");
  }, [location]);
  return (
    <div
      className={transitionStage === "in" ? "slide-bottom" : "slide-top"}
      onAnimationEnd={() => {
        if (transitionStage === "out") {
          setTransitionStage("in");
          setDisplayLocation(location);
        }
      }}
    >
      <Switch location={displayLocation}>
        <Route path="/meeting" children={<Meeting />} />
        <Route path="/conversation" children={<Conversation />} />
        <Route path="/kanban" children={<KanbanDashBoard />} />
        <Route path="/report" children={<Report />} />
        <Route path="/source" children={<Source />} />

      </Switch>
    </div>
  );
};

export default App;
