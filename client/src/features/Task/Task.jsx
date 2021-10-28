import React, { useState } from "react";
import PropTypes from "prop-types";
import { RiChat1Line } from "react-icons/ri";
import { ImAttachment } from "react-icons/im";
import "./Task.scss";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { deleteTask } from "features/Board/boardSlice";
import { Menu, Dropdown, Badge } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { Popconfirm, message } from "antd";
import moment from "moment";
import ModalEditTask from "./EditTaskForm/ModalEditTask";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const Task = (props) => {
  const { task, index, columnId } = props;
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = React.useState(false);
  const location = useLocation();
  // const currentTime = moment();
  // const projectTime = moment(task.endTime);
  // const endTime = currentTime.from(projectTime);

  // Delete task
  const handleDeleteTask = (task) => {
    const deleteTaskId = task.id;
    const action = deleteTask({ deleteTaskId, columnId });
    dispatch(action);
    message.success("Success! Task has been deleted.");
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

  const menu = (
    <Menu>
      <Menu.Item key="0" primary ghost>
        <Link to={`${location.pathname}/${task.id}`}>Open</Link>
      </Menu.Item>
      <Menu.Item key="1" primary ghost>
        <a onClick={openModal}>Edit task</a>
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
          <a href="#">Delete task</a>
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      {task.isOverdue ? (
        <Badge.Ribbon text="Overdue" color="red">
          <Dropdown overlay={menu} trigger={["contextMenu"]}>
            <div className="kanban-task">
              <div className="kanban-task__title">
                <h4>{task.title}</h4>

                <Dropdown overlay={menu} trigger={["click"]}>
                  <a
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    <DownOutlined />
                  </a>
                </Dropdown>
              </div>

              <div className="kanban-task__progress">
                <div
                  className="kanban-task__progress__bar"
                  style={{ width: `${task.progress}%` }}
                >
                  {task.progress > 10 && <p>{task.progress}%</p>}
                </div>
                {task.progress < 10 && <p>{task.progress}%</p>}
              </div>
              <div className="kanban-task__info">
                <div
                  className={
                    task.level === "high"
                      ? "high"
                      : task.level === "low"
                      ? "low"
                      : "medium"
                  }
                >
                  {task.level}
                </div>
                <div className="kanban-task__info__time">Due in 2 days</div>
              </div>
              <div className="kanban-task__members-attach">
                <div className="kanban-task__members-attach__members">
                  {task.taskers.map((tasker, index) =>
                    index < 4 ? (
                      <img
                        src={tasker.avatar}
                        alt="avatar"
                        height="30"
                        width="30"
                      />
                    ) : null
                  )}
                  {task.taskers.length > 4 && (
                    <div
                      style={{
                        backgroundColor: "#eee",
                        borderRadius: "50%",
                        width: "30px",
                        height: "30px",
                        transform: "translateX(-20px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <p>+{task.taskers.length - 4}</p>
                    </div>
                  )}
                </div>
                <div className="kanban-task__members-attach__attach">
                  <p>
                    <ImAttachment /> 2
                  </p>
                  <p>
                    <RiChat1Line /> 18
                  </p>
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
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  <DownOutlined />
                </a>
              </Dropdown>
            </div>
            <div className="kanban-task__progress">
              <div
                className="kanban-task__progress__bar"
                style={{ width: `${task.progress}%` }}
              >
                {task.progress > 10 && <p>{task.progress}%</p>}
              </div>
              {task.progress < 10 && <p>{task.progress}%</p>}
            </div>
            <div className="kanban-task__info">
              <div
                className={
                  task.level === "high"
                    ? "high"
                    : task.level === "low"
                    ? "low"
                    : "medium"
                }
              >
                {task.level}
              </div>
              <div className="kanban-task__info__time">Due in 2 days</div>
            </div>
            <div className="kanban-task__members-attach">
              <div className="kanban-task__members-attach__members">
                {task.taskers.map((tasker, index) =>
                  index < 4 ? (
                    <img
                      src={tasker.avatar}
                      alt="avatar"
                      height="30"
                      width="30"
                    />
                  ) : null
                )}
                {task.taskers.length > 4 && (
                  <div
                    style={{
                      backgroundColor: "#eee",
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                      transform: "translateX(-20px)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <p>+{task.taskers.length - 4}</p>
                  </div>
                )}
              </div>
              <div className="kanban-task__members-attach__attach">
                <p>
                  <ImAttachment /> 2
                </p>
                <p>
                  <RiChat1Line /> 18
                </p>
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

//   return (
//     <Draggable draggableId={task.id.toString()} index={index}>
//       {(provided) => (
//         <Dropdown overlay={menu} trigger={["contextMenu"]}>
//           <div
//             className="kanban-task "
//             {...provided.draggableProps}
//             {...provided.dragHandleProps}
//             ref={provided.innerRef}
//           >
//             <div className="kanban-task__title">
//               <h4>{task.title}</h4>
//             </div>
//             <div className="kanban-task__progress">
//               <div
//                 className="kanban-task__progress__bar"
//                 style={{ width: `${task.progress}%` }}
//               >
//                 {task.progress > 10 && <p>{task.progress}%</p>}
//               </div>
//               {task.progress < 10 && <p>{task.progress}%</p>}
//             </div>
//             <div className="kanban-task__info">
//               <div
//                 className={
//                   task.level === "high"
//                     ? "high"
//                     : task.level === "low"
//                     ? "low"
//                     : "medium"
//                 }
//               >
//                 {task.level}
//               </div>
//               <div className="kanban-task__info__time">Due in 2 days</div>
//             </div>
//             <div className="kanban-task__members-attach">
//               <div className="kanban-task__members-attach__members">
//                 {task.taskers.map((tasker, index) =>
//                   index < 4 ? (
//                     <img
//                       src={tasker.avatar}
//                       alt="avatar"
//                       height="30"
//                       width="30"
//                     />
//                   ) : null
//                 )}
//                 {task.taskers.length > 4 && (
//                   <div
//                     style={{
//                       backgroundColor: "#eee",
//                       borderRadius: "50%",
//                       width: "30px",
//                       height: "30px",
//                       transform: "translateX(-20px)",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <p>+{task.taskers.length - 4}</p>
//                   </div>
//                 )}
//               </div>
//               <div className="kanban-task__members-attach__attach">
//                 <p>
//                   <ImAttachment /> 2
//                 </p>
//                 <p>
//                   <RiChat1Line /> 18
//                 </p>
//               </div>
//             </div>

//             <div>
//               <ModalEditTask
//                 modalOpen={modalOpen}
//                 closeModal={closeModal}
//                 task={task}
//                 columnId={columnId}
//               />
//             </div>
//           </div>
//         </Dropdown>
//       )}
//     </Draggable>
//   );
// };

// Task.propTypes = {
//   index: PropTypes.number.isRequired,
//   task: PropTypes.object.isRequired,
//   columnId: PropTypes.number.isRequired,
// };

// export default Task;
