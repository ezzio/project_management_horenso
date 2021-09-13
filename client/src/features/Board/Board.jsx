import React, { useEffect, useRef, useState } from 'react';
import HeaderBoard from 'features/HeaderBoard/HeaderBoard';
import Column from 'features/Column/Column';
import './Board.scss';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { updateOnDnd } from './boardSlice';

const Board = (props) => {
  const columns = useSelector((state) => state.board.columns);

  const dispatch = useDispatch();

  const members = [
    {
      avatar:
        'https://www.timeoutdubai.com/public/styles/full_img/public/images/2020/07/13/IMG-Dubai-UAE.jpg?itok=j4dmDDZa',
    },
    {
      avatar:
        'http://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg?w=144',
    },
    {
      avatar:
        'http://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg?w=144',
    },
    {
      avatar:
        'http://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg?w=144',
    },
    {
      avatar:
        'http://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg?w=144',
    },
  ];

  const onDragEnd = (result) => {
    dispatch(updateOnDnd(result));
  };
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

      {/* render column */}
      <div className="board-content">
        <DragDropContext onDragEnd={onDragEnd}>
          {columns.map((column) => {
            return <Column column={column} />;
          })}
        </DragDropContext>
      </div>
    </div>
  );
};

export default Board;
