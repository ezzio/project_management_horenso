import React, {useState, useRef, useEffect} from 'react';
import { TiEquals } from 'react-icons/ti';

function DragNDrop({data}) {

    const [list, setList] = useState(data);
    const [dragging, setDragging] = useState(false);

    useEffect(() => {
        setList(data);
    }, [setList, data]);

    const dragTask = useRef();
    const dragNode = useRef();

    const handleDragStart = (e, task) => {
        console.log('drag starting...', task);

        dragNode.current = e.target;
        dragNode.current.addEventListener('dragend',handleDragEnd);
        dragTask.current = task;

        setTimeout(() => {
            setDragging(true);
        },0)
    }

    const handleDragEnter = (e, targetTask) => {
        console.log('Entering a drag target', targetTask);
        if (dragNode.current !== e.target) {
            console.log('Target is not the same!')
            setList(oldList => {
                let newList = JSON.parse(JSON.stringify(oldList))
                newList[targetTask.cIndex].tasks.splice(targetTask.taskIndex, 0, newList[dragTask.current.cIndex].tasks.splice(dragTask.current.taskIndex,1)[0])
                dragTask.current = targetTask;
                localStorage.setItem('List', JSON.stringify(newList));
                return newList
                
            })
        }
    }

    const handleDragEnd = (e) => {
        setDragging(false);
        dragTask.current = null;
        dragNode.current.removeEventListener('dragend',handleDragEnd);
        dragNode.current = null;
    }

    const getStyles = (task) => {
        if (dragTask.current.cIndex === task.cIndex && dragTask.current.taskIndex === task.taskIndex) {
            return 'current task-detail'
        }
        return 'task-detail'
    }

    if (list) { 
        return (
        <div className="ctn kanban">
            {list.map((c, cIndex) => (
            <div
            key={c.column}
            onDragEnter={dragging && !c.tasks.length?(e) => handleDragEnter(e,{cIndex, taskIndex: 0}):null}
            className="kanban-board"
            >
                    <div className="work-flow">
                        <p className="work-flow-task-infomation">{c.column}</p>
                        {c.tasks.map((task, taskIndex) => (
                            <div
                            draggable
                            key={task}
                            onDragStart={(e) => handleDragStart(e, {cIndex, taskIndex})}
                            onDragEnter={dragging?(e) => {handleDragEnter(e, {cIndex, taskIndex})}:null}
                            className={dragging?getStyles({cIndex, taskIndex}):"task-detail"}
                            >
                                <div className="task-header">
                                    <p className="task-header__name">{task.name}</p>
                                    <span>
                                        <a href="" className="task-header__more">...</a>
                                    </span>
                                </div>
                                <div className="task-content">
                                    {task.members.map((m) => (
                                        <img src={m.avt} className="task-content__member" height="25" width="25"></img>
                                    ))}
                                    <p className="task-content__time">{task.time} h</p>
                                </div>
                            </div>
                        ))}
                    <div className="work-flow-footer">
                        <a href="">+Add new task</a>
                    </div>
                </div>
            </div>
            ))}
        </div>
        )
    } else { return null}

}

export default DragNDrop;