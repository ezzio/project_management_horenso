import Conversation from 'pages/Horenso/Conversation/Conversation';
import Report from 'pages/Horenso/Report/Report';
import KanbanDashBoard from 'pages/Kanban/KanbanDashBoard/KanbanDashBoard';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation
} from 'react-router-dom';
import './App.scss';
import SideBar from './components/SideBar/SideBar';
import Meeting from './pages/Horenso/Meeting/Meeting';


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
        <Route path="/kanban" children={<KanbanDashBoard />} />
        <Route path="/report" children={<Report />} />
      </Switch>
    </div>
  );
};

export default App;
