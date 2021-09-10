import React from "react";
import "./Github.scss";
import Sidebar from "./components/Sidebar/Sidebar";
import Content from "./components/Content/Content";

const Github = () => {
  return (
    <div className="ctn github">
      <Sidebar />
      <Content />
    </div>
  );
};

export default Github;
