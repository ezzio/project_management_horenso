import React from 'react';
import { Avatar, Col, Row, Card, Progress, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Project = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.userSetting);
  return (
    <Row
      gutter={[48, 16]}
      wrap={false}
      align="middle"
      style={{ position: 'relative', top: '1rem', left: '1rem', width: 930 }}
    >
      {profile.projects &&
        profile.projects.map((project) => {
          const percent = 30;
          return (
            <Col key={project.idProject} span={48}>
              <Card
                onClick={() => {
                  history.push(`/${project.idProject}/dashboard`);
                  localStorage.setItem('projectowner', project.idProject);
                  localStorage.setItem('sider', '1');
                }}
                style={{
                  boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                  borderRadius: 10,
                  width: 300,
                  height: 270,
                  cursor: 'pointer',
                }}
              >
                <Progress
                  percent={percent}
                  size="small"
                  strokeColor={
                    percent <= 30
                      ? 'red'
                      : percent <= 50
                      ? 'orange'
                      : percent <= 70
                      ? 'yellow'
                      : percent <= 90
                      ? 'dodgerblue'
                      : 'lawngreen'
                  }
                />
                <Tooltip placement="topLeft" title={project.title}>
                  <h2
                    style={{
                      position: 'relative',
                      textAlign: 'center',
                      top: 30,
                    }}
                    className="project-ctn__title"
                  >
                    {project.title}
                  </h2>
                </Tooltip>
                <h2
                  style={{
                    position: 'relative',
                    textAlign: 'center',
                    top: '1rem',
                  }}
                >
                  0/0
                </h2>
                <p
                  style={{
                    position: 'relative',
                    textAlign: 'center',
                    fontSize: 11,
                    fontWeight: 'bold',
                    color: 'lightgray',
                  }}
                >
                  task complete
                </p>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Avatar.Group
                    maxCount={5}
                    size="small"
                    maxStyle={{ color: 'gray', backgroundColor: 'lightgray' }}
                    style={{ position: 'relative', top: '1rem' }}
                  >
                    {project.members &&
                      project.members.map((member) => {
                        return <Avatar src={member.avatar} size="large" />;
                      })}
                  </Avatar.Group>
                </div>
              </Card>
            </Col>
          );
        })}
    </Row>
  );
};

export default Project;
