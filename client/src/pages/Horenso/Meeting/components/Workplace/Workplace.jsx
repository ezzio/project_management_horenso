import React from "react";
import propTypes from "prop-types";
import { HiStatusOnline, HiStatusOffline } from "react-icons/hi";
import "./Workplace.scss";
import { Link } from "react-router-dom";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
const Workplace = ({ room }) => {
  return (
    <>
      {room.length >= 1 ? (
        <div className="workplace">
          {room.map((x) => {
            return (
              <>
                {x.status ? (
                  <Link to="/meeting/id=291adw">
                    <div className="workplace__room">
                      <div className="name">{x.name}</div>
                      <div className="dropdown">
                        <div className="description">
                          <b>Mô tả</b>
                          <div>
                            <p>{x.decription}</p>
                          </div>
                        </div>
                        <div className="info">
                          {x.status ? (
                            <>
                              <p>Bắt đầu lúc: {x.timeStart}</p>
                              <div className="status status--online">
                                <HiStatusOnline className="icon" />
                                Online
                              </div>
                            </>
                          ) : (
                            <>
                              <p>Bắt đầu sau: 2 ngày 19 phút</p>
                              <div className="status status--offline">
                                <HiStatusOffline className="icon" />
                                Offline
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="workplace__room">
                    <div className="name">{x.name}</div>
                    <div className="dropdown">
                      <div className="description">
                        <b>Mô tả</b>
                        <div>
                          <p>{x.decription}</p>
                        </div>
                      </div>
                      <div className="info">
                        {x.status ? (
                          <>
                            <p>Bắt đầu lúc: {x.timeStart}</p>
                            <div className="status status--online">
                              <HiStatusOnline className="icon" />
                              Online
                            </div>
                          </>
                        ) : (
                          <>
                            <p>Bắt đầu sau: 2 ngày 19 phút</p>
                            <div className="status status--offline">
                              <HiStatusOffline className="icon" />
                              Offline
                            </div>
                          </>
                        )}
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
          <h1>Hiện tại dự án chưa có cuộc họp nào.</h1>
          <p>
            Để bất đầu cuộc hợp mới nhấp vào <b>Cuộc họp mới</b>
          </p>
          <button className="creator__new-room">
            <AiOutlineVideoCameraAdd className="icon" />
            Cuộc họp mới
          </button>
        </div>
      )}
    </>
  );
};

Workplace.propTypes = {
  room: propTypes.array,
};

export default Workplace;
