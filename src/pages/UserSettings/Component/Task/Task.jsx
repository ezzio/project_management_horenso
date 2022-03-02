import React from 'react';
import { Tabs } from 'antd';
import TaskItemRender from './TaskItemRender';
import moment from 'moment';

export default function Task({ allTask }) {
  const { TabPane } = Tabs;

  //<-------------- All Tasks ---------------
  const highAllTasks = allTask.filter((item) => item.priority === 'High');
  const mediumAllTasks = allTask.filter((item) => item.priority === 'Medium');
  const lowAllTasks = allTask.filter((item) => item.priority === 'Low');
  const resultAllTasks = [...highAllTasks, ...mediumAllTasks, ...lowAllTasks];
  //---------------------------------------->

  //<-------------- Backlogs ----------------
  const backlogs = allTask.filter((task) => moment().isBefore(task.start_time));
  const highBacklogs = backlogs.filter((item) => item.priority === 'High');
  const mediumBacklogs = backlogs.filter((item) => item.priority === 'Medium');
  const lowBacklogs = backlogs.filter((item) => item.priority === 'Low');
  const resultBacklogs = [...highBacklogs, ...mediumBacklogs, ...lowBacklogs];
  //---------------------------------------->

  //<------------- In Progress --------------
  const inProgress = allTask.filter(
    (task) =>
      moment().isBetween(task.start_time, task.end_time) && !task.is_complete
  );
  const highInProgress = inProgress.filter((item) => item.priority === 'High');
  const mediumInProgress = inProgress.filter(
    (item) => item.priority === 'Medium'
  );
  const lowInProgress = inProgress.filter((item) => item.priority === 'Low');
  const resultInProgress = [
    ...highInProgress,
    ...mediumInProgress,
    ...lowInProgress,
  ];
  //------------------------------------------>

  //<--------------- In Review ----------------
  const inReview = allTask.filter(
    (task) => task.progress === 100 && task.is_complete === false
  );
  const highInReview = inReview.filter((item) => item.priority === 'High');
  const mediumInReview = inReview.filter((item) => item.priority === 'Medium');
  const lowInReview = inReview.filter((item) => item.priority === 'Low');
  const resultInReview = [...highInReview, ...mediumInReview, ...lowInReview];
  //------------------------------------------>

  //<-------------- Completed -----------------
  const completed = allTask.filter((task) => task.is_complete);
  const highCompleted = completed.filter((item) => item.priority === 'High');
  const mediumCompleted = completed.filter(
    (item) => item.priority === 'Medium'
  );
  const lowCompleted = completed.filter((item) => item.priority === 'Low');
  const resultCompleted = [
    ...highCompleted,
    ...mediumCompleted,
    ...lowCompleted,
  ];
  //------------------------------------------>

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
          <TaskItemRender tasks={resultAllTasks} />
        </TabPane>
        <TabPane tab="Backlogs" key="2">
          <TaskItemRender tasks={resultBacklogs} />
        </TabPane>
        <TabPane tab="In progress" key="3">
          <TaskItemRender tasks={resultInProgress} />
        </TabPane>
        <TabPane tab="In review" key="4">
          <TaskItemRender tasks={resultInReview} />
        </TabPane>
        <TabPane tab="Completed" key="5">
          <TaskItemRender tasks={resultCompleted} />
        </TabPane>
      </Tabs>
    </div>
  );
}
