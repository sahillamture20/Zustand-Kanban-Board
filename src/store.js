import { create } from "zustand";

const store = (set) => ({
  tasks: [{ title: "Test Task", state: "DONE" }],
  
  /*Fix: By wrapping the updated state in parentheses or explicitly defining it as an object ({}),
    you ensure that set receives the correct updated state.*/
  addTask: (title, state) =>
    set((store) => ({ tasks: [...store.tasks, { title, state }] })),
  deleteTask: (title) =>
    set((store) => ({ tasks: store.tasks.filter((task) => task.title !== title) })),
});

export const useStore = create(store);
