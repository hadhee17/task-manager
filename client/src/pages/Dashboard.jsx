import { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TaskTable from "../components/TaskTable";
import { getTasks, addTask, updateTask, deleteTask } from "../services/api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const token = localStorage.getItem("token");

  // Fetch tasks
  const fetchTasks = useCallback(async () => {
    try {
      const { data } = await getTasks(token);
      setTasks(data || []);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch tasks");
    }
  }, [token]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Add task
  const handleAdd = async () => {
    if (!newTask.title || !newTask.description)
      return alert("Fill in both fields");
    try {
      await addTask(newTask, token);
      setNewTask({ title: "", description: "" });
      fetchTasks();
    } catch (err) {
      console.log(err);
      alert("Failed to add task");
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await deleteTask(id, token);
      fetchTasks();
    } catch (err) {
      console.log(err);
      alert("Failed to delete task");
    }
  };

  // Edit task
  const handleEdit = async (id, updatedTask) => {
    if (!updatedTask.title || !updatedTask.description) return;
    try {
      await updateTask(id, updatedTask, token);
      fetchTasks();
    } catch (err) {
      console.log(err);
      alert("Failed to update task");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 text-neutral-800">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">Tasks</h2>
          </div>
          <div className="bg-white p-5 rounded-lg border border-neutral-200 space-y-4">
            <h3 className="text-sm font-medium text-neutral-600">New Task</h3>
            <div className="flex space-x-3">
              <input
                type="text"
                placeholder="Title"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                className="flex-1 border border-neutral-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 text-sm"
              />
              <input
                type="text"
                placeholder="Description"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
                className="flex-1 border border-neutral-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 text-sm"
              />
              <button
                onClick={handleAdd}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm transition"
              >
                Add
              </button>
            </div>
          </div>

          {/* Task Table */}
          <div className="bg-white rounded-lg border border-neutral-200 p-4">
            <TaskTable
              tasks={tasks}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
