import React from 'react';
import HeaderBoard from 'features/HeaderBoard/HeaderBoard';
import Column from 'features/Column/Column';
import ModalNewTask from 'features/Board/ModalNewTask';
import './Board.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import {
  automateChangeColAsync,
  fetchBoard,
  setChangeColumnDone,
} from './boardSlice';
import { Spin } from 'antd';
import moment from 'moment';

const Board = (props) => {
  const { idBoard } = useParams();

  const [modalOpen, setModalOpen] = React.useState(false);
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.board.listTask);
  const changeColumnDone = useSelector((state) => state.board.changeColumnDone);
  const jobInfo = useSelector((state) => state.board.jobInfo);
  const loading = useSelector((state) => state.board.loading);
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    dispatch(fetchBoard(idBoard));
  }, []);

  useEffect(() => {
    if (changeColumnDone) {
      dispatch(automateChangeColAsync({ columns, idBoard }));
      dispatch(setChangeColumnDone(false));
    }
  }, [changeColumnDone]);

  // <----------------------

  const members = useSelector((state) => state.board.memberInJob);

  return (
    <Spin
      tip="Loading..."
      size="large"
      spinning={loading}
      style={{ width: '100%', height: '100%' }}
    >
      <div className="ctn ctn-board" style={{ width: '100%', height: '100vh' }}>
        <HeaderBoard
          members={members}
          title={jobInfo.title}
          startTime={moment(jobInfo.start_time).format('YYYY-MM-DD')}
          endTime={moment(jobInfo.end_time).format('YYYY-MM-DD')}
        />
        <div>
          <ModalNewTask
            jobowner={idBoard}
            modalOpen={modalOpen}
            closeModal={closeModal}
            members={members}
            startTime={moment(jobInfo.start_time).format('YYYY-MM-DD')}
            endTime={moment(jobInfo.end_time).format('YYYY-MM-DD')}
          />
        </div>
        {/* render column */}
        <div className="board-content">
          {columns &&
            columns.map((column) => {
              return <Column column={column} openModal={openModal} />;
            })}
        </div>
      </div>
    </Spin>
  );
};

export default Board;
