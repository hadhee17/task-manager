import { useState } from "react";

export default function TaskTable({ tasks, onEdit, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    completed: false,
  });

  const startEdit = (task) => {
    setEditingId(task._id);
    setEditData({
      title: task.title,
      description: task.description,
      completed: task.completed,
    });
  };

  const saveEdit = (id) => {
    onEdit(id, editData);
    setEditingId(null);
  };

  const cancelEdit = () => setEditingId(null);

  const toggleStatus = (task) => {
    onEdit(task._id, { ...task, completed: !task.completed });
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-200 shadow-sm">
      <table className="min-w-full bg-white text-sm">
        <thead>
          <tr className="bg-neutral-100 text-neutral-700">
            <th className="px-4 py-3 text-left font-medium">#</th>
            <th className="px-4 py-3 text-left font-medium">Title</th>
            <th className="px-4 py-3 text-left font-medium">Description</th>
            <th className="px-4 py-3 text-left font-medium">Status</th>
            <th className="px-4 py-3 text-left font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-200">
          {tasks.map((task, index) => (
            <tr
              key={task._id}
              className="hover:bg-neutral-50 transition-colors"
            >
              <td className="px-4 py-3 text-neutral-600">{index + 1}</td>

              <td className="px-4 py-3">
                {editingId === task._id ? (
                  <input
                    type="text"
                    value={editData.title}
                    onChange={(e) =>
                      setEditData({ ...editData, title: e.target.value })
                    }
                    className="border border-neutral-300 p-1 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                ) : (
                  <span className="text-neutral-800">{task.title}</span>
                )}
              </td>

              <td className="px-4 py-3">
                {editingId === task._id ? (
                  <input
                    type="text"
                    value={editData.description}
                    onChange={(e) =>
                      setEditData({ ...editData, description: e.target.value })
                    }
                    className="border border-neutral-300 p-1 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                ) : (
                  <span className="text-neutral-600">{task.description}</span>
                )}
              </td>

              <td className="px-4 py-3">
                <span
                  onClick={() => toggleStatus(task)}
                  className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer ${
                    task.completed
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {task.completed ? "Completed" : "Pending"}
                </span>
              </td>

              <td className="px-4 py-3 space-x-2">
                {editingId === task._id ? (
                  <>
                    <button
                      onClick={() => saveEdit(task._id)}
                      className="px-3 py-1 text-xs rounded-md bg-primary-500 text-white hover:bg-primary-600 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-3 py-1 text-xs rounded-md bg-neutral-300 text-neutral-700 hover:bg-neutral-400 transition"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEdit(task)}
                      className="px-3 py-1 text-xs rounded-md bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(task._id)}
                      className="px-3 py-1 text-xs rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
