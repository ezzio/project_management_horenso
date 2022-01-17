import React from 'react'
import { Modal, Form, message, Input } from 'antd'
import { useDispatch } from 'react-redux'
import { addTeamsChannel } from '../ListChannelSlice'

function TeamsModal({ openTeamsModal, setOpenTeamsModal }) {

    const [form] = Form.useForm();

    const dispatch = useDispatch();

    const onFinish = (value) => {
        console.log(value);
        setOpenTeamsModal(false)
        dispatch(addTeamsChannel(value))
    }

    const onFinishFailed = () => {
        message.error("Submit Failed!")
    }


    return (
        <div>
            <Modal
                visible={openTeamsModal}
                title="Add new team"
                okText='Create'
                cancelText='Cancel'
                onCancel={() => setOpenTeamsModal(false)}
                onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onFinish(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
                }}
            >
                <Form 
                    form={form}
                    layout='vertical'
                    autoComplete='off'
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true }, { type: 'string', min: 6 }]}
                        >
                        <Input placeholder="Enter name of team" size="large" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default TeamsModal
