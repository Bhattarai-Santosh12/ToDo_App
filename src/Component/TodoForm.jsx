import React, { useState } from 'react';

const TodoForm = ({ tasks, setTasks }) => {
    const [todos, setTodos] = useState("");

    const handleInputChange = (value) => {
        setTodos(value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
    
        const trimmedTodo = todos.trim();
        if (!trimmedTodo) return;
        if (tasks.some((task) => task.name === trimmedTodo)) {
            setTodos("");
            return;
        }
    
        setTasks((prev) => [...prev, { name: trimmedTodo, completed: false }]);
        setTodos("");
    };

    return (
        <section className="flex justify-center items-center">
            <form className="w-full max-w-md" onSubmit={handleFormSubmit}>
                <div className="mb-4">
                    <input
                        type="text"
                        autoComplete="off"
                        placeholder="Add Task"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        value={todos}
                        onChange={(e) => handleInputChange(e.target.value)}
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none transition duration-200 hover:bg-violet-600"
                    >
                        Add Task
                    </button>
                </div>
            </form>
        </section>
    );
};

export default TodoForm;