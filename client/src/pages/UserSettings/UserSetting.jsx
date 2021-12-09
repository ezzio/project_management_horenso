import React, { useState } from "react";
import { Button, Row, Col, Card, Avatar, Tabs, Progress, List, Checkbox } from 'antd'
// import PropTypes from "prop-types";
import './UserSetting.scss'
import { MdPeople } from "react-icons/md";
import { GoLocation } from "react-icons/go";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { GrAddCircle } from 'react-icons/gr'
import { BsGear, BsThreeDots } from 'react-icons/bs'
import { AiOutlineMail, AiOutlineLink, AiFillFacebook, AiOutlineFacebook } from  'react-icons/ai'

const UserSetting = (props) => {
  const { TabPane } = Tabs;

  const userInfo = {
    id_user: null,
    username: "",
    password: "",
  };

  const [isEditProfile, setIsEditProfile] = useState(false);

  return (
    <div
      className='user-setting-ctn'
    >
      <div className='info-ctn'>
      <Button 
        type='default'
        size='large'
        icon={
        <GrAddCircle 
          style={{position: 'relative', fontSize: 20, top: 4, marginRight: 5}} 
        />}
        style={{
          position: 'relative',
          left: '1.5%',
          borderRadius: 10,
          boxShadow: "0px 5px 15px #00000059",
          fontWeight: 'bold'
        }}
      >
        Create Project
      </Button>
      <Button 
        type='text'
        size='large'
        icon={
        <BsGear 
          style={{position: 'relative', fontSize: 20, top: 4, marginRight: 5}} 
        />}
        style={{
          position: 'relative',
          left: '68.4%',
          borderRadius: 10,
          fontWeight: 'bold',
        }}
      >
        Setting
      </Button>
      </div>
      <div className='project-ctn'>
        <Project />
      </div>
      <div className='task-ctn'>
        <h2
          style={{fontWeight: 'bold'}}
        >
          Task
        </h2>
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
      <div className="ctn-userinfo">
        <div className="userinfo__sidebar">
          <div className="userinfo__sidebar__name">
            <img
              src="https://avatars.githubusercontent.com/u/72656184?v=4"
              alt="userimg"
              height="250"
              width="250"
              className="user-image"
            />
          </div>
          {isEditProfile ? (
            <EditProfile />
          ) : (
            <InfoProfile setIsEditProfile={() => setIsEditProfile(true)} />
          )}
        </div>
      </div>
    </div>
  );
};

UserSetting.propTypes = {};

export default UserSetting;

const InfoProfile = ({ setIsEditProfile }) => {
  return (
    <>
      <div className="userinfo__sidebar__bio">
        <p className="name" style={{ color: "black" }}>
              Nguyên Đặng (Jimmy)
            </p>
        <p className="user-name">nguyendang127</p>
        <p className="userinfo__sidebar__bio__content">Contact me</p>
        <button className="edit-profile" onClick={setIsEditProfile}>Edit profile</button>
        <div className="userinfo__sidebar__footer">
          <section className="userinfo__sidebar__footer__status">
            <div className="statistic">
              <section className="followers">
                <MdPeople style={{position: "relative",fontSize: 18, marginRight: 5}}/>
                <span>followers <span>1</span></span>  
              </section>
              <section className="following">
                <span>following <span>0</span></span>
              </section>
            </div>
          </section>
        </div>
        <div>
          <HiOutlineOfficeBuilding style={{position: "relative",fontSize: 18, marginRight: 5}} />
        </div>
        <div>
            <GoLocation style={{position: "relative", top: 5,fontSize: 18, marginRight: 5}} />
            <span className="userinfo__sidebar__bio__location">VietNam</span>
        </div>
        <div>
          <AiOutlineMail style={{position: "relative", top: 5,fontSize: 18, marginRight: 5}}/>
          <span className="userinfo__sidebar__bio__email">
            phunguyen.dang.ctc@gmail.com
          </span>
        </div>
        <div>
          <AiOutlineLink style={{position: "relative", top: 5,fontSize: 18, marginRight: 5}} />
        </div>
        <div>
          <AiOutlineFacebook style={{position: "relative", top: 5,fontSize: 18, marginRight: 5}} />
        </div>
      </div>
    </>
  );
};

