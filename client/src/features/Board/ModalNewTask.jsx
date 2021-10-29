import React from 'react'
import { Modal, PageHeader, Input, DatePicker, Avatar, Tabs, Select, Form, message} from 'antd';
import 'antd/dist/antd.css'
import { useDispatch, useSelector } from 'react-redux';
import { addNewTask } from './boardSlice';
// import { register } from 'serviceWorker';


function ModalNewTask({ modalOpen, closeModal }) {
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const [form] = Form.useForm();

  const tasks = useSelector((state) => state.board.columns[0].tasks);

  const dispatch = useDispatch();

    const onFinish = (values) => {
        const newTask = {
            id: tasks.length,
            title: values.title,
            description: values.description,
            progress: '0',
            level: values.priority,
            startTime: values.deadline[0].format('YYYY-MM-DD'),
            endTime: values.deadline[1].format('YYYY-MM-DD'),
            taskers: values.members,
        }
        console.log(newTask);
        closeModal();
        dispatch(addNewTask(newTask))
        message.success('Success! Task has been created.')
    };

    const { TabPane } = Tabs;

    return (
        <div>
            <Modal 
                title='Create a new task'
                visible={modalOpen}
                onCancel={closeModal}
                okText='Confirm'
                confirmLoading={confirmLoading}
                onOk={() => {
                    if (activeTab === '1') {
                        changeTab('2')
                    }
                    else {
                        form
                        .validateFields()
                        .then((values) => {
                            form.resetFields();
                            onFinish(values);
                        })
                        .catch((info) => {
                            if (info.values.title === undefined ) {
                                message.warning('Task title is invalid! Please try again');
                            }
                            else if (info.values.title !== undefined && (info.values.title.length < 6 || info.values.title.length > 36)) {
                                message.warning('Task title is invalid! Please try again');
                            }
                            else if (info.values.description === undefined ) {
                                message.warning('Task description is invalid! Please try again')
                            }
                            else if ( info.values.title !== undefined && (info.values.description.length < 6 || info.values.description.length > 100)) {
                                message.warning('Task description is invalid! Please try again')
                            }
                            else if (info.values.deadline === undefined) {
                                message.warning('Task deadline is invalid! Please try again')
                            }
                            else if (info.values.members === undefined) {
                                message.warning('Task members is invalid! Please try again')
                            }
                            console.log('Validate Failed:', info);
                        });
                    }
                }}
            >   
            <Tabs defaultActiveKey='1' activeKey={activeTab} onChange={changeTab}>
                <TabPane tab='Step 1' key='1'>
                    <Step1 onFinish={onFinish} form={form}/>
                </TabPane>
                <TabPane tab='Step 2' key='2'>
                    <Step2 onFinish={onFinish} form={form}/>
                </TabPane>
            </Tabs>
            </Modal>
        </div>
    )
}

function Step1({onFinish, form}) {

    const { Option } = Select;
    const { RangePicker } = DatePicker;

    return (
        <div>
            <PageHeader 
                title='Step 1'
                subTitle='Configure task details'
            />
            <Form
                layout="vertical"
                form={form}
                name="Step 1"
                onFinish={onFinish}
                autoComplete="off"
                initialValues={{ priority: 'low' }}
            >
                <Form.Item label='Priority:' name='priority'>
                    <Select size='large'>
                        <Option value='high'>High</Option>
                        <Option value='medium'>Medium</Option>
                        <Option value='low'>Low</Option>
                    </Select>
                </Form.Item>
                <Form.Item label='Title: ' name='title'
                    rules={[
                        { required: true, message: 'This field is required'},
                        { min: 6, message: 'Title must be 6-30 characters long'},
                        { max: 30, message: 'Title must be 6-30 characters long'},
                    ]}
                >
                    <Input 
                        bordered={true} maxLength={36}
                        size='large' placeholder='Enter title here...'
                        style={{marginBottom: 30}} name='title'
                    />
                </Form.Item>
                <Form.Item label='Description: ' name='description'
                    rules={[
                        { required: true, message: 'This field is required'},
                        { min: 6, message: 'Description must be 6-100 characters long'},
                        { max: 100, message: 'Description must be 6-100 characters long'},
                    ]}
                >
                    <Input 
                        bordered={true} placeholder='Enter Description here...'
                        style={{marginBottom: 30}} size='large' maxLength={100} 
                    />
                </Form.Item>
                <Form.Item label='Set deadline: ' name='deadline'
                    rules={[
                        { type: 'array', required: true, message: 'This field is required' },
                    ]}
                >
                    <RangePicker size='large'
                        allowClear
                        showTime
                        format="YYYY-MM-DD"
                        style={{ width: '100%' }}
                    />
                </Form.Item>                  
            </Form>
        </div>
    )
}

function Step2({onFinish, form}) {

    const members = [
        {
        name: 'Koih Hana',
        avatar:
            'https://static.remove.bg/remove-bg-web/a4391f37bcf9559ea5f1741ac3cee53c31ab75cc/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg',
        },
        {
        name: 'Jack Will',
        avatar:
            'https://static.remove.bg/remove-bg-web/a4391f37bcf9559ea5f1741ac3cee53c31ab75cc/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg',
        },
        {
        name: 'MenGuy124',
        avatar:
            'https://static.remove.bg/remove-bg-web/a4391f37bcf9559ea5f1741ac3cee53c31ab75cc/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg',
        },
    ];

    const { Option } = Select;

    return (
        <div>
            <PageHeader 
                title='Step 2'
                subTitle='Assign members to task'
            />
            <Form
                layout="vertical"
                form={form}
                name="Step 2"
                onFinish={onFinish}
            >
                <Form.Item name='members'
                    rules={[
                        {
                            required: true,
                            message: 'This field is required',
                            type: 'array'
                        },
                    ]}
                >
                    <Select
                        mode='multiple'
                        style={{width: '100%'}}
                        placeholder='Select members to assign task'
                        size='large' 
                    >
                        {members.map((member, index) => {
                            return (
                                <Option key={index} value={member.name}>
                                    <Avatar src={member.avatar} alt='avatar' />
                                    <label style={{marginLeft: 5}}>{member.name}</label>
                                </Option>
                            )
                        })}
                    </Select>
                </Form.Item>
            </Form>
        </div>
    )
}

export default ModalNewTask;
