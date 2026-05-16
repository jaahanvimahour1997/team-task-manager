import { useState } from "react";
import API from "../../api/api";
import toast from "react-hot-toast";

export default function EditTaskModal({ task, onClose, onSuccess }) {
  const [form, setForm] = useState({
    title: task.title,
    status: task.status,
  });

  const handleUpdate = async () => {
    try {
      await API.put(`/tasks/${task._id}`, form);

      toast.success("Task updated");
      onSuccess();
      onClose();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 w-96 rounded">
        <h2 className="text-xl font-bold mb-4">
          Edit Task
        </h2>

        <input
          className="w-full border p-2 mb-3"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <select
          className="w-full border p-2 mb-3"
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value })
          }
        >
          <option>Todo</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white w-full py-2"
        >
          Update
        </button>
      </div>
    </div>
  );
}