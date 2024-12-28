import { create } from "zustand";

const store = (set) => ({
  tasks: [{ title: "Test Task", state: "DONE" }],
  draggedTask: null,
  
  /*Fix: By wrapping the updated state in parentheses or explicitly defining it as an object ({}),
    you ensure that set receives the correct updated state.*/
  addTask: (title, state) =>
    set((store) => ({ tasks: [...store.tasks, { title, state }] })),
  deleteTask: (title) =>
    set((store) => ({ tasks: store.tasks.filter((task) => task.title !== title) })),
   setDraggedTask : (title) => set({ draggedTask: title}),
   moveTask: (title, state) => set((store) => ({
    tasks: store.tasks.map((task) =>
      task.title === title ? {title, state } : task
    )
   }))
}); 

export const useStore = create(store);
