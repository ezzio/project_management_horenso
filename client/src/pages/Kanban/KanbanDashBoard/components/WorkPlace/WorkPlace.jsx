import React from "react";
import { BiCheck } from "react-icons/bi";
import { BsPeopleCircle } from "react-icons/bs";
import "./WorkPlace.scss";
import PropTypes from "prop-types";
import { GrAdd } from "react-icons/gr";

function WorkPlace(props) {
  const { title, level, chart, members } = props;

  return (
    <div className="container">
      <div className="container__working">
        <div className="container__working__title">
          <p>Task Working</p>
          <button className="button-add">
            <GrAdd />
          </button>
        </div>
        <div className="container__working__task">
          <section className="container__working__task__title">
            <p>{title}</p>
          </section>
          <section className="content">
            <div
              className={
                level === "hard"
                  ? "hard"
                  : level === "medium"
                  ? "medium"
                  : "low"
              }
            >
              {level}
            </div>
          </section>
        </div>
      </div>

      <div className="container__complete">
        <div className="container__complete__title">
          <p>Complete</p>
          <button>Hide</button>
        </div>
        <div className="container__complete__task">
          <div className="name">
            <BiCheck className="icon" />
            <p>Chatting</p>
          </div>
          <div className="content">
            <div>
              <p>Short term</p>
            </div>

            <div>
              <p>$$$</p>
              <BsPeopleCircle className="icon" />
            </div>
          </div>
        </div>
        <div className="container__complete__task">
          <div className="name">
            <BiCheck className="icon" />
            <p>Video Call</p>
          </div>
          <div className="content">
            <div>
              <p>Long term</p>
            </div>

            <div>
              <p>$$$</p>
              <BsPeopleCircle className="icon" />
            </div>
          </div>
        </div>
        <div className="container__complete__task">
          <div className="name">
            <BiCheck className="icon" />
            <p>Horenso</p>
          </div>
          <div className="content">
            <div>
              <p>23.07.2021</p>
            </div>

            <div>
              <p>$$</p>
              <BsPeopleCircle className="icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

WorkPlace.propTypes = {
  title: PropTypes.string,
  level: PropTypes.string,
  chart: PropTypes.string,
  members: PropTypes.array,
};

export default WorkPlace;
