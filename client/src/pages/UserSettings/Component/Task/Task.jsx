import React from 'react'
import { Tabs } from 'antd'
import AllTask from './AllTask';
import ImportantTask from './ImportantTask';
import Note from './Note';
import Links from './Links';

export default function Task() {

    const { TabPane } = Tabs;

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
                    <AllTask />
                </TabPane>
                <TabPane tab='Important' key='2'>
                    <ImportantTask />
                </TabPane>
                <TabPane tab='Note' key='3'>
                    <Note />
                </TabPane>
                <TabPane tab='Link' key='4'>
                    <Links />
                </TabPane>
            </Tabs>
        </div>
    )
}
