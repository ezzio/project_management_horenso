import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { RiChat1Line } from "react-icons/ri";
import { ImAttachment } from "react-icons/im";
import "./Task.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  automaticallyUpdateColumn,
  deleteTaskAsync,
} from "features/Board/boardSlice";
import {
  Menu,
  Dropdown,
  Badge,
  Avatar,
  Tooltip,
  Progress,
  Typography,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { Popconfirm } from "antd";
import moment from "moment";
import ModalEditTask from "./EditTaskForm/ModalEditTask";
import { useLocation } from "react-router";
import { Link, useParams } from "react-router-dom";
import {
  UserOutlined,
  ApartmentOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { viewMemberInfo } from "features/ModalCheckProfileMember/CheckProfileMemberSlice";
import ModalCheckProfileMember from "features/ModalCheckProfileMember/ModalCheckProfileMember";

const { Text } = Typography;

const Task = (props) => {
  const { task, index, columnId } = props;
  const { idBoard } = useParams();
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  const location = useLocation();
  const loading = useSelector((state) => state.board.loading);
  // const currentTime = moment();
  // const projectTime = moment(task.endTime);
  // const endTime = currentTime.from(projectTime);

  const viewProfile = (item) => {
    setUserName(item);
    setVisible(true);
    dispatch(viewMemberInfo(item));
  };
  // Delete task
  const handleDeleteTask = (task) => {
    dispatch(deleteTaskAsync({ id: task.id, columnId, idBoard }));
  };

  // Edit task
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // Dropdown menu
  function cancel(e) {
    console.log(e);
    // message.error("Click on No");
  }

  useEffect(() => {
    if (!loading) {
      dispatch(automaticallyUpdateColumn({ columnId, task, index }));
    }
  }, [loading]);

  const role = useSelector((state) => state.sidebar.role);

  const menu = (
    <Menu>
      <Menu.Item key="0" primary ghost>
        <Link to={`${location.pathname}/${task.id}`}>Open</Link>
      </Menu.Item>
      {(role === "Leader" || role === "Project Manager") && (
        <>
          <Menu.Item key="1" primary ghost>
            <Text onClick={openModal}>Edit task</Text>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="2" danger ghost>
            <Popconfirm
              title="Are you sure to delete this task?"
              onConfirm={() => handleDeleteTask(task)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              Delete task
            </Popconfirm>
          </Menu.Item>
        </>
      )}
    </Menu>
  );

  return (
    <>
      {visible && (
        <ModalCheckProfileMember visible={true} setVisible={setVisible} />
      )}
      {moment().isAfter(task.end_time) ? (
        <Badge.Ribbon text="Overdue" color="red">
          <Dropdown overlay={menu} trigger={["contextMenu"]}>
            <div className="kanban-task">
              <div className="kanban-task__title">
                <h4>{task.title}</h4>
              </div>
              <Progress percent={task.progress} status="exception" />
              <div className="kanban-task__info">
                <div
                  style={{ padding: "0.35rem 1.5rem" }}
                  className={
                    task.priority.toLowerCase() === "high"
                      ? "high"
                      : task.priority === "low"
                      ? "low"
                      : "medium"
                  }
                >
                  {task.priority}
                </div>
                <div className="kanban-task__info__time">
                  Overdue{" "}
                  {moment(moment(task.end_time).format("YYYY-MM-DD")).toNow(
                    true
                  )}
                </div>
              </div>
              <div className="kanban-task__members-attach">
                <Avatar.Group
                  maxCount={4}
                  maxPopoverTrigger="click"
                  maxStyle={{
                    color: "#f56a00",
                    backgroundColor: "#fde3cf",
                    cursor: "pointer",
                  }}
                >
                  {task.taskers.map((tasker) => (
                    <Tooltip title={tasker.user_name} placement="top">
                      <Avatar
                        src={tasker.avatar}
                        style={{ backgroundColor: "#87d068" }}
                        icon={<UserOutlined />}
                      />
                    </Tooltip>
                  ))}
                </Avatar.Group>
                <div className="kanban-task__members-attach__attach">
                  <Tooltip title="Number of sub-tasks">
                    <p>
                      <ApartmentOutlined /> {task.totalDetilTask}
                    </p>
                  </Tooltip>
                  <Tooltip title="Number of messages">
                    <p>
                      <MessageOutlined /> {task.totalConversation}
                    </p>
                  </Tooltip>
                </div>
              </div>
              <div>
                <ModalEditTask
                  modalOpen={modalOpen}
                  closeModal={closeModal}
                  task={task}
                  columnId={columnId}
                />
              </div>
            </div>
          </Dropdown>
        </Badge.Ribbon>
      ) : (
        <Dropdown overlay={menu} trigger={["contextMenu"]}>
          <div className="kanban-task">
            <div className="kanban-task__title">
              <h4>{task.title}</h4>
              <Dropdown overlay={menu} trigger={["click"]}>
                <DownOutlined />
              </Dropdown>
            </div>
            <Progress
              percent={task.progress}
              status={!task.is_complete ? "active" : ""}
              strokeColor={
                task.progress === 100 && !task.is_complete ? "#FECD3D" : ""
              }
            />
            <div className="kanban-task__info">
              <div
                style={{ padding: "0.35rem 1.5rem" }}
                className={
                  task.priority.toLowerCase() === "high"
                    ? "high"
                    : task.priority.toLowerCase() === "low"
                    ? "low"
                    : "medium"
                }
              >
                {task.priority === "low" ? "Low" : task.priority}
              </div>
              <div className="kanban-task__info__time">
                {moment().isBetween(
                  moment(task.start_time),
                  moment(task.end_time)
                )
                  ? "Due in " +
                    moment(moment(task.end_time).format("YYYY-MM-DD")).toNow(
                      true
                    )
                  : "Start after " +
                    moment(moment(task.start_time).format("YYYY-MM-DD")).toNow(
                      true
                    )}
              </div>
            </div>
            <div className="kanban-task__members-attach">
              <Avatar.Group
                maxCount={4}
                maxPopoverTrigger="click"
                maxStyle={{
                  color: "#f56a00",
                  backgroundColor: "#fde3cf",
                  cursor: "pointer",
                }}
              >
                {task.taskers.map((tasker) => (
                  <Tooltip title={tasker.user_name} placement="top">
                    <Avatar
                      src={tasker.avatar}
                      style={{ backgroundColor: "#87d068", cursor: "pointer" }}
                      icon={<UserOutlined />}
                      onClick={() => viewProfile(tasker.user_name)}
                    />
                  </Tooltip>
                ))}
              </Avatar.Group>
              <div className="kanban-task__members-attach__attach">
                <Tooltip title="Number of sub-tasks">
                  <p>
                    <ApartmentOutlined /> {task.totalDetilTask}
                  </p>
                </Tooltip>
                <Tooltip title="Number of messages">
                  <p>
                    <MessageOutlined /> {task.totalConversation}
                  </p>
                </Tooltip>
              </div>
            </div>
            <div>
              <ModalEditTask
                modalOpen={modalOpen}
                closeModal={closeModal}
                task={task}
                columnId={columnId}
              />
            </div>
          </div>
        </Dropdown>
      )}
    </>
  );
};

Task.propTypes = {
  task: PropTypes.object.isRequired,
  columnId: PropTypes.number.isRequired,
};

export default Task;
