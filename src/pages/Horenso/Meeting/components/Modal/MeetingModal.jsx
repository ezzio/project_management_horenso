import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  Form,
  Input,
  message,
  DatePicker,
  Select,
  TimePicker,
} from "antd";
import moment from "moment";
import { createMeeting, createMettingRoom } from "../../MeetingSlice";
import { Switch, Route, Link, useParams } from "react-router-dom";
function MeetingModal({ isModalVisible, setIsModalVisible }) {
  const dispatch = useDispatch();

  const { idProject } = useParams();
  const members = useSelector((state) => state.meeting.teamMembers);

  const { RangePicker } = DatePicker;

  const [form] = Form.useForm();

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (value) => {
    const startTime = value.duration[0].format("HH:mm YYYY-MM-DD");
    const endTime = value.duration[1].format("HH:mm YYYY-MM-DD");
    const newMeeting = {
      name: value.name,
      description: value.desc,
      startTime,
      endTime,
      members: value.members,
      timeStartMeeting: value.STime.format("HH:mm YYYY-MM-DD"),
      idProject,
    };
    dispatch(createMettingRoom(newMeeting));
    setIsModalVisible(false);
    dispatch(createMeeting(newMeeting));
    setTimeout(message.success("Meeting successfully created!"), 500);
  };
  const onFinishFailed = () => {
    message.error("Submit failed!");
  };

  return (
    <div>
      <Modal
        title="Create new meeting"
        visible={isModalVisible}
        okText="Create"
        cancelText="Cancel"
        onCancel={handleCancel}
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
      >
        <Form
          form={form}
          layout="vertical"
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true, message: "This field is required" },
              {
                type: "string",
                min: 6,
                message: "Name must be longer than 6 characters",
              },
            ]}
          >
            <Input placeholder="Enter meeting name" size="large" />
          </Form.Item>
          <Form.Item
            name="desc"
            label="Description"
            rules={[
              { required: true, message: "This field is required" },
              {
                type: "string",
                min: 6,
                max: 200,
                message: "Description must be between than 6-200 characters",
              },
            ]}
          >
            <Input placeholder="Enter meeting description" size="large" />
          </Form.Item>
          <Form.Item
            name="STime"
            label="Start time"
            rules={[
              { required: true, message: "Please specify starting time" },
            ]}
          >
            <TimePicker label="timeStartMeeting" />
          </Form.Item>

          <Form.Item
            name="duration"
            label="Duration"
            rules={[
              { required: true, message: "Please specify meeting duration" },
            ]}
          >
            <RangePicker
              format="DD/MM/YYYY"
              disabledDate={disabledDate}
              showTime={{ defaultValue: moment("00:00", "HH:mm") }}
              size="large"
            />
          </Form.Item>
          <Form.Item
            label="Members"
            name="members"
            rules={[
              {
                required: true,
                message: "Please choose member to add to this meeting",
              },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Members in this conversation"
              size="large"
            >
              {members.map((item) => (
                <Select.Option value={item.name}>{item.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default MeetingModal;
