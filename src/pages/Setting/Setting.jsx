import React, { useState } from "react";
import { Button, Form, Input, message, Card, Typography, Space } from "antd";
import "./Setting.scss";
import { useDispatch } from "react-redux";
import { deleteProject } from "features/Setting/settingSlice";
import { useParams } from "react-router-dom";

const { Text, Title } = Typography;

const Setting = () => {
  const dispatch = useDispatch();
  const params = useParams();

  // Change name
  const projectNameConfig = {
    rules: [
      {
        required: true,
        message: "Please enter name of project!",
      },
    ],
  };

  const [projectName, setProjectName] = useState(
    "Du an con cac gi do toi khong biet nua"
  );
  const [disabledChangeName, setDisabledChangeName] = useState(true);

  const onChangeProjectName = (value) => {
    if (value !== projectName) setDisabledChangeName(false);
    else setDisabledChangeName(true);
  };

  const onFinishChangeName = (value) => {
    message.success("Renaming!");
    console.log(value);
  };

  const handleDeleteProject = () => {
    const idProject = params.idProject;
    console.log("idProject: ", idProject);
    dispatch(deleteProject(idProject));
  };

  return (
    <div className="ctn setting-ctn">
      <Title>Setting</Title>
      <div className="setting-ctn__content">
        <div className="setting-ctn__content__basic-info">
          <Card title="Project name" bordered={false} style={{ width: "100%" }}>
            <Form
              name="project-name"
              onFinish={onFinishChangeName}
              autoComplete="off"
            >
              <Form.Item name="projectName" {...projectNameConfig}>
                <Input
                  size="large"
                  onChange={(e) => onChangeProjectName(e.target.value)}
                  defaultValue={projectName}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  disabled={disabledChangeName}
                >
                  Rename
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>

        <Card
          style={{ width: "100%" }}
          title="Danger settings"
          bordered={false}
          className="setting-ctn__content__danger"
        >
          <Space size="middle" direction="vertical" style={{ width: "100%" }}>
            <div>
              <b>Transfer ownership</b>
              <div className="setting-ctn__content__danger__content">
                <Text>
                  Transfer this repository to another user or to an organization
                  where you have the ability to create repositories
                </Text>
                <Button
                  type="primary"
                  size="large"
                  danger
                  style={{ width: "100px" }}
                >
                  Transfer
                </Button>
              </div>
            </div>
            <div>
              <b>Delete this project</b>
              <div className="setting-ctn__content__danger__content">
                <Text>
                  Once you delete a repository, there is no going back. Please
                  be certain.
                </Text>
                <Button
                  type="primary"
                  size="large"
                  danger
                  style={{ width: "100px" }}
                  onClick={handleDeleteProject}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Space>
        </Card>
      </div>
    </div>
  );
};

export default Setting;
