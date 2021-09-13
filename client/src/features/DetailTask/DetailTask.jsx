import React from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import './DetailTask.scss';
import ReactLightCalendar from '@lls/react-light-calendar';
import '@lls/react-light-calendar/dist/index.css';

const DetailTask = (props) => {
  const dataChart = {
    labels: ['Completed', 'Not Completed'],
    datasets: [
      {
        label: '# of Votes',
        data: [2, 5],
        backgroundColor: ['hsl(215, 92%, 64%)', '#ccc'],
      },
    ],
  };

  const start = new Date('09/1/2021');
  const end = new Date('09/20/2021');
  const startDate = start.setDate(start.getDate() + 1);
  const endDate = end.setDate(end.getDate() + 1);

  return (
    <div className="detail-task">
      <div className="detail-task__info">
        <div className="detail-task__info__base">
          <div className="detail-task__info__base__1st">
            <h2>This is the title</h2>
            <div className="info-base-2">
              <p className="high">High</p>
              <div>
                <img
                  src="https://cdn.dribbble.com/users/4678459/avatars/small/88a2db85e21304f897bbed9082ad002c.jpeg?1623237647"
                  alt="avatar"
                  height="40"
                  width="40"
                />
                <img
                  src="https://cdn.dribbble.com/users/4678459/avatars/small/88a2db85e21304f897bbed9082ad002c.jpeg?1623237647"
                  alt="avatar"
                  height="40"
                  width="40"
                />
              </div>
            </div>
            <div className="info-base-3">
              <p>
                React is a free and open-source front-end JavaScript library for
                building user interfaces or UI components. It is maintained by
                Facebook and a community of individual developers and companies.
                React can be used as a base in the development of single-page or
                mobile applications. Wikipedia
              </p>
            </div>
            <div className="info-base-4">
              <div className="info-base-4__chart">
                <h4 style={{ width: 'fit-content' }}>Task Progress</h4>
                <Doughnut
                  className="chart"
                  data={dataChart}
                  options={{
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            </div>
          </div>
          <div className="detail-task__info__base__2nd">
            <h4 style={{ width: 'fit-content' }}>Task Calendar</h4>
            <ReactLightCalendar startDate={startDate} endDate={endDate} />
          </div>
        </div>
        <div className="detail-task__info__task-inside">
          <table className="task-inside__table">
            <thead style={{ textAlign: 'left' }}>
              <tr>
                <th style={{ width: '40%' }}>Task</th>
                <th style={{ width: '30%' }}>Team</th>
                <th style={{ width: '30%' }}>Assigned on</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="checkbox" style={{ marginRight: '1rem' }} />
                  <b>Do something for this assignment</b>
                </td>
                <td>
                  <img
                    src="https://cdn.dribbble.com/users/4678459/avatars/small/88a2db85e21304f897bbed9082ad002c.jpeg?1623237647"
                    alt="avatar"
                    height="40"
                    width="40"
                    style={{ borderRadius: '50%' }}
                  />
                </td>
                <td>
                  <p>August 19, 1975 23:15:30</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="detail-task__conversation">
        <div className="detail-task__conversation__title">
          <h2>Team chat</h2>
        </div>
        <div className="detail-task__conversation__chat">
          <div className="detail-task__conversation__chat__box"></div>
          <div className="detail-task__conversation__chat__field">
            <input type="text" placeholder="text here..."/>
            <button>SEND</button>
          </div>
        </div>
      </div>
    </div>
  );
};

DetailTask.propTypes = {};

export default DetailTask;
