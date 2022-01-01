import React from "react";
import { Avatar, Button, Col, Row, Card, Progress } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Project = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.userSetting);
  return (
    <Row gutter={[48, 16]} wrap={false} align="middle">
      {profile.projects &&
        profile.projects.map((project) => {
          const percent = 33;
          return (
            <Col key={project.idProject} span={48}>
              <Card
                onClick={() => {
                  history.push(`/${project.idProject}`);
                  localStorage.setItem("projectowner", project.idProject);
                }}
                style={{
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  borderRadius: 10,
                  minWidth: 270,
                  cursor: "pointer",
                }}
              >
                <div>
                  <Progress
                    percent={percent}
                    showInfo={false}
                    size="small"
                    strokeColor={
                      percent <= 30
                        ? "red"
                        : percent <= 50
                        ? "orange"
                        : percent <= 70
                        ? "yellow"
                        : percent <= 90
                        ? "dodgerblue"
                        : "lawngreen"
                    }
                    style={{ width: 50 }}
                  />
                </div>
                <Avatar
                  src={project.avatar}
                  size="large"
                  style={{ position: "relative", left: "41%" }}
                />
                <h2 style={{ textAlign: "center" }}>{project.title}</h2>
                <h2 style={{ textAlign: "center", marginBottom: 0 }}>0/0</h2>
                <p
                  style={{
                    textAlign: "center",
                    fontSize: 11,
                    fontWeight: "bold",
                    color: "lightgray",
                  }}
                >
                  task complete
                </p>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Avatar.Group
                    maxCount={5}
                    size="small"
                    maxStyle={{ color: "gray", backgroundColor: "lightgray" }}
                    style={{}}
                  >
                    {project.members &&
                      project.members.map((member) => {
                        return <Avatar src={member.avatar} />;
                      })}
                  </Avatar.Group>
                </div>
              </Card>
            </Col>
          );
        })}
    </Row>
  );
};

export default Project;
