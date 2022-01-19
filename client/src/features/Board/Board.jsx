import React from 'react';
import HeaderBoard from 'features/HeaderBoard/HeaderBoard';
import Column from 'features/Column/Column';
import ModalNewTask from 'features/Board/ModalNewTask';
import './Board.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { fetchBoard, setChangeColumnDone } from './boardSlice';
import { Spin } from 'antd';

const Board = (props) => {
  const { idBoard } = useParams();

  const [modalOpen, setModalOpen] = React.useState(false);
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.board.listTask);
  const changeColumnDone = useSelector((state) => state.board.changeColumnDone);
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
    if (changeColumnDone && !loading) {
      console.table({ columns, idBoard });
      dispatch(setChangeColumnDone(false));
    }
  }, [changeColumnDone, loading]);

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
          title="Design UI Home Page"
          status="Active"
          level="Medium"
          startTime="10/08/2021"
          endTime="21/12/2022"
        />
        <div>
          <ModalNewTask
            jobowner={idBoard}
            modalOpen={modalOpen}
            closeModal={closeModal}
            members={members}
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
