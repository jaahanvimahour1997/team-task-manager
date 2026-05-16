import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import API from "../api/api";
import TaskColumn from "../components/tasks/TaskColumn";
import TaskModal from "../components/tasks/TaskModal";
import { HiOutlinePlus, HiOutlineFilter, HiOutlineViewBoards } from "react-icons/hi";
import { useAuth } from "../context/AuthContext";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  const loadTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const todo = tasks.filter(t => t.status === "Todo");
  const progress = tasks.filter(t => t.status === "In Progress");
  const done = tasks.filter(t => t.status === "Completed");

  return (
    <Layout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
             <HiOutlineViewBoards className="w-5 h-5 text-blue-600" />
             <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Task Board</h1>
          </div>
          <p className="text-slate-500 font-medium">Organize and track progress with Kanban style board.</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-3 rounded-2xl font-bold hover:bg-slate-50 transition-all">
            <HiOutlineFilter className="w-5 h-5" />
            Filter
          </button>
          {user?.role === "admin" && (
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.98]"
            >
              <HiOutlinePlus className="w-5 h-5" />
              New Task
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <TaskColumn title="Todo" count={todo.length} tasks={todo} onRefresh={loadTasks} color="bg-slate-200" border="border-slate-300" />
        <TaskColumn title="In Progress" count={progress.length} tasks={progress} onRefresh={loadTasks} color="bg-amber-500" border="border-amber-600" />
        <TaskColumn title="Completed" count={done.length} tasks={done} onRefresh={loadTasks} color="bg-emerald-500" border="border-emerald-600" />
      </div>

      {open && (
        <TaskModal
          onClose={() => setOpen(false)}
          onSuccess={loadTasks}
        />
      )}
    </Layout>
  );
}