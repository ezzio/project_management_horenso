import React from "react";
import PropTypes from "prop-types";
import ListMember from "./components/ListMember";
import { BarsOutlined, HolderOutlined } from "@ant-design/icons";
import "./JobTag.scss";
import { Button, message, Popconfirm, Popover, Space } from "antd";
import { useState } from "react";
import ModalEditKanban from "features/KanbanDashBoard/components/ModalEditKanban";
import { updateKanban } from "features/KanbanDashBoard/KanbanDashBoardSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const JobTag = (props) => {
  const { title, priority, process, members, job, onDeleteJob } = props;

  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (e) => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEditJob = (values) => {
    const action = {
      id_job: job.id_job,
      title: values.title,
      priority: values.priority,
      process: job.process,
      is_completed: values.is_completed,
      start_time: values.range_time[0].format("YYYY-MM-DD"),
      end_time: values.range_time[1].format("YYYY-MM-DD"),
      members: values.members,
    };
    dispatch(updateKanban(action));
    message.success("Success! This Job has been edited");
    setIsModalVisible(false);
  };

  return (
    <>
      <ModalEditKanban
        handleCancel={handleCancel}
        state={isModalVisible}
        job={job}
        handleEditClick={handleEditJob}
      />
      <div className="ctn-job-task">
        {/* <Link to={`/kanban/${id}`}> */}
        <div className="ctn-job-task__title">
          <p>{title}</p>
        </div>
        <div className="ctn-job-task__process">
          <div
            className={
              priority === "High"
                ? "high"
                : priority === "Medium"
                ? "medium"
                : "low"
            }
            style={{ width: "fit-content" }}
          >
            {priority}
          </div>
        </div>

        <div className="ctn-job-task__process">
          <div className="background-process">
            <div className="process-work" style={{ width: process }}></div>
          </div>
        </div>
        {/* </Link> */}
        <div className="ctn-job-task__members">
          <ListMember members={members} />
          <div className="ctn-job-task__members__properties">
            <Popover
              placement="topLeft"
              content={
                <Space>
                  <Button onClick={showModal} type="primary">
                    Edit
                  </Button>
                  <Popconfirm
                    title="Are you sure to delete this job?"
                    onConfirm={(event) => onDeleteJob(job, event)}
                    onCancel={"cancel"}
                    okText="Yes"
                    cancelText="No"
                    placement="topRight"
                  >
                    <Button danger>Delete</Button>
                  </Popconfirm>
                  <Link to={`/kanban/${job.id_job}`}>
                    <Button shape="circle">
                      <HolderOutlined />
                    </Button>
                  </Link>
                </Space>
              }
              trigger={!job.is_completed ? "click" : ""}
            >
              <Button
                style={{
                  border: "none",
                  backgroundColor: "#fff",
                  width: "fit-content",
                }}
              >
                <BarsOutlined />
              </Button>
            </Popover>
          </div>
        </div>
      </div>
    </>
  );
};

JobTag.propTypes = {
  title: PropTypes.string,
  level: PropTypes.string,
  process: PropTypes.string,
  members: PropTypes.array,
  onDeleteJob: PropTypes.func,
};

export default JobTag;
