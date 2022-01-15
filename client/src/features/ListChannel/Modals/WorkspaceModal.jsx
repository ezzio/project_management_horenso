import React from 'react'
import { Modal, Form, message, Input } from 'antd'

function WorkspaceModal({ openWorkspaceModal, setOpenWorkspaceModal }) {

    const [form] = Form.useForm();

    const onFinish = (value) => {
        console.log(value);
        setOpenWorkspaceModal(false)
    }

    const onFinishFailed = () => {
        message.error("Submit Failed!")
    }


    return (
        <div>
            <Modal
                visible={openWorkspaceModal}
                title="Add new workspace"
                okText='Create'
                cancelText='Cancel'
                onCancel={() => setOpenWorkspaceModal(false)}
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
                    from={form}
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
                        <Input placeholder="Enter name of workspace" size="large" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default WorkspaceModal
