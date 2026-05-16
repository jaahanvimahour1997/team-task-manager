import { useState, useEffect } from "react";
import API from "../../api/api";
import { toast } from "react-hot-toast";
import { HiOutlineX, HiOutlineUserGroup, HiOutlineCheck } from "react-icons/hi";

export default function ProjectModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    members: [],
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    API.get("/users").then((res) => setUsers(res.data)).catch(err => console.log(err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleMember = (userId) => {
    const newMembers = form.members.includes(userId)
      ? form.members.filter((id) => id !== userId)
      : [...form.members, userId];
    setForm({ ...form, members: newMembers });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description) {
      return toast.error("Please fill in all required fields.");
    }

    setLoading(true);
    try {
      await API.post("/projects", form);
      toast.success("Project created successfully!");
      onSuccess();
      onClose();
    } catch (err) {
      toast.error("Error creating project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* HEADER */}
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Create New Project</h2>
            <p className="text-sm text-slate-500 font-medium">Define project goals and team.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-xl transition-colors">
            <HiOutlineX className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* BODY */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Project Title</label>
            <input
              name="title"
              placeholder="e.g. Website Redesign 2024"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 font-medium"
              onChange={handleChange}
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Description</label>
            <textarea
              name="description"
              rows="3"
              placeholder="Briefly describe the project scope and objectives..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 font-medium resize-none"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">
              <HiOutlineUserGroup className="w-4 h-4" />
              Assign Team Members
            </label>
            <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
              {users.map((user) => {
                const isSelected = form.members.includes(user._id);
                return (
                  <button
                    key={user._id}
                    type="button"
                    onClick={() => toggleMember(user._id)}
                    className={`flex items-center gap-3 p-3 rounded-2xl border transition-all text-left ${
                      isSelected 
                        ? "bg-blue-50 border-blue-200 ring-2 ring-blue-500/10" 
                        : "bg-white border-slate-100 hover:border-slate-200"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${isSelected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}>
                      {isSelected ? <HiOutlineCheck className="w-4 h-4" /> : user.name.charAt(0)}
                    </div>
                    <div className="overflow-hidden">
                      <p className={`text-xs font-bold truncate ${isSelected ? "text-blue-700" : "text-slate-700"}`}>{user.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium truncate">{user.role}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-2xl bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 rounded-2xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}