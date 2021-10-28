import React from "react";
import HeaderBoard from "features/HeaderBoard/HeaderBoard";
import Column from "features/Column/Column";
import ModalNewTask from "features/Board/ModalNewTask";
import "./Board.scss";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { automaticChangeStatusTask, updateOnDnd } from "./boardSlice";
import { useEffect } from "react";

const Board = (props) => {
  // ----------------------
  // URL Router


  // ----------------------

  // ---------------------->
  // Automatic Change Status Task
  useEffect(() => {
    dispatch(automaticChangeStatusTask());
  });
  // <----------------------

  const [modalOpen, setModalOpen] = React.useState(false);
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.board.columns);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  }

  const dispatch = useDispatch();
  const columns = useSelector((state) => state.board.columns);

  // ---------------------->
  // Automatic Change Status Task
  useEffect(() => {
    dispatch(automaticChangeStatusTask())
  });
  // <----------------------

  const members = [
    {
      avatar:
        "https://www.timeoutdubai.com/public/styles/full_img/public/images/2020/07/13/IMG-Dubai-UAE.jpg?itok=j4dmDDZa",
    },
    {
      avatar:
        "http://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg?w=144",
    },
    {
      avatar:
        "http://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg?w=144",
    },
    {
      avatar:
        "http://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg?w=144",
    },
    {
      avatar:
        "http://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg?w=144",
    },
  ];

  // const onDragEnd = (result) => {
  //   dispatch(updateOnDnd(result));
  // };
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
        <ModalNewTask modalOpen={modalOpen} closeModal={closeModal} />
      </div>
      {/* render column */}
      <div className="board-content">
       
          {columns.map((column) => {
            return <Column column={column} openModal={openModal} />;
          })}
    
      </div>
    </div>
  );
};

export default Board;
