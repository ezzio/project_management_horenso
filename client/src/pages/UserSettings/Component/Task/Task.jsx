import React from 'react';
import { Tabs } from 'antd';
import TaskItemRender from './TaskItemRender';
import { useSelector } from 'react-redux';

export default function Task() {
  const { TabPane } = Tabs;

  const tasks = useSelector((state) => state.userSetting.tasks);

  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        type="line"
        size="large"
        tabBarGutter={64}
        style={{ fontWeight: 'bold' }}
      >
        <TabPane tab="Backlogs" key="1">
          <TaskItemRender tasks={tasks} />
        </TabPane>
        <TabPane tab="In progress" key="2">
          <TaskItemRender tasks={tasks} />
        </TabPane>
        <TabPane tab="In review" key="3">
          <TaskItemRender tasks={tasks} />
        </TabPane>
        <TabPane tab="Completed" key="4">
          <TaskItemRender tasks={tasks} />
        </TabPane>
      </Tabs>
    </div>
  );
}