const EditProfile = ({setIsEditProfile}) => {
  return (
    <div>
      <form className='edit-profile-ctn'>
        <div className="edit-profile-ctn__name-ctn">
          <label htmlFor="name" className="edit-profile-ctn__name-ctn__label" >Name</label>
          <input type="text" placeholder='Name'
          className="edit-profile-ctn__name-ctn__input" />
        </div>
        <div className="edit-profile-ctn__name-ctn__bio">
          <label htmlFor="bio" className="edit-profile-ctn__bio-ctn__label">Bio</label>
          <textarea className="bio" placeholder='Add a bio' 
          className="edit-profile-ctn__bio-ctn__input" />
        </div>
        <div className="edit-profile-ctn__details-ctn">
          <label htmlFor="company"><HiOutlineOfficeBuilding style={{fontSize: 19}} /></label>
          <input className="edit-profile-ctn__details-ctn__input" type="text"  />
        </div>
        <div className="edit-profile-ctn__details-ctn">
          <label htmlFor="Location"><GoLocation style={{fontSize: 19}}/></label>
          <input className="edit-profile-ctn__details-ctn__input" type="text"  />
        </div>
        <div className="edit-profile-ctn__details-ctn">
          <label htmlFor="Location"><AiOutlineMail style={{fontSize: 19}}/></label>
          <input className="edit-profile-ctn__details-ctn__input" type="text"  />
        </div>
        <div className="edit-profile-ctn__details-ctn">
          <label htmlFor="Location"><AiOutlineLink style={{fontSize: 19}}/></label>
          <input className="edit-profile-ctn__details-ctn__input" type="text"  />
        </div>
        <div className="edit-profile-ctn__details-ctn">
          <label htmlFor="Location"><AiFillFacebook style={{fontSize: 19}}/></label>
          <input className="edit-profile-ctn__details-ctn__input" type="text"  />
        </div>
        <div>
          <button className="edit-profile-ctn__save-profile-btn" onClick={setIsEditProfile}>Save profile</button>
          <button className="edit-profile-ctn__cancel-btn" onClick={setIsEditProfile}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

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

const AllTask = () => {
  const { Item } = List

  const tasks = [
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
    <List
      itemLayout='horizontal'
      dataSource={tasks}
      renderItem={item => (
        <Item>
          <Checkbox style={{marginRight: 15}}/>
          <Item.Meta 
            title={
              <a style={{fontSize: 20}}>
                {item.title}
              </a>
            }
          />
          <button
            className={
              item.status ==='Approved' ? 'approved-decor' :
              (item.status ==='In Progress' ? 'progress-decor' :
                'review-decor'
              )
            }
          >
            <p
              className={
              item.status ==='Approved' ? 'approved-decor__text' :
              (item.status ==='In Progress' ? 'progress-decor__text' :
                'review-decor__text'
              )
            }
            >
              {item.status}
            </p>
          </button>
        </Item>
      )}
    />
  )
}

const ImportantTask = () => {
  const { Item } = List

  const tasks = [
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
    <List
      itemLayout='horizontal'
      dataSource={tasks}
      renderItem={item => (
        <Item>
          <Checkbox style={{marginRight: 15}}/>
          <Item.Meta 
            title={
              <a style={{fontSize: 20}}>
                {item.title}
              </a>
            }
          />
          <button
            className={
              item.status ==='Approved' ? 'approved-decor' :
              (item.status ==='In Progress' ? 'progress-decor' :
                'review-decor'
              )
            }
          >
            <p
              className={
              item.status ==='Approved' ? 'approved-decor__text' :
              (item.status ==='In Progress' ? 'progress-decor__text' :
                'review-decor__text'
              )
            }
            >
              {item.status}
            </p>
          </button>
        </Item>
      )}
    />
  )
}

const Note = () => {
  const { Item } = List

  const tasks = [
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
    <List
      itemLayout='horizontal'
      dataSource={tasks}
      renderItem={item => (
        <Item>
          <Checkbox style={{marginRight: 15}}/>
          <Item.Meta 
            title={
              <a style={{fontSize: 20}}>
                {item.title}
              </a>
            }
          />
          <button
            className={
              item.status ==='Approved' ? 'approved-decor' :
              (item.status ==='In Progress' ? 'progress-decor' :
                'review-decor'
              )
            }
          >
            <p
              className={
              item.status ==='Approved' ? 'approved-decor__text' :
              (item.status ==='In Progress' ? 'progress-decor__text' :
                'review-decor__text'
              )
            }
            >
              {item.status}
            </p>
          </button>
        </Item>
      )}
    />
  )
}

const Links = () => {
  const { Item } = List

  const tasks = [
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
    <List
      itemLayout='horizontal'
      dataSource={tasks}
      renderItem={item => (
        <Item>
          <Checkbox style={{marginRight: 15}}/>
          <Item.Meta 
            title={
              <a style={{fontSize: 20}}>
                {item.title}
              </a>
            }
          />
          <button
            className={
              item.status ==='Approved' ? 'approved-decor' :
              (item.status ==='In Progress' ? 'progress-decor' :
                'review-decor'
              )
            }
          >
            <p
              className={
              item.status ==='Approved' ? 'approved-decor__text' :
              (item.status ==='In Progress' ? 'progress-decor__text' :
                'review-decor__text'
              )
            }
            >
              {item.status}
            </p>
          </button>
        </Item>
      )}
    />
  )
}

