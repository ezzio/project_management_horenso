import React from 'react';
import { Tabs } from 'antd';
import TaskItemRender from './TaskItemRender';
import moment from 'moment';

export default function Task({ allTask }) {
  const { TabPane } = Tabs;

  const backlogs = allTask.filter((task) => moment().isBefore(task.start_time));
  const inProgress = allTask.filter(
    (task) =>
      moment().isBetween(task.start_time, task.end_time) && !task.is_complete
  );
  const inReview = allTask.filter(
    (task) => task.progress === 100 && task.is_complete === false
  );
  const completed = allTask.filter((task) => task.is_complete);

  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        type="line"
        size="large"
        tabBarGutter={64}
        style={{ fontWeight: 'bold' }}
      >
        <TabPane tab="All" key="1">
          <TaskItemRender tasks={allTask} />
        </TabPane>
        <TabPane tab="Backlogs" key="2">
          <TaskItemRender tasks={backlogs} />
        </TabPane>
        <TabPane tab="In progress" key="3">
          <TaskItemRender tasks={inProgress} />
        </TabPane>
        <TabPane tab="In review" key="4">
          <TaskItemRender tasks={inReview} />
        </TabPane>
        <TabPane tab="Completed" key="5">
          <TaskItemRender tasks={completed} />
        </TabPane>
      </Tabs>
    </div>
  );
}
