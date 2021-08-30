import React, { useEffect, useRef, useState } from 'react';
import HeaderBoard from 'features/HeaderBoard/HeaderBoard';
import Column from 'features/Column/Column';
import './Board.scss';
import { BsPlusCircleFill } from 'react-icons/bs';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
const Board = (props) => {
  const columns = [
    { id_column: 0, title: 'Backlog', tasks: [{
      id: 0, title: 'This is the title of task', 
    }] },
    { id_column: 1, title: 'In process' },
    { id_column: 2, title: 'Review' },
    { id_column: 3, title: 'Completed' },
  ];

  const tasks = [{}];

  const members = [
    {
      avatar:
        'https://www.timeoutdubai.com/public/styles/full_img/public/images/2020/07/13/IMG-Dubai-UAE.jpg?itok=j4dmDDZa',
    },
    {
      avatar:
        'http://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg?w=144',
    },
  ];

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
        {columns.map((column) => {
          return <Column column={column} numberOfTasks={columns.length} />;
        })}
      </div>
    </div>
  );
};

export default Board;
