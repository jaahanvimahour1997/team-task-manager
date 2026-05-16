import { useState } from "react";
import API from "../../api/api";
import { toast } from "react-hot-toast";
import { 
  HiOutlineClock, 
  HiOutlineDotsHorizontal, 
  HiOutlineTrash, 
  HiOutlineArrowRight,
  HiOutlineFlag
} from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";

export default function TaskCard({ task, onRefresh }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const deleteTask = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    
    setLoading(true);
    try {
      await API.delete(`/tasks/${task._id}`);
      toast.success("Task deleted");
      onRefresh();
    } catch (err) {
      toast.error("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (newStatus) => {
    setLoading(true);
    try {
      await API.patch(`/tasks/${task._id}/status`, { status: newStatus });
      toast.success(`Task moved to ${newStatus}`);
      onRefresh();
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const priorityColors = {
    High: "bg-red-50 text-red-600 border-red-100",
    Medium: "bg-blue-50 text-blue-600 border-blue-100",
    Low: "bg-slate-50 text-slate-500 border-slate-100"
  };

  return (
    <div className={`group bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 ${loading ? "opacity-50 pointer-events-none" : ""}`}>
      <div className="flex items-start justify-between mb-4">
        <span className={`px-2.5 py-1 rounded-lg border text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ${priorityColors[task.priority] || priorityColors.Medium}`}>
          <HiOutlineFlag className="w-3 h-3" />
          {task.priority || "Medium"}
        </span>
        
        {user?.role === "admin" && (
          <button 
            onClick={deleteTask}
            className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
          >
            <HiOutlineTrash className="w-4 h-4" />
          </button>
        )}
      </div>

      <h3 className="font-bold text-slate-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors">
        {task.title}
      </h3>
      <p className="text-slate-500 text-xs font-medium line-clamp-2 mb-6">
        {task.description}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
        <div className="flex items-center gap-2">
           <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 border border-slate-200" title={task.assignedTo?.name}>
              {task.assignedTo?.name?.charAt(0) || "U"}
           </div>
           <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Assignee</span>
              <span className="text-[10px] font-bold text-slate-900 truncate max-w-[80px]">{task.assignedTo?.name || "Unassigned"}</span>
           </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight flex items-center gap-1">
            <HiOutlineClock className="w-3 h-3" />
            Due Date
          </span>
          <span className="text-[10px] font-bold text-slate-900">
            {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No Date"}
          </span>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="mt-4 pt-4 border-t border-slate-50 flex gap-2">
        {task.status === "Todo" && (
          <button 
            onClick={() => updateStatus("In Progress")}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-widest hover:bg-amber-100 transition-colors"
          >
            Start Work
            <HiOutlineArrowRight className="w-3 h-3" />
          </button>
        )}
        {task.status === "In Progress" && (
          <button 
            onClick={() => updateStatus("Completed")}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest hover:bg-emerald-100 transition-colors"
          >
            Mark Done
            <HiOutlineArrowRight className="w-3 h-3" />
          </button>
        )}
        {task.status === "Completed" && (
          <button 
            onClick={() => updateStatus("In Progress")}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-colors"
          >
            Reopen
          </button>
        )}
      </div>
    </div>
  );
}