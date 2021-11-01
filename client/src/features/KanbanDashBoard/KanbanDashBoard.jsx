import { Modal, Form, Input, Select, DatePicker, Button, message } from "antd";
import JobTag from "features/JobTag - Kanban/JobTag";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./KanbanDashBoard.scss";
import { addKanban, deleteKanban } from "./KanbanDashBoardSlice";

const { RangePicker } = DatePicker;

const KanbanDashBoard = () => {
  const [showCompleteTask, setShowCompleteTask] = useState(true);
  const jobs = useSelector((state) => state.kanban);
  const dispatch = useDispatch();

  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  //Delete Kanban here
  const handleDeleteJob = (job) => {
    const deleteKanbanID = job.id_job;
    const action = deleteKanban(deleteKanbanID);
    dispatch(action);
    message.success("Success! This Job has been removed");
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  // -----------------------------
  //          Modal Form
  const onFinish = (values) => {
    const newKanban = {
      id_job: jobs.length + 1,
      title: values.title,
      proccess: "0%",
      priority: values.priority,
      is_completed: false,
      start_time: values.range_time[0].format("YYYY-MM-DD"),
      end_time: values.range_time[1].format("YYYY-MM-DD"),
      members: values.members,
    };
    console.log(newKanban);
    dispatch(addKanban(newKanban));
    setVisible(false);
    message.success("Success! This Job has been added");
  };
  const [form] = Form.useForm();

  // -----------------------------

  return (
    <>
      <Modal
        title="Add new kanban"
        visible={visible}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onFinish(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        initialValues={{ priority: "Low" }}
      >
        <Form
          layout="vertical"
          form={form}
          name="add_new_kanban"
          onFinish={onFinish}
          autoComplete="off"
          initialValues={{ priority: "Low" }}
        >
          <Form.Item
            label="Title: "
            name="title"
            rules={[
              { required: true, message: "Please input title of kanban" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Priority: " name="priority">
            <Select>
              <Select.Option value="High">High</Select.Option>
              <Select.Option value="Medium">Medium</Select.Option>
              <Select.Option value="Low">Low</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="range_time"
            label="Range Time: "
            rules={[
              { type: "array", required: true, message: "Please select time!" },
            ]}
          >
            <RangePicker
              allowClear
              showTime
              format="YYYY-MM-DD"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            name="members"
            label="Members:"
            rules={[
              {
                required: true,
                message: "Please select members on duty",
                type: "array",
              },
            ]}
          >
            <Select mode="multiple" placeholder="Search member...">
              <Select.Option value="red">Red</Select.Option>
              <Select.Option value="green">Green</Select.Option>
              <Select.Option value="blue">Blue</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <div className="ctn-kanbandashboard">
        <div className="ctn-kanbandashboard__working">
          <div className="ctn-kanbandashboard__working__title">
            <h1 className="title">Kanbans On Working</h1>
            <button className="add-task-button" onClick={showModal}>
              Add new
            </button>
          </div>
          <div className="ctn-kanbandashboard__working__content">
            {jobs.map((job) => {
              if (!job.is_completed)
                return (
                  <JobTag
                    onDeleteJob={handleDeleteJob}
                    job={job}
                    title={job.title}
                    priority={job.priority}
                    process={job.process}
                    members={job.members}
                    setVisible={setVisible}
                  />
                );
            })}
          </div>
        </div>
        <div className="ctn-kanbandashboard__complete">
          <div className="ctn-kanbandashboard__complete__title">
            <h1 className="title">Completed</h1>
            <button
              className="btn-show-hide"
              onClick={() => setShowCompleteTask(!showCompleteTask)}
            >
              {showCompleteTask ? "Hide" : "Show"}
            </button>
          </div>
          {showCompleteTask && <CompleteTask jobs={jobs} />}
        </div>
      </div>
    </>
  );
};

export default KanbanDashBoard;

const CompleteTask = ({ jobs }) => {
  return (
    <div className="ctn-kanbandashboard__complete__content">
      {jobs.map((job) => {
        if (job.is_completed)
          return (
            <JobTag
              job={job}
              title={job.title}
              priority={job.priority}
              process={job.process}
              members={job.members}
            />
          );
      })}
    </div>
  );
};
