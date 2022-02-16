import { useEffect, useState } from 'react';
// import components
import NotFound from 'components/Common/NotFound/NotFound';
import PrivateRoute from 'components/Common/PrivateRoute/PrivateRoute';
import SideBar from 'components/SideBar/SideBar';
import Board from 'features/Board/Board';
import DetailTask from 'features/DetailTask/DetailTask';
import KanbanDashBoard from 'features/KanbanDashBoard/KanbanDashBoard';
import LoginScreen from 'features/Login/LoginScreen';
import Dashboard from 'pages/Dashboard/Dashboard';
import Conversation from 'pages/Horenso/Conversation/Conversation';
import Meeting from 'pages/Horenso/Meeting/Meeting';
import Setting from 'pages/Setting/Setting';
import Storage from 'pages/Storage/Storage';
import Teammate from 'pages/Teammate/Teammate';
import UserSetting from 'pages/UserSettings/UserSetting';

// import library
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';
// import css
import 'antd/dist/antd.css';
import './App.scss';
import MeetingRoom from 'features/MRoom/MeetingRoom';
import SignUp from 'features/Register/Register';
import ModalCheckProfileMember from 'features/ModalCheckProfileMember/ModalCheckProfileMember';

function App() {
  return (
    // <Router>
    //   <div className="App">
    //     <Switch>
    //       <Route path="/login">
    //         <LoginScreen />
    //       </Route>

    //       <Route path="/sign-up">
    //         <SignUp />
    //       </Route>

    //       <PrivateRoute exact path="/">
    //         <UserSetting />
    //       </PrivateRoute>

    //       <PrivateRoute path="/:idProject">
    //         <SideBar />
    //         <AnimatedRouter />
    //       </PrivateRoute>
    //       <Route component={NotFound} />
    //     </Switch>
    //   </div>
    // </Router>
    <ModalCheckProfileMember visible={true} />
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
        <Route path="/:idProject/dashboard" children={<Dashboard />} />
        <Route exact path="/:idProject/meeting" children={<Meeting />} />
        <Route path="/:idProject/conversation" children={<Conversation />} />
        <Route exact path="/:idProject/jobs" children={<KanbanDashBoard />} />
        <Route path="/:idProject/storage/" children={<Storage />} />
        <Route path="/:idProject/teammate" children={<Teammate />} />
        <Route path="/:idProject/setting" children={<Setting />} />
        <PrivateRoute
          exact
          path="/:idProject/jobs/:idBoard"
          children={<Board />}
        />
        <PrivateRoute
          exact
          path="/:idProject/jobs/:idBoard/:idTask"
          children={<DetailTask />}
        />
        <PrivateRoute
          exact
          path="/:idProject/meeting/:idRoom"
          children={<MeetingRoom />}
        />
      </Switch>
    </div>
  );
};

export default App;
