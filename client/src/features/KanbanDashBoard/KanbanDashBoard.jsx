import {
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  message,
  Typography,
  Empty,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import JobTag from "features/JobTag - Kanban/JobTag";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./KanbanDashBoard.scss";
import {
  addKanban,
  deleteKanban,
  ListKanban,
  AddNewJobkanban,
  DeleteAJob,
} from "./KanbanDashBoardSlice";

const { RangePicker } = DatePicker;
const { Title } = Typography;

const KanbanDashBoard = () => {
  const [showCompleteTask, setShowCompleteTask] = useState(true);
  const jobs = useSelector((state) => state.kanban);
  const dispatch = useDispatch();

  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  // List Kanban
  useEffect(() => {
    dispatch(ListKanban());
  }, []);

  //Delete Kanban here
  const handleDeleteJob = (job) => {
    const deleteKanbanID = job.id_job;
    const action = deleteKanban(deleteKanbanID);
    dispatch(action);
    dispatch(DeleteAJob({ kanban_id: deleteKanbanID }));
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
      id_job: jobs.listJobs.length + 1,
      title: values.title,
      proccess: "0%",
      priority: values.priority,
      is_completed: false,
      start_time: values.range_time[0].format("YYYY-MM-DD"),
      end_time: values.range_time[1].format("YYYY-MM-DD"),
      members: values.members,
    };
    // console.log(newKanban);
    dispatch(addKanban(newKanban));
    dispatch(AddNewJobkanban(newKanban));
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
              { required: true, message: "Please input title of job !" },
              { max: 30, message: "The title must be maximum 30 characters !" },
              { min: 5, message: "The title must be minimum 5 characters !" },
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
              {jobs.membersInProject.map((eachMember) => (
                <Select.Option value={eachMember.name}>
                  {eachMember.name}
                </Select.Option>
              ))}
              {/* <Select.Option value={"red"}>red</Select.Option>
              <Select.Option value={"blue"}>blue</Select.Option> */}
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <div className="ctn-kanbandashboard">
        <div className="ctn-kanbandashboard__working">
          <div className="ctn-kanbandashboard__working__title">
            <Title level={2} className="title">
              Jobs On Working
            </Title>
            <Button
              type={"primary"}
              onClick={showModal}
              icon={<PlusOutlined />}
            >
              Add new
            </Button>
          </div>
          <div className="ctn-kanbandashboard__working__content">
            {jobs.listJobs ? (
              jobs.listJobs.map((job) => {
                if (!job.is_completed)
                  return (
                    <JobTag
                      key={job.id_job}
                      onDeleteJob={handleDeleteJob}
                      job={job}
                      title={job.title}
                      priority={job.priority}
                      process={job.process}
                      members={job.members}
                      setVisible={setVisible}
                    />
                  );
              })
            ) : (
              <Empty style={{ marginTop: "5rem" }} />
            )}
          </div>
        </div>
        <div className="ctn-kanbandashboard__complete">
          <div className="ctn-kanbandashboard__complete__title">
            <Title level={2} className="title">
              Completed Job
            </Title>
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
      {jobs.listJobs ? (
        jobs.listJobs.map((job) => {
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
        })
      ) : (
        <Empty style={{ marginTop: "5rem" }} />
      )}
    </div>
  );
};
