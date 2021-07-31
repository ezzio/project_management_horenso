import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import "./App.scss";
import SideBar from "./components/SideBar/SideBar";
import Meeting from "./pages/Horenso/Meeting/Meeting";
import Chat from "./pages/Horenso/Chat/Chat";
import ProjectChecking from "./pages/Kanban/ProjectChecking/ProjectChecking";
import ChartProjectChecking from "pages/Kanban/ChartProjectChecking/ChartProjectChecking";

function App() {
  return (
    <Router>
      <div className="App">
        <SideBar />
        <AnimatedRouter />
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
        <Route path="/meeting">
          <Meeting />
        </Route>
        <Route path="/conversation">
          <Chat />
        </Route>
        <Route path="/kanban">
          <ChartProjectChecking />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
