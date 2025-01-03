import { create } from "zustand";
import { persist } from "zustand/middleware";

const store = (set) => ({
  tasks: [],
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

export const useStore = create(persist(store, {name: 'store'}));
