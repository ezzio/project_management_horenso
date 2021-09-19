import SideBar from "components/SideBar/SideBar";
import Conversation from "pages/Horenso/Conversation/Conversation";
import Report from "pages/Horenso/Report/Report";
import Board from "pages/Kanban/Board/Board";
import KanbanDashBoard from "pages/Kanban/KanbanDashBoard/components/KanbanDashBoard";
import UserSetting from "pages/UserSettings/UserSetting";
import React from "react";

import SideBar from "components/SideBar/SideBar";
import ModalNewTask from "features/ModalNewTask/ModalNewTask";
import Conversation from "pages/Horenso/Conversation/Conversation";
import Report from "pages/Horenso/Report/Report";
import Board from "features/Board/Board";
import KanbanDashBoard from "pages/Kanban/KanbanDashBoard/components/KanbanDashBoard";
import UserSetting from "pages/UserSettings/UserSetting";
import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import "./App.scss";

import Source from "./pages/Storage/Source/Source";
import Github from "./pages/Github/Github";

import "./App.scss";
import Meeting from "./pages/Horenso/Meeting/Meeting";
import Source from "./pages/Storage/Source/Source";
import DetailTask from "features/DetailTask/DetailTask";
import Kanban from "pages/Kanban/Kanban";
import NotFound from "components/Common/NotFound/NotFound";
import PrivateRoute from "components/Common/PrivateRoute/PrivateRoute";
import LoginScreen from "features/ForgotPassword/ForgotPasswordScreen";

function App() {
  return (
    <Router>
      <div className="App">
        <SideBar />
        <AnimatedRouter />

        {/* <Board /> */}

        <Switch>
          <Route path="/login">
            <LoginScreen />
          </Route>
          <PrivateRoute path="/welcome">
            <SideBar />
            <AnimatedRouter />
          </PrivateRoute>
          <Route path="*" component={NotFound} />
        </Switch>
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
        <Route path="/github" children={<Github />} />

        <Route path="welcome/meeting" children={<Meeting />} />
        <Route path="welcome/conversation" children={<Conversation />} />
        <Route path="welcome/kanban" children={<KanbanDashBoard />} />
        <Route path="welcome/report" children={<Report />} />
        <Route path="welcome/source" children={<Source />} />
      </Switch>
    </div>
  );
};

export default App;
