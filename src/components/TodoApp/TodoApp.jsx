import { useEffect, useState } from "react";

export default function TodoApp() {

    const [task, setTask] = useState("");
    const [filters, setFilters] = useState("all");
    const [taskData, setTaskData] = useState(() => {
        const storedVal = JSON?.parse(localStorage?.getItem("task"));
        return storedVal ? storedVal : []
    });


    const handleSubmit = (e) => {
        e?.preventDefault();

        if (!task) return;

        const modifyTask = {
            id: Date?.now(),
            task,
            completed: false
        }
        setTaskData(task => [...task, modifyTask]);
        setTask("");
    }

    const toggleTask = (id) => {
        setTaskData(taskData?.map(task => task?.id === id ? { ...task, completed: !task?.completed } : task));
    }

    const taskDelete = (id) => {
        const deleteItem = taskData?.filter(item => item?.id !== id);
        setTaskData(deleteItem);
        alert("Task Deleted ✅")
    }

    const filtersTaskList = taskData?.filter(task => {
        if(filters === "completed") return task?.completed;
        if(filters === "incomplete") return !task?.completed;
        return true
    })

    useEffect(() => {
        localStorage?.setItem("task", JSON?.stringify(taskData));
    }, [task, taskData]);

    console.log(taskData)

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-300 to-blue-200 flex items-center justify-center p-4">
            <div className="max-w-lg w-full bg-white shadow-2xl rounded-2xl p-6">
                <h1 className="text-2xl font-bold text-center mb-6">📝 My To-Do List</h1>

                {/* Add Task Input */}
                <form action="#" onSubmit={handleSubmit}>
                    <div className="flex gap-2 mb-4">
                        <input
                            type="text"
                            placeholder="Add a new task..."
                            value={task}
                            id="task"
                            name="task"
                            onChange={(e) => setTask(e?.target?.value)}
                            className="flex-1 border border-gray-300 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-xl transition">
                            Add
                        </button>
                    </div>
                </form>

                {/* Filters */}
                <div className="flex justify-center gap-2 mb-4">
                    <button onClick={() => setFilters("all")} className={`border border-gray-300 px-3 py-1 rounded-full hover:bg-gray-100 ${filters === "all" ? "bg-gray-200" : "hover:bg-gray-100"}`}>
                        All
                    </button>
                    <button onClick={() => setFilters("completed")} className={`border border-gray-300 px-3 py-1 rounded-full hover:bg-gray-100 ${filters === "completed" ? "bg-gray-200" : "hover:bg-gray-100"}`}>
                        Completed
                    </button>
                    <button onClick={() => setFilters("incomplete")} className={`border border-gray-300 px-3 py-1 rounded-full hover:bg-gray-100 ${filters === "incomplete" ? "bg-gray-200" : "hover:bg-gray-100"}`}>
                        Incomplete
                    </button>
                </div>

                {/* Task List */}
                <ul className="space-y-3">
                    {/* Task Item */}
                    {filtersTaskList?.length > 0 ? filtersTaskList?.map(item => {
                        return (
                            <li key={item?.id} className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-xl">
                                <span className={`${item?.completed ? "line-through text-gray-400" : "text-gray-800"}`}>{item?.task}</span>
                                <div className="flex gap-2">
                                    <button className="text-green-600 hover:text-green-800 text-xl" onClick={() => toggleTask(item?.id)}>✔</button>
                                    <button className="text-red-600 hover:text-red-800 text-xl" onClick={() => taskDelete(item?.id)}>🗑</button>
                                </div>
                            </li>
                        )
                    }) : <div className="text-center mt-3">
                        <h1>No Tasks Found!</h1>
                    </div>}

                </ul>
            </div>
        </div>
    );
}
