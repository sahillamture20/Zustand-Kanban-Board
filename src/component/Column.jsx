/* eslint-disable react/prop-types */
import { shallow } from "zustand/shallow";
import { useStore } from "../store";
import "./Column.css";
import Task from "./Task";
import { useState, useMemo } from "react";
import classNames from "classnames";

export default function Column({ state }) {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false); //to check whether we can drop the task in onto specific column

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
  const setDraggedTask = useStore((store) => store.setDraggedTask); 
  const draggedTask = useStore((store) => store.draggedTask);
  const moveTask = useStore((store) => store.moveTask);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleInput = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(text, state);
    setText("");
    setOpen(false);
  };
  return (
    <div 
        className={classNames("column", {drop: drop})}
        onDragOver={(e) => {
            setDrop(true);
            e.preventDefault()}}
        onDragLeave={(e) => {
            setDrop(false);
            e.preventDefault()}}
        onDrop={() => {
            setDrop(false);
            setDraggedTask(null);
        // console.log(draggedTask)
            moveTask(draggedTask, state);
    }
        }
    >
      <div className="titleWrapper">
        <p>{state}</p>
        <button onClick={handleOpen}>Add</button>
      </div>
      {filteredTasks.map((task) => (
        <Task key={task.title} title={task.title} />
      ))}
      {open && (
        <div className="Modal">
          <div className="modalContent">
            <input type="text" value={text} onChange={handleInput} />
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
}
