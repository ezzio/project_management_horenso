import { Input, Space, Spin, Table } from 'antd';
import 'antd/dist/antd.css';
import React, { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ModalAddTeammate from './components/AddNewTeammate/ModalAddTeammate';
import DeleteTeammate from './components/DeleteTeammate/DeleteTeammate';
import EditTeammate from './components/EditTeammate/EditTeammate';
import './TeammateFeature.scss';
import { ListUser } from './teammateSlice';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { viewMemberInfo } from 'features/ModalCheckProfileMember/CheckProfileMemberSlice';
import ModalCheckProfileMember from 'features/ModalCheckProfileMember/ModalCheckProfileMember';

const TeammateFeature = () => {
  const teammateData = useSelector((state) => state.teammate.dataList);
  const isProjectOwner = useSelector((state) => state.teammate.isProjectOwner);
  const loading = useSelector((state) => state.teammate.loading);
  const [teammate, setTeammate] = useState(teammateData);
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const role = useSelector((state) => state.sidebar.role);

  const params = useParams();
  const idProject = params.idProject;

  useEffect(() => {
    dispatch(ListUser(idProject));
  }, []);

  useEffect(() => {
    setTeammate(teammateData);
  }, [teammateData]);

  // View Member's Profile
  const [visible, setVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const viewProfile = (item) => {
    setUserName(item);
    setVisible(true);
    dispatch(viewMemberInfo(item));
  };

  const FilterByNameInput = (
    <Input
      placeholder="Search teammate..."
      value={value}
      bordered={false}
      onChange={(e) => {
        const currValue = e.target.value;
        setValue(currValue);
        const filteredData = teammateData.filter(
          (entry) =>
            entry.user_name.toLowerCase().includes(currValue) ||
            entry.display_name.toLowerCase().includes(currValue)
        );
        setTeammate(filteredData);
      }}
    />
  );

  const columns = [
    {
      title: 'Name',
      dataIndex: 'display_name',
      key: 'user_name',
      render: (t, r) => (
        <div className="user__tag">
          <Avatar
            style={{ cursor: 'pointer' }}
            className="img"
            size={32}
            icon={<UserOutlined />}
            src={r.avatar}
            onClick={() => viewProfile(r.user_name)}
          />
          {r.display_name || r.user_name}
        </div>
      ),
    },
    {
      title: 'Username',
      dataIndex: 'user_name',
      key: 'user_name',
      render: (t, r) => r.user_name,
    },
    {
      title: 'Tags',
      dataIndex: 'tag',
      key: 'user_name',
      render: (t, r) => r.tag,
    },
    {
      title: 'Action',
      render: (text, record) => (
        <Space size="middle">
          {isProjectOwner &&
            record.tag !== 'Project Manager' &&
            role === 'Project Manager' && (
              <>
                <EditTeammate user={record} idProject={idProject} />
                <DeleteTeammate
                  user_name={record.user_name}
                  idProject={idProject}
                />
              </>
            )}
        </Space>
      ),
    },
  ];

  return (
    <Spin
      tip="Loading..."
      size="large"
      spinning={loading}
      style={{ width: '100%', height: '100%' }}
    >
      {visible && (
        <ModalCheckProfileMember visible={true} setVisible={setVisible} />
      )}
      <div className="ctn source">
        <div className="header">
          <div className="header__search">
            <i>
              <BsSearch className="icon" />
            </i>
            {FilterByNameInput}
          </div>

          {isProjectOwner ? (
            <div className="header__add-teammate">
              <ModalAddTeammate listTeammate={teammate} idProject={idProject} />
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="content">
          <Table dataSource={teammate} columns={columns} />
        </div>
      </div>
    </Spin>
  );
};

export default TeammateFeature;
