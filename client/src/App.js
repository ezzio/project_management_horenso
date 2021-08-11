import Conversation from 'pages/Horenso/Conversation/Conversation';
import Report from 'pages/Horenso/Report/Report';
<<<<<<< HEAD
import KanbanDashBoard from 'pages/Kanban/KanbanDashBoard/KanbanDashBoard';
=======
import Board from 'pages/Kanban/Board/Board';
>>>>>>> 2b436abfa811c13b154c150bbde73dc7122dff53
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';
import './App.scss';
import SideBar from './components/SideBar/SideBar';
import Meeting from './pages/Horenso/Meeting/Meeting';
<<<<<<< HEAD

=======
>>>>>>> 2b436abfa811c13b154c150bbde73dc7122dff53

function App() {
  return (
    <Router>
      <div className="App">
        {/* <SideBar /> */}
        {/* <AnimatedRouter /> */}
        <Board />
      </div>
    </Router>
  );
}

const AnimatedRouter = () => {
  const location = useLocation();
  const [transitionStage, setTransitionStage] = React.useState('in');
  const [displayLocation, setDisplayLocation] = React.useState(location);
  React.useEffect(() => {
    if (location.pathname !== displayLocation.pathname)
      setTransitionStage('out');
  }, [location]);
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
<<<<<<< HEAD
        <Route path="/kanban" children={<KanbanDashBoard />} />
=======
        {/* <Route path="/kanban" children={<ProjectChecking />} /> */}
>>>>>>> 2b436abfa811c13b154c150bbde73dc7122dff53
        <Route path="/report" children={<Report />} />
      </Switch>
    </div>
  );
};

export default App;
