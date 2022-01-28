import React, { useEffect, useState } from 'react';
// library dependencies
import { Space, Typography, Tabs, Spin, Empty } from 'antd';
import Animate from 'rc-animate';

// icon
import {
  FundOutlined,
  AlertOutlined,
  RocketOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
// css
import './Dashboard.scss';

// components
import LinePlot from './components/LinePlot/LinePlot';
import ActivityFeed from './components/ActivityFeed/ActivityFeed';
import TaskStatus from './components/TaskStatus/TaskStatus';
import TargetPercent from './components/TargetPercent/TargetPercent';
import TreeChart from './components/TreeChart/TreeChart';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllJob,
  getAllTask,
  getLinePlot,
  getTimeLine,
  updateProgressProject,
} from './dashboardSlice';
import { useParams } from 'react-router-dom';
import moment from 'moment';
const { Title } = Typography;
const { TabPane } = Tabs;

const Dashboard = () => {
  const { idProject } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.dashboard.loading);
  const jobs = useSelector((state) => state.dashboard.jobs);
  const tasks = useSelector((state) => state.dashboard.tasks);
  const activity = useSelector((state) => state.dashboard.activity);
  const [targetPercent, setTargetPercent] = useState();

  // Target percent
  const jobIsComplete = jobs.filter((job) => job.is_completed);
  useEffect(() => {
    setTargetPercent(parseInt(jobIsComplete?.length / jobs?.length));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobIsComplete]);

  // Job status
  const backlogs = tasks.filter(
    (task) => !moment().isBetween(task.start_time, task.end_time)
  );
  const inProgress = tasks.filter(
    (task) =>
      moment().isBetween(task.start_time, task.end_time) && task.progress < 100
  );
  const inPreview = tasks.filter(
    (task) =>
      moment().isBetween(task.start_time, task.end_time) &&
      task.progress === 100
  );
  const completed = tasks.filter((task) => task.is_complete);

  // line plot
  const linePlot = useSelector((state) => state.dashboard.linePlot);

  const clearUndefined = linePlot.filter((item) =>
    jobs.some((job) => job._id === item?.jobEdit)
  );

  const converToLinePlotChart = clearUndefined.map((item) => {
    return {
      title: jobs.filter((job) => job._id === item.jobEdit)[0]?.title,
      time: moment(item.createAt).format('YYYY-MM-DD HH:mm:ss'),
      progress: item.progress,
    };
  });
  console.log(converToLinePlotChart);

  useEffect(() => {
    dispatch(getAllJob(idProject));
    dispatch(getAllTask(idProject));
    dispatch(getTimeLine(idProject));
    dispatch(getLinePlot(idProject));
  }, []);

  useEffect(() => {
    if (!isNaN(targetPercent))
      dispatch(updateProgressProject({ idProject, progress: targetPercent }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetPercent]);

  return (
    <Spin tip="Loading..." spinning={loading}>
      <div className="dashboard">
        <div className="dashboard__body">
          <div className="dashboard__body__left">
            <div className="left-content">
              <div className="left-content__top">
                <Space style={{ marginBottom: '1rem' }}>
                  <AlertOutlined style={{ fontSize: '1rem' }} />
                  <Title level={5} style={{ marginBottom: 0, lineHeight: 0 }}>
                    Project flow
                  </Title>
                </Space>
                <TreeChart />
              </div>
              <div className="left-content__bottom">
                <Space style={{ marginBottom: '1rem' }}>
                  <FundOutlined style={{ fontSize: '1rem' }} />
                  <Title level={5} style={{ marginBottom: 0, lineHeight: 0 }}>
                    Jobs progress
                  </Title>
                </Space>
                <LinePlot converToLinePlotChart={converToLinePlotChart} />
              </div>
            </div>
          </div>
          <div className="dashboard__body__right">
            <div className="right-content">
              <div className="right-content__top">
                <Tabs defaultActiveKey="1" centered>
                  <TabPane
                    tab={
                      <span>
                        <RocketOutlined style={{ fontSize: '1rem' }} />
                        Target's Percent
                      </span>
                    }
                    key="1"
                    forceRender="true"
                  >
                    <Animate transitionName="fade">
                      <TargetPercent targetPercent={targetPercent} />
                    </Animate>
                  </TabPane>
                  <TabPane
                    tab={
                      <span>
                        <PieChartOutlined style={{ fontSize: '1rem' }} />
                        Task's Status
                      </span>
                    }
                    key="2"
                    forceRender="true"
                  >
                    <Animate transitionName="fade">
                      <TaskStatus
                        backlogs={backlogs}
                        inProgress={inProgress}
                        inPreview={inPreview}
                        completed={completed}
                      />
                    </Animate>
                  </TabPane>
                </Tabs>
              </div>
              <div className="right-content__bottom">
                <div className="right-content__bottom__title">
                  <Space style={{ marginBottom: '1rem' }}>
                    <AlertOutlined style={{ fontSize: '1rem' }} />
                    <Title level={5} style={{ marginBottom: 0, lineHeight: 0 }}>
                      Activity Feed
                    </Title>
                  </Space>
                </div>
                <Animate transitionName="fade" transitionAppear>
                  <div className="right-content__bottom__feeds">
                    {activity && activity.length ? (
                      activity.map((item) => <ActivityFeed item={item} />)
                    ) : (
                      <Empty />
                    )}
                  </div>
                </Animate>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default Dashboard;
