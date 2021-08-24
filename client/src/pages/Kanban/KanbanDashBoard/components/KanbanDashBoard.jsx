import JobTag from "features/JobTag - Kanban/JobTag";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./KanbanDashBoard.scss";
import ModalAddJob from "./ModalAddJob/ModalAddJob";

const KanbanDashBoard = () => {

  const [showModal, setShowModal] = useState(false);
  const [showCompleteTask, setShowCompleteTask] = useState(true);

  const jobs = [{
    id_job: 0,
    name: 'Important feature fix',
    process: '12%',
    level: 'High',
    is_completed: true,
    members: [
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://labhouse.vn/Content/ImageUpload/LAB/dlgECMSItem/163/avatar6%20(1).png",
      "https://anest.dev/assets/images/avatar.png",
      "https://cdn5.vectorstock.com/i/1000x1000/25/54/businessman-profile-ico-vector-20022554.jpg",
      "https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59094701-stock-illustration-businessman-profile-icon.jpg",
      "https://img0-placeit-net.s3-accelerate.amazonaws.com/uploads/stage/stage_image/17786/optimized_large_thumb_stage.jpg",
    ],
  },
  {
    id_job: 1,
    name: 'Important feature fix',
    process: '30%',
    level: 'Medium',
    is_completed: false,
    members: [
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://labhouse.vn/Content/ImageUpload/LAB/dlgECMSItem/163/avatar6%20(1).png",
      "https://anest.dev/assets/images/avatar.png",
      "https://cdn5.vectorstock.com/i/1000x1000/25/54/businessman-profile-ico-vector-20022554.jpg",
      "https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59094701-stock-illustration-businessman-profile-icon.jpg",
      "https://img0-placeit-net.s3-accelerate.amazonaws.com/uploads/stage/stage_image/17786/optimized_large_thumb_stage.jpg",
    ],
  }, {
    id_job: 2,
    name: 'Horenso',
    process: '50%',
    level: 'Low',
    is_completed: false,
    members: [
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://labhouse.vn/Content/ImageUpload/LAB/dlgECMSItem/163/avatar6%20(1).png",
      "https://anest.dev/assets/images/avatar.png",
      "https://cdn5.vectorstock.com/i/1000x1000/25/54/businessman-profile-ico-vector-20022554.jpg",
      "https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59094701-stock-illustration-businessman-profile-icon.jpg",
      "https://img0-placeit-net.s3-accelerate.amazonaws.com/uploads/stage/stage_image/17786/optimized_large_thumb_stage.jpg",
    ],
  }, {
    id_job: 3,
    name: 'Kanban',
    process: '12%',
    level: 'High',
    is_completed: false,
    members: [
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://labhouse.vn/Content/ImageUpload/LAB/dlgECMSItem/163/avatar6%20(1).png",
      "https://anest.dev/assets/images/avatar.png",
      "https://cdn5.vectorstock.com/i/1000x1000/25/54/businessman-profile-ico-vector-20022554.jpg",
      "https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59094701-stock-illustration-businessman-profile-icon.jpg",
      "https://img0-placeit-net.s3-accelerate.amazonaws.com/uploads/stage/stage_image/17786/optimized_large_thumb_stage.jpg",
    ],
  },
  ]


  return (
    <>
      {showModal && <ModalAddJob />}
      <div className="ctn-kanbandashboard">
        <div className="ctn-kanbandashboard__working">
          <div className="ctn-kanbandashboard__working__title">
            <h1 className="title">Jobs On Working</h1>
            <button className="add-task-button"
              onClick={() => setShowModal(true)}
            >
              Add new
            </button>
          </div>
          <div className="ctn-kanbandashboard__working__content">
            {jobs.map(job => {
              if (!job.is_completed)
                return (
                  <JobTag
                    title={job.name}
                    level={job.level}
                    process={job.process}
                    members={job.members}
                  />
                );
            })}


          </div>
        </div>
        <div className="ctn-kanbandashboard__complete">
          <div className="ctn-kanbandashboard__complete__title">
            <h1 className="title">Complete</h1>
            <button className="btn-show-hide"
              onClick={() => setShowCompleteTask(!showCompleteTask)}
            >
              {showCompleteTask ? 'Hide' : 'Show'}
            </button>
          </div>
          {showCompleteTask && <CompleteTask jobs={jobs} />}
        </div>
      </div>
    </>
  );
};

export default KanbanDashBoard;

const CompleteTask = ({ jobs }) => {
  return (
    <div className="ctn-kanbandashboard__complete__content">
      {jobs.map(job => {
        if (job.is_completed)
          return (
            <JobTag
              title={job.name}
              level={job.level}
              process={job.process}
              members={job.members}
            />
          );
      })}
    </div>
  );
}