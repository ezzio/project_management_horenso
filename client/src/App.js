import './App.scss';
import 'antd/dist/antd.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Meeting from 'pages/Horenso/Meeting/Meeting';
import Conversation from 'pages/Horenso/Conversation/Conversation';
import KanbanDashBoard from 'features/KanbanDashBoard/KanbanDashBoard';
import Report from 'pages/Horenso/Report/Report';
import Github from 'pages/Github/Github';
import Board from 'features/Board/Board';
import SignupScreen from 'features/Signup/SignupScreen';
import PrivateRoute from 'components/Common/PrivateRoute/PrivateRoute';
import NotFound from 'components/Common/NotFound/NotFound';
import LoginScreen from 'features/Login/LoginScreen';
import DetailTask from 'features/DetailTask/DetailTask';
import UserSetting from 'pages/UserSettings/UserSetting';
import Source from 'pages/Storage/Source/Source';
import Dashboard from 'pages/Dashboard/Dashboard';
import SideBar from 'components/SideBar/SideBar';
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
  const [transitionStage, setTransitionStage] = useState('in');
  const [displayLocation, setDisplayLocation] = useState(location);
  useEffect(() => {
    if (location.pathname !== displayLocation.pathname)
      setTransitionStage('out');
  }, [displayLocation.pathname, location]);
  return (
    <div
      className={transitionStage === 'in' ? 'slide-bottom' : 'slide-top'}
      onAnimationEnd={() => {
        if (transitionStage === 'out') {
          setTransitionStage('in');
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
        <Route path="/setting" children={<Setting />} />
      </Switch>
    </div>
  );
};

export default App;
