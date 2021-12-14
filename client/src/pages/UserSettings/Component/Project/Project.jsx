import React from "react";
import { Avatar, Button, Col, Row, Card, Progress} from "antd";
import { BsThreeDots } from "react-icons/bs";

const Project = () => {

  const projects = [
    {
      id: 0,
      avatar: 'https://static.remove.bg/remove-bg-web/a4391f37bcf9559ea5f1741ac3cee53c31ab75cc/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg',
      title: 'Project title',
      totalTask: 140,
      completedTask: 90,
      members: [
        {
          id: 0,
          avatar: 'https://static.remove.bg/remove-bg-web/a4391f37bcf9559ea5f1741ac3cee53c31ab75cc/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg',
        },
        {
          id: 1,
          avatar: 'https://static.remove.bg/remove-bg-web/a4391f37bcf9559ea5f1741ac3cee53c31ab75cc/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg',
        },
        {
          id: 2,
          avatar: 'https://static.remove.bg/remove-bg-web/a4391f37bcf9559ea5f1741ac3cee53c31ab75cc/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg',
        },
        {
          id: 3,
          avatar: 'https://static.remove.bg/remove-bg-web/a4391f37bcf9559ea5f1741ac3cee53c31ab75cc/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg',
        },
        {
          id: 4,
          avatar: 'https://static.remove.bg/remove-bg-web/a4391f37bcf9559ea5f1741ac3cee53c31ab75cc/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg',
        },
        {
          id: 5,
          avatar: 'https://static.remove.bg/remove-bg-web/a4391f37bcf9559ea5f1741ac3cee53c31ab75cc/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg',
        },
      ]
    },
    {
      id: 0,
      avatar: 'https://static.remove.bg/remove-bg-web/a4391f37bcf9559ea5f1741ac3cee53c31ab75cc/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg',
      title: 'Project title',
      totalTask: 140,
      completedTask: 90,
      members: [
        {
          id: 0,
          avatar: 'https://static.remove.bg/remove-bg-web/a4391f37bcf9559ea5f1741ac3cee53c31ab75cc/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg',
        },
        {
          id: 1,
          avatar: 'https://static.remove.bg/remove-bg-web/a4391f37bcf9559ea5f1741ac3cee53c31ab75cc/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg',
        },
        {
          id: 2,
          avatar: 'https://static.remove.bg/remove-bg-web/a4391f37bcf9559ea5f1741ac3cee53c31ab75cc/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg',
        },
        {
          id: 3,
          avatar: 'https://static.remove.bg/remove-bg-web/a4391f37bcf9559ea5f1741ac3cee53c31ab75cc/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg',
        },
        {
          id: 4,
          avatar: 'https://static.remove.bg/remove-bg-web/a4391f37bcf9559ea5f1741ac3cee53c31ab75cc/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg',
        },
        {
          id: 5,
          avatar: 'https://static.remove.bg/remove-bg-web/a4391f37bcf9559ea5f1741ac3cee53c31ab75cc/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg',
        },
      ]
    },
    {
      id: 0,
      avatar: 'https://static.remove.bg/remove-bg-web/a4391f37bcf9559ea5f1741ac3cee53c31ab75cc/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg',
      title: 'Project title',
      totalTask: 140,
      completedTask: 90,
      members: [
        {
          id: 0,
          avatar: 'https://static.remove.bg/remove-bg-web/a4391f37bcf9559ea5f1741ac3cee53c31ab75cc/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg',
        },
        {
          id: 1,
          avatar: 'https://static.remove.bg/remove-bg-web/a4391f37bcf9559ea5f1741ac3cee53c31ab75cc/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg',
        },
        {
          id: 2,
          avatar: 'https://static.remove.bg/remove-bg-web/a4391f37bcf9559ea5f1741ac3cee53c31ab75cc/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg',
        },
        {
          id: 3,
          avatar: 'https://static.remove.bg/remove-bg-web/a4391f37bcf9559ea5f1741ac3cee53c31ab75cc/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg',
        },
        {
          id: 4,
          avatar: 'https://static.remove.bg/remove-bg-web/a4391f37bcf9559ea5f1741ac3cee53c31ab75cc/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg',
        },
        {
          id: 5,
          avatar: 'https://static.remove.bg/remove-bg-web/a4391f37bcf9559ea5f1741ac3cee53c31ab75cc/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg',
        },
      ]
    },
    {
      id: 0,
      avatar: 'https://static.remove.bg/remove-bg-web/a4391f37bcf9559ea5f1741ac3cee53c31ab75cc/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg',
      title: 'Project title',
      totalTask: 140,
      completedTask: 90,
      members: [
        {
          id: 0,
          avatar: 'https://static.remove.bg/remove-bg-web/a4391f37bcf9559ea5f1741ac3cee53c31ab75cc/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg',
        },
        {
          id: 1,
          avatar: 'https://static.remove.bg/remove-bg-web/a4391f37bcf9559ea5f1741ac3cee53c31ab75cc/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg',
        },
        {
          id: 2,
          avatar: 'https://static.remove.bg/remove-bg-web/a4391f37bcf9559ea5f1741ac3cee53c31ab75cc/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg',
        },
        {
          id: 3,
          avatar: 'https://static.remove.bg/remove-bg-web/a4391f37bcf9559ea5f1741ac3cee53c31ab75cc/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg',
        },
        {
          id: 4,
          avatar: 'https://static.remove.bg/remove-bg-web/a4391f37bcf9559ea5f1741ac3cee53c31ab75cc/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg',
        },
        {
          id: 5,
          avatar: 'https://static.remove.bg/remove-bg-web/a4391f37bcf9559ea5f1741ac3cee53c31ab75cc/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg',
        },
      ]
    },
  ];

  return (
    <Row 
      gutter={[48, 16]}
      wrap={false}
      align='middle'
    >
      {projects.map((project) => {

        const percent = Math.round((project.completedTask / project.totalTask) * 100);
        
        return (
          <Col key={project.id} span={48}>
            <Card
              style={{ boxShadow: "0px 5px 15px #00000059", borderRadius: 10, minWidth: 270 }}          
            >
              <div>
                <Progress 
                  percent={percent}
                  showInfo={false}
                  size="small"
                  strokeColor={
                    percent <= 30 ? 'red' : 
                    (percent <= 50 ? 'orange' : 
                    (percent <= 70 ? 'yellow' : 
                    (percent <= 90 ? 'dodgerblue' : 'lawngreen')
                    ))
                  }
                  style={{width: 50}}
                />
                <Button 
                  type='text'
                  size='large'
                  icon={
                  <BsThreeDots
                    style={{position: 'relative', fontSize: 20, top: 4, marginRight: 5}} 
                  />}
                  style={{ position: 'relative', left: '65%' }}
                />
              </div>
              <Avatar 
                src={project.avatar}
                  size='large'
                  style={{position: 'relative', left: '41%'}}
              />
              <h2
                style={{textAlign: 'center'}}
              >
                {project.title}
              </h2>
              <h2
                style={{textAlign: 'center', marginBottom: 0 }}
              >
                {project.completedTask}/{project.totalTask}
              </h2>
              <p
                style={{textAlign: 'center', fontSize: 11, fontWeight: 'bold', color: 'lightgray'}}
              >
                Task complete
              </p>
              <div style={{display: "flex", justifyContent:'center'}}>
                <Avatar.Group
                maxCount={5}
                size='small'
                maxStyle={{color: 'gray', backgroundColor: 'lightgray'}}
                style={{}}
                >
                  {project.members.map((member) => {
                    return (
                      <Avatar key={member.id} src={member.avatar}/>
                    )
                  })}
                </Avatar.Group>
              </div>
            </Card>
          </Col>
        )
      })}
    </Row>
  )
}

export default Project