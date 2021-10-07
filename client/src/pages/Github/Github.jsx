import React from "react";
import "./Github.scss";
import Sidebar from "./components/Sidebar/Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Content from "./components/Content/Content";
import DownloadFileGit from "./components/Download/Download";
import Setting from "./components/Setting/Setting";
const Github = () => {
  return (
    <Router>
      <div className="ctn github">
        <Sidebar />
        <Switch>
          <Route path="/github/content" component={Content} />
          <Route path="/github/download" component={DownloadFileGit} />
          <Route path="/github/setting" component={Setting} />
        </Switch>
      </div>
    </Router>
  );
};

export default Github;
