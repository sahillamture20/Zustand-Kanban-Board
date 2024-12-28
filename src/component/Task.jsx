/* eslint-disable react/prop-types */
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

    return (
    <div className="task">
        <div>{task.title}</div>
        <div className="bottomWrapper">
            <button onClick={handleDelete}>Delete</button>
            <div className='status'>{task.state}</div>
        </div>
    </div>
)
}