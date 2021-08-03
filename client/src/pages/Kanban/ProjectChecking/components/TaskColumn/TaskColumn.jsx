import "./TaskColumn.scss";
// import TaskDetail from "../TaskDetail/TaskDetail.jsx";
import DragNDrop from './DragNDrop';
function TaskColumn() {
    const data = [
        {
        column: 'Todo',
        tasks: [
            {id: 1, name: "Design Homepage", member: "Nhut", time: "01:25:15",},
            {id: 2, name: "Design Kanban page", member: "Thang", time: "00:45:20"},
        ],
    },
    {
        column: 'On hold',
        tasks: [
            {id: 3, name: "Design login page", member: "Minh", time: "02:00:01"},
        ],
    },
    {
        column: 'In progress',
        tasks:[
            {id: 4, name: "Design Meeting page", member: "Nguyen", time: "00:10:48"}
        ],
    },
    {
        column: 'Done',
        tasks: [
            {id: 5, name: "Design Report page", member: "Khoa", time: "03:44:12"},
            {id: 6, name: "Design signup page", member: "Mih", time: "00:48:48"}

        ],
    },
]
    return (
        <DragNDrop data={data}/>
    );
}

export default TaskColumn;