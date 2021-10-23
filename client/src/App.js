import './App.scss';
import 'antd/dist/antd.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';
import SideBar from 'components/SideBar/SideBar';
import { useEffect, useState } from 'react';
import Meeting from 'pages/Horenso/Meeting/Meeting';
import Conversation from 'pages/Horenso/Conversation/Conversation';
import KanbanDashBoard from 'features/KanbanDashBoard/KanbanDashBoard';
import Report from 'pages/Horenso/Report/Report';
import { Source } from 'webpack-sources';
import Github from 'pages/Github/Github';
import Board from 'features/Board/Board';
import SignupScreen from 'features/Signup/SignupScreen';
import PrivateRoute from 'components/Common/PrivateRoute/PrivateRoute';
import NotFound from 'components/Common/NotFound/NotFound';
import LoginScreen from 'features/Login/LoginScreen';


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <LoginScreen />
          </Route>
          <Route path="sign-up">
            <SignupScreen />
          </Route>
          <PrivateRoute exact path="/:page">
            <SideBar />
            <AnimatedRouter />
          </PrivateRoute>

          <PrivateRoute path="/:page/:id" children={<Board />} />

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
        <Route path="/meeting" children={<Meeting />} />
        <Route path="/conversation" children={<Conversation />} />
        <Route exact path="/kanban" children={<KanbanDashBoard />} />
        <Route path="/report" children={<Report />} />
        <Route path="/source" children={<Source />} />
        <Route path="/github" children={<Github />} />
      </Switch>
    </div>
  );
};

export default App;
