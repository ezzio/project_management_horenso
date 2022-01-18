import React from "react";
import PropTypes from "prop-types";
import {
  Modal,
  Button,
  Form,
  message,
  Input,
  Select,
  DatePicker,
  Switch,
  Checkbox,
} from "antd";
import { useState } from "react";
import { GiJetPack } from "react-icons/gi";
import moment from "moment";
import { useSelector } from "react-redux";

const { RangePicker } = DatePicker;

const ModalEditKanban = (props) => {
  const { handleCancel, state, job, handleEditClick } = props;
  const [form] = Form.useForm();
  const dateFormat = "YYYY-MM-DD";
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const jobs = useSelector((state) => state.kanban);

  const onFinish = (values) => {
    if (onFinish) return handleEditClick(values);
  };
  return (
    <>
      <Modal
        title="Edit Kanban"
        visible={state}
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
        onCancel={handleCancel}
        okButtonProps={{ disabled: buttonDisabled }}
      >
        <Form
          layout="vertical"
          form={form}
          name="edit_kanban"
          onFinish={onFinish}
          autoComplete="off"
          onFieldsChange={() => setButtonDisabled(false)}
          initialValues={{
            title: job.title,
            priority: job.priority,
            range_time: [
              moment(job.start_time, dateFormat),
              moment(job.end_time, dateFormat),
            ],
            is_completed: job.is_completed,
            members: job.members.map((item) => item.user_name),
          }}
        >
          <Form.Item
            label="Title: "
            name="title"
            rules={[{ required: true, message: "Please type in title!" }]}
          >
            <Input placeholder="Title..." />
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
              { required: true, type: "array", message: "Please select time!" },
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
            label="Complete"
            name="is_completed"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            name="members"
            label="Members:"
            rules={[
              {
                message: "Please select members on duty!",
                type: "array",
                required: true,
              },
            ]}
          >
            <Select mode="multiple" placeholder="Search member..." disabled>
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
    </>
  );
};

ModalEditKanban.propTypes = {
  handleCancel: PropTypes.func,
  handleEditClick: PropTypes.func,
  state: PropTypes.bool,
  job: PropTypes.object,
};

export default ModalEditKanban;
