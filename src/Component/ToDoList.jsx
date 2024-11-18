import { FaCheckCircle, FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";

// Change the props structure to receive task instead of currElem
const ToDoList = ({ task, index, tasks, setTasks }) => {
    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                const newTasks = tasks.filter((_, i) => i !== index);
                setTasks(newTasks);
                Swal.fire("Deleted!", "Your task has been deleted.", "success");
            }
        });
    };

    const handleComplete = () => {
        setTasks((prev) =>
            prev.map((t, i) =>
                i === index ? { ...t, completed: !t.completed } : t
            )
        );
    };

    const handelEdit= ()=>{
        Swal.fire({
            title: "Edit Task",
            input: "text",
            inputValue: task.name,
            showCancelButton: true,
            confirmButtonText: "Save",
            cancelButtonText: "Cancel",
            inputValidator: (value) => {
                if (!value) {
                    return "Please enter a task name";
                }
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const editedTask = result.value;
                setTasks((prev) =>
                    prev.map((t, i) =>
                        i === index ? { ...t, name: editedTask } : t
                    )
                );
                Swal.fire("Edited!", "Your task has been edited.", "success");
            }
        });
    }

    return (
        <li className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 w-full max-w-md mb-2">
            <span
                className={`text-gray-800 ${
                    task.completed ? "line-through text-gray-400" : ""
                }`}
            >
                {task.name}
            </span>
            <div className="flex space-x-2 text-2xl">
                <button
                    onClick={handleComplete}
                    className="text-green-500 hover:text-green-600"
                >
                    <FaCheckCircle />
                </button>
                <button onClick={handelEdit}
                className="text-blue-500 hover:text-blue-600 pl-1">
                    <FaRegEdit />
                    </button>
                <button
                    onClick={handleDelete}
                    className="text-red-500 hover:text-red-600"
                >
                    <MdDeleteForever />
                </button>
            </div>
        </li>
    );
};

export default ToDoList;