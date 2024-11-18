import React, { useState } from "react";
import Swal from "sweetalert2";
import TodoForm from "../Component/TodoForm";
import ToDoList from "../Component/ToDOList";
import DateTime from "../Component/DateTime";

export const ToDo = () => {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [searchTerm, setSearchTerm] = useState("");

  const handleClear = () => {
    if (tasks.length === 0) {
      Swal.fire({
        title: "Error!",
        text: "No tasks to clear.",
        icon: "error",
      });
      return;
    }
    Swal.fire({
      title: "Are you sure you want to clear all?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Clear it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setTasks([]);
        Swal.fire({
          title: "Cleared!",
          text: "Your task has been Cleared.",
          icon: "success",
        });
      }
    });
  };

  // Save tasks to localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Filter tasks based on the search term
  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="h-full bg-gray-100 p-4">
      <header className="text-center py-8 text-3xl font-bold text-gray-800">
        ToDo List
      </header>
      <DateTime />

      {/* Search Input */}
      <div className="flex justify-center items-center mt-8 mb-2">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <TodoForm tasks={tasks} setTasks={setTasks} />

      {/* Filtered Task List */}
      <section className="mt-8">
        <ul className="flex flex-col items-center text-justify">
          {filteredTasks.map((task, index) => (
            <ToDoList
              key={index}
              task={task}
              index={index}
              tasks={tasks}
              setTasks={setTasks}
            />
          ))}
        </ul>
      </section>

      <section className="flex justify-center items-center mt-8">
        <div className="flex justify-center items-center">
          <button
            className="bg-red-600 px-3 py-3 text-white rounded-md"
            onClick={handleClear}
          >
            Clear All
          </button>
        </div>
      </section>
    </section>
  );
};
