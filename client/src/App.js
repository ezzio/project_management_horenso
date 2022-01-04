import "antd/dist/antd.css";
import NotFound from "components/Common/NotFound/NotFound";
import PrivateRoute from "components/Common/PrivateRoute/PrivateRoute";
import SideBar from "components/SideBar/SideBar";
import Board from "features/Board/Board";
import DetailTask from "features/DetailTask/DetailTask";
import KanbanDashBoard from "features/KanbanDashBoard/KanbanDashBoard";
import LoginScreen from "features/Login/LoginScreen";
import SignupScreen from "features/Signup/SignupScreen";
import Dashboard from "pages/Dashboard/Dashboard";
import Github from "pages/Github/Github";
import Conversation from "pages/Horenso/Conversation/Conversation";
import Meeting from "pages/Horenso/Meeting/Meeting";
import Report from "pages/Horenso/Report/Report";
import Source from "pages/Storage/Source/Source";
import Teammate from "pages/Teammate/Teammate";
import UserSetting from "pages/UserSettings/UserSetting";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import "./App.scss";
} from 'react-router-dom';
import Setting from 'pages/Setting/Setting';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <LoginScreen />
          </Route>
          <Route path="/sign-up">
            <SignupScreen />
          </Route>
          <PrivateRoute exact path="/">
            <UserSetting />
          </PrivateRoute>
          <PrivateRoute exact path="/:idProject">
            <SideBar />
            <AnimatedRouter />
          </PrivateRoute>

          <PrivateRoute exact path="/:idProject/:id" children={<Board />} />
          <PrivateRoute
            exact
            path="/:idProject/:idColumn/:idTask"
            children={<DetailTask />}
          />

          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

// Effect change page
const AnimatedRouter = () => {
  const location = useLocation();
  const [transitionStage, setTransitionStage] = useState("in");
  const [displayLocation, setDisplayLocation] = useState(location);
  useEffect(() => {
    if (location.pathname !== displayLocation.pathname)
      setTransitionStage("out");
  }, [displayLocation.pathname, location]);
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
        <Route path="/dashboard" children={<Dashboard />} />
        <Route path="/meeting" children={<Meeting />} />
        <Route path="/conversation" children={<Conversation />} />
        <Route exact path="/jobs" children={<KanbanDashBoard />} />
        <Route path="/report" children={<Report />} />
        <Route path="/storage" children={<Source />} />
        <Route path="/github" children={<Github />} />
        <Route path="/teammate" children={<Teammate />} />
        <Route path="/setting" children={<Setting />} />
      </Switch>
    </div>
  );
};

export default App;
