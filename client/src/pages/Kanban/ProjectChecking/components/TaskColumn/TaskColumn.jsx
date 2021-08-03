import React, {useEffect, useState} from 'react';
import "./TaskColumn.scss";
// import TaskDetail from "../TaskDetail/TaskDetail.jsx";   
import DragNDrop from './DragNDrop';

const defaultData = [
    {
        column: 'Todo',
        tasks: [
            {id: 1, name: "Design Homepage", members: ["https://assets.dragoart.com/images/11939_501/how-to-draw-iron-man-easy_5e4c9ed9b16b58.14188289_53732_3_3.png","https://www.lego.com/cdn/cs/set/assets/blt6c65eb54dc9fb50e/DC_-_Character_-_Details_-_Sidekick-Standard_-_Superman.jpg?fit=crop&format=jpg&quality=80&width=800&height=426&dpr=1"], time: "01:25:15",},
            {id: 2, name: "Design Kanban page", members: ["https://assets.dragoart.com/images/11936_501/how-to-draw-the-hulk-easy_5e4c9ed54f0961.01775384_53717_3_3.gif"], time: "00:45:20"},
        ],
    },

    {
        column: 'On hold',
        tasks: [
            {id: 3, name: "Design login page", members: ["https://assets.dragoart.com/images/11950_501/how-to-draw-thor-easy_5e4c9ee5809626.24452201_53780_3_3.gif"], time: "02:00:01"},
        ],
    },

    {
        column: 'In progress',
        tasks:[
            {id: 4, name: "Design Meeting page", members: ["https://assets.dragoart.com/images/11949_501/how-to-draw-captain-america-easy_5e4c9ee3d3b908.80110627_53770_3_3.gif"], time: "00:10:48"}
        ],
    },
    
    {
        column: 'Done',
        tasks: [
            {id: 5, name: "Design Report page", members: ["https://kienthuctonghop.vn/wp-content/uploads/2021/03/weeaboo-la-gi.jpg"], time: "03:44:12"},
            {id: 6, name: "Design signup page", members: ["https://s3-ap-southeast-1.amazonaws.com/images.spiderum.com/sp-images/e9fef2d083cf11ea8f996dbfbe6e50b1.jpg"], time: "00:48:48"}

        ],
    },
]

function TaskColumn() {
    const [data, setData] = useState();  
    useEffect(() => {
    if (localStorage.getItem('List')) {
        console.log(localStorage.getItem('List'))
        setData(JSON.parse(localStorage.getItem('List')))
    } else {
        setData(defaultData)
    }
    }, [setData])

    return (
        <DragNDrop data={data} />
    );
}

export default TaskColumn;