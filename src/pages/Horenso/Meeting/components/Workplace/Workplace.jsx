import React from "react";
import propTypes from "prop-types";
import { HiStatusOnline, HiStatusOffline } from "react-icons/hi";
import "./Workplace.scss";
import { Link, useParams } from "react-router-dom";
// import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { Empty, Button } from "antd";
import moment from "moment";

const Workplace = ({ room, setIsModalVisible = { setIsModalVisible } }) => {
  const { idProject } = useParams();

  console.log(room);
  let current = moment();

  return (
    <>
      {room.length >= 1 ? (
        <div className="workplace">
          {room.map((x) => {
            return (
              <>
                {current.isBetween(x.duration[0], x.duration[1]) ? (
                  <div
                    onClick={() => {
                      window.location.replace(
                        `http://localhost:3000/${idProject}/meeting/123`
                      );
                    }}
                  >
                    <div className="workplace__room">
                      <div className="name">{x.name}</div>
                      <div className="dropdown">
                        <div className="description">
                          <b>Mô tả</b>
                          <div>
                            <p>{x.description}</p>
                          </div>
                        </div>
                        <div className="info">
                            <>
                              <p>Bắt đầu lúc: {x.startTime}</p>
                              <div className="status status--online">
                                <HiStatusOnline className="icon" />
                                Online
                              </div>
                            </>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="workplace__room">
                    <div className="name">{x.name}</div>
                    <div className="dropdown">
                      <div className="description">
                        <b>Mô tả</b>
                        <div>
                          <p>{x.description}</p>
                        </div>
                      </div>
                      <div className="info">
                          <>
                            <p>Bắt đầu sau: 2 ngày 19 phút</p>
                            <div className="status status--offline">
                              <HiStatusOffline className="icon" />
                              Offline
                            </div>
                          </>
                      </div>
                    </div>
                  </div>
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
