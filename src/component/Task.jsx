/* eslint-disable react/prop-types */
import classNames from "classnames";
import { useStore } from "../store";
import "./Task.css"

export default function Task({ title }) {
    const task = useStore((store) => store.tasks.find(task => task.title === title));

    const deleteTask = useStore((store) => store.deleteTask);

    const handleDelete = () => {
        // console.log('delete button clicked');
        // console.log(task.title);
        deleteTask(task.title);
    }

    const setDraggedTask = useStore((store) => store.setDraggedTask)

    return (
    <div className="task" draggable onDragStart={() => {setDraggedTask(task.title)}}>
        <div>{task.title}</div>
        <div className="bottomWrapper">
            <button onClick={handleDelete}>Delete</button>
            <div className={classNames('status', task.state)}>{task.state}</div>
        </div>
    </div>
)
}