import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Content from "./components/Content/Content";
import "./Project.scss";
const Project = () => {
  return (
    <div className="ctn project">
      <Sidebar />
      <Content />
    </div>
  );
};

export default Project;
