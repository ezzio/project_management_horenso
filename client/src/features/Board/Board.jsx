import React from 'react';
import HeaderBoard from 'features/HeaderBoard/HeaderBoard';
import Column from 'features/Column/Column';
import ModalNewTask from 'features/Board/ModalNewTask';
import './Board.scss';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import {
  automaticChangeStatusTask,
  fetchBoard,
  updateOnDnd,
} from './boardSlice';

const Board = (props) => {
  const { idBoard } = useParams();
  // Automatic Change Status Task
  useEffect(() => {
    // dispatch(automaticChangeStatusTask());
  });

  const [modalOpen, setModalOpen] = React.useState(false);
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.board.listTask);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // <----------------------

  // ---------------------->
  // Automatic Change Status Task
  useEffect(() => {
    // dispatch(automaticChangeStatusTask());
    dispatch(fetchBoard(idBoard));
  }, []);
  // <----------------------

  const members = useSelector((state) => state.board.memberInJob);

  return (
    <div className="ctn ctn-board">
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
  );
};

export default Board;
