import React, { useEffect } from "react";
import propTypes from "prop-types";
import { HiStatusOnline, HiStatusOffline } from "react-icons/hi";
import "./Workplace.scss";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { deleteMeetingRoom } from "../../MeetingSlice";
import { Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Menu, Dropdown } from "antd";
import { Empty, Button } from "antd";
import moment from "moment";

import { WebsitURl } from "api/configApi";

const Workplace = ({ room, setIsModalVisible = { setIsModalVisible } }) => {
  const { idProject, idRoom } = useParams();
  const dispatch = useDispatch();
  function cancel(e) {}
  const handleDeleteTask = (idRoom) => {
    // dispatch(deleteTaskAsync({ id: task.id, columnId, idBoard }));
    dispatch(deleteMeetingRoom({ idRoom: idRoom }));
  };

  const menu = (idRoom) => {
    return (
      <Menu>
        <Menu.Item key="1" danger icon={<DeleteOutlined />}>
          <Popconfirm
            title="Are you sure to delete this room ?"
            onConfirm={() => handleDeleteTask(idRoom)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            Remove
          </Popconfirm>
        </Menu.Item>
      </Menu>
    );
  };
  let current = moment();

  return (
    <>
      {room.length >= 1 ? (
        <div className="workplace">
          {room.map((x) => {
            return (
              <>
                {current.isBetween(x.duration[0], x.duration[1]) ? (
                  <Dropdown overlay={menu(x.id)} trigger={["contextMenu"]}>
                    <div
                      onClick={() => {
                        window.location.replace(
                          `${WebsitURl}/${idProject}/meeting/${x.id}`
                        );
                      }}
                    >
                      <div className="workplace__room">
                        <div className="name">{x.name}</div>
                        <div className="dropdown">
                          <div className="description">
                            <b>Description</b>
                            <div>
                              <p>{x.description}</p>
                            </div>
                          </div>
                          <div className="info">
                            <>
                              <p>Start at: {moment(x.startTime).format("MMMM Do, YYYY • h:mm:ss A")}</p>
                              <div className="status status--online">
                                <HiStatusOnline className="icon" />
                                Online
                              </div>
                            </>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dropdown>
                ) : (
                  <Dropdown overlay={menu(x.id)} trigger={["contextMenu"]}>
                    <div
                      onClick={() => {
                        window.location.replace(
                          `${WebsitURl}/${idProject}/meeting/${x.id}`
                        );
                      }}
                    >
                      <div className="workplace__room">
                        <div className="name">{x.name}</div>
                        <div className="dropdown">
                          <div className="description">
                            <b>Description</b>
                            <div>
                              <p>{x.description}</p>
                            </div>
                          </div>
                          <div className="info">
                            <>
                              <p>Start {moment(x.duration[0]).fromNow()}</p>
                              <div className="status status--offline">
                                <HiStatusOffline className="icon" />
                                Offline
                              </div>
                            </>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dropdown>
                )}
              </>
            );
          })}
        </div>
      ) : (
        <div className="creator">
          {/* <h1>Hiện tại dự án chưa có cuộc họp nào.</h1>
          <p>
            Để bất đầu cuộc hợp mới nhấp vào <b>Cuộc họp mới</b>
          </p>
          <button className="creator__new-room">
            <AiOutlineVideoCameraAdd
              className="icon"
              onClick={() => setIsModalVisible(true)}
            />
            Cuộc họp mới
          </button> */}
          <Empty description={<span>No meeting yet!</span>}>
            <Button type="primary" onClick={() => setIsModalVisible(true)}>
              Create Now
            </Button>
          </Empty>
        </div>
      )}
    </>
  );
};

Workplace.propTypes = {
  room: propTypes.array,
};

export default Workplace;
