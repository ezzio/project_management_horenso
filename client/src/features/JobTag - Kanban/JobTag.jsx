import React from "react";
import PropTypes from "prop-types";
import ListMember from "./components/ListMember";
import './JobTag.scss';

const JobTag = (props) => {
  const { title, level, process, members } = props;

  return (
    <div className="ctn-job-task">
      <div className="ctn-job-task__title">
        <p>{title}</p>
      </div>
      <div className="ctn-job-task__process">
        <div
          className={
            level === "High" ? "high" : level === "Medium" ? "medium" : "low"
          }
          style={{ width: 'fit-content' }}
        >
          {level}
        </div>
      </div>

      <div className="ctn-job-task__process">
        <div className="background-process">
          <div className="process-work"
            style={{ width: process }}>
          </div>
        </div>
      </div>
      <div className="ctn-job-task__members">
        <ListMember members={members} />
        <button className="ctn-job-task__members__properties">...</button>
      </div>
    </div>
  );
};

JobTag.propTypes = {
  title: PropTypes.string,
  level: PropTypes.string,
  process: PropTypes.string,
  members: PropTypes.array,
};

export default JobTag;
