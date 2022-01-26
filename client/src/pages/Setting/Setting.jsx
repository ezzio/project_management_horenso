import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  message,
  Card,
  Typography,
  Space,
  Popconfirm,
} from "antd";
import "./Setting.scss";
import { useDispatch } from "react-redux";
import { deleteProject, renameProject } from "features/Setting/settingSlice";
import { useParams } from "react-router-dom";
import ModalTransferOwnership from "features/Setting/TransferOwnership/ModalTransferOwnership";

const { Text, Title } = Typography;

const Setting = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const idProject = params.idProject;

  const projectOwner = "dangkhoa";
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
    "kanban horenso cai gi do khong biet"
  );
  const [disabledChangeName, setDisabledChangeName] = useState(true);

  const onChangeProjectName = (value) => {
    if (value !== projectName) setDisabledChangeName(false);
    else setDisabledChangeName(true);
  };

  const onFinishChangeName = (value) => {
    const actionRenameProject = {
      idProject: idProject,
      newProjectName: value.projectName,
    };
    setProjectName(value.projectName);
    setDisabledChangeName(true);
    dispatch(renameProject(actionRenameProject));
    message.success(`Project is renamed to "${value.projectName}"`);
  };

  const handleDeleteProject = () => {
    // console.log("idProject: ", idProject);
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
                <ModalTransferOwnership
                  projectOwner={projectOwner}
                  idProject={idProject}
                />
              </div>
            </div>
            <div>
              <b>Delete this project</b>
              <div className="setting-ctn__content__danger__content">
                <Text>
                  Once you delete a repository, there is no going back. Please
                  be certain.
                </Text>
                <Popconfirm
                  title="Are you sure to delete this project?"
                  onConfirm={handleDeleteProject}
                  onCancel={(e) => {}}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    type="primary"
                    size="large"
                    danger
                    style={{ width: "100px" }}
                  >
                    Delete
                  </Button>
                </Popconfirm>
              </div>
            </div>
          </Space>
        </Card>
      </div>
    </div>
  );
};

export default Setting;
