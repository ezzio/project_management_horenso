import React from 'react'
import { Tabs } from 'antd'
import AllTask from './AllTask';
import ImportantTask from './ImportantTask';
import Note from './Note';
import Links from './Links';

export default function Task() {

    const { TabPane } = Tabs;

    const tasks = 
    [
        {
        title: 'Fix bugs',
        status: 'In Progress',
        },
        {
        title: 'Design UI for login page',
        status: 'Approved',
        },
        {
        title: 'Add change language feature',
        status: 'In Review',
        },
    ]

    return (
        <div>
            <Tabs
                defaultActiveKey='1'
                type='line'
                size='large'
                tabBarGutter={64}
                style={{fontWeight: 'bold'}}
                >
                <TabPane tab='All' key='1'>
                    <AllTask tasks={tasks} />
                </TabPane>
                <TabPane tab='Important' key='2'>
                    <ImportantTask tasks={tasks} />
                </TabPane>
                <TabPane tab='Note' key='3'>
                    <Note tasks={tasks} />
                </TabPane>
                <TabPane tab='Link' key='4'>
                    <Links tasks={tasks} />
                </TabPane>
            </Tabs>
        </div>
    )
}
