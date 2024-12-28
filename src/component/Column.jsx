/* eslint-disable react/prop-types */
import { shallow } from "zustand/shallow";
import { useStore } from "../store";
import "./Column.css";
import Task from "./Task";
import { useState, useMemo } from "react";

export default function Column({ state }) {
    const [text, setText] = useState('');
    const [open, setOpen] = useState(false)

  const tasks = useStore((store) => store.tasks, shallow);
//   console.log(tasks)
//   console.log(tasks.length)

  // Memoize filtered tasks
  const filteredTasks = useMemo(
    () => tasks.filter((task) => task.state === state),
    [tasks, state]
  );
//   console.log(filteredTasks)

  const addTask = useStore((store) => store.addTask);
  const handleOpen = () => {
    setOpen(true);
  }
  const handleInput = (e) => {
    setText(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(text, state);
    setText('');
    setOpen(false);
  }
  return (  
    <div className="column">
        <div className="titleWrapper">
            <p>{state}</p>
            <button onClick={handleOpen}>Add</button>
        </div>
      {filteredTasks.map((task) => (
        <Task key={task.title} title={task.title} />
      ))}
      {
        open && (
            <div className="Modal">
                <div className="modalContent">
                    <input type="text" value={text} onChange={handleInput} />
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        )
      }
    </div>
  );
}