import {
  Button,
  Card,
  Form,
  Input,
  message,
  Popconfirm,
  Space,
  Spin,
  Typography,
} from "antd";
import {
  deleteProject,
  deleteProjectAsync,
  getInfoProjectAsync,
  renameProject,
  renameProjectAsync,
} from "features/Setting/settingSlice";
import ModalTransferOwnership from "features/Setting/TransferOwnership/ModalTransferOwnership";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, Redirect } from "react-router-dom";
import "./Setting.scss";

const { Text, Title } = Typography;

const Setting = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const loading = useSelector((state) => state.setting.loading);
  const currentProjectName = useSelector((state) => state.setting.projectName);
  const projectOwner = useSelector((state) => state.userSetting.name);
  const [disabledChangeName, setDisabledChangeName] = useState(true);
  const [allowRedirect, setAllowRedirect] = useState(false);

  const idProject = params.idProject;
  useEffect(() => {
    dispatch(getInfoProjectAsync(idProject));
  }, []);

  // rename project
  const projectNameConfig = {
    rules: [
      {
        required: true,
        message: "Please enter name of project!",
      },
    ],
  };

  const onChangeProjectName = (value) => {
    if (value !== currentProjectName) {
      setDisabledChangeName(false);
    } else setDisabledChangeName(true);
  };

  const onFinishChangeName = (value) => {
    const actionRenameProject = {
      idProject: idProject,
      newProjectName: value.projectName,
    };
    setDisabledChangeName(true);
    dispatch(renameProject(actionRenameProject));
    dispatch(renameProjectAsync(actionRenameProject));

    setTimeout(() => {
      message.success(`Project is renamed to "${value.projectName}"`);
    }, 500);
  };
  // ---------------------------------------

  // delete project
  const handleDeleteProject = () => {
    dispatch(deleteProjectAsync(idProject));
    setTimeout(() => {
      setAllowRedirect(true);
      message.success(`Delete successfull`);
    }, 500);
  };
  // -----------------------------

  return (
    <>
      {allowRedirect && <Redirect to={`/`} />}
      <Spin
        tip="Loading..."
        size="large"
        spinning={loading}
        style={{ width: "100%", height: "100%" }}
      >
        <div className="ctn setting-ctn">
          <Title>Setting</Title>
          <div className="setting-ctn__content">
            <div className="setting-ctn__content__basic-info">
              <Card
                title="Project name"
                bordered={false}
                style={{ width: "100%" }}
              >
                <Form
                  name="project-name"
                  onFinish={onFinishChangeName}
                  autoComplete="off"
                  initialValues={{ projectName: currentProjectName }}
                >
                  <Form.Item name="projectName" {...projectNameConfig}>
                    <Input
                      size="large"
                      onChange={(e) => onChangeProjectName(e.target.value)}
                      placeholder={currentProjectName}
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
              <Space
                size="middle"
                direction="vertical"
                style={{ width: "100%" }}
              >
                <div>
                  <b>Transfer ownership</b>
                  <div className="setting-ctn__content__danger__content">
                    <Text>
                      Transfer this repository to another user or to an
                      organization where you have the ability to create
                      repositories
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
                      Once you delete a repository, there is no going back.
                      Please be certain.
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
      </Spin>
    </>
  );
};

export default Setting;
