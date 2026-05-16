import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import API from "../api/api";
import ProjectModal from "../components/projects/ProjectModal";
import { HiOutlinePlus, HiOutlineUsers, HiOutlineCalendar, HiOutlineCollection } from "react-icons/hi";
import { useAuth } from "../context/AuthContext";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  const loadProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Project Hub</h1>
          <p className="text-slate-500 font-medium mt-1">Manage and track your team's active initiatives.</p>
        </div>

        {user?.role === "admin" && (
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
          >
            <HiOutlinePlus className="w-5 h-5" />
            New Project
          </button>
        )}
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div key={p._id} className="group bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                   <span className="text-xl font-bold text-slate-400 group-hover:text-blue-600">{(p.title || "P").charAt(0)}</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-widest">Active</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{p.title}</h3>
              <p className="text-slate-500 text-sm font-medium line-clamp-2 mb-6 flex-1">{p.description}</p>

              <div className="pt-6 border-t border-slate-50 flex items-center justify-between mt-auto">
                <div className="flex -space-x-2">
                  {p.members?.slice(0, 4).map((m, i) => (
                    <div 
                      key={i} 
                      className="w-8 h-8 rounded-full bg-white p-0.5"
                      title={m.name}
                    >
                      <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600 border border-slate-200">
                        {m.name.charAt(0)}
                      </div>
                    </div>
                  ))}
                  {p.members?.length > 4 && (
                    <div className="w-8 h-8 rounded-full bg-white p-0.5">
                      <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-[10px] font-bold text-white border border-slate-200">
                        +{p.members.length - 4}
                      </div>
                    </div>
                  )}
                  {(p.members?.length === 0 || !p.members) && (
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                       <HiOutlineUsers className="w-3.5 h-3.5" />
                       No Members
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                  <HiOutlineCalendar className="w-4 h-4" />
                  {new Date(p.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm">
           <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <HiOutlineCollection className="w-10 h-10 text-slate-300" />
           </div>
           <h3 className="text-xl font-bold text-slate-900 mb-2">No projects yet</h3>
           <p className="text-slate-500 font-medium mb-8">Start by creating your first team project.</p>
           {user?.role === "admin" && (
             <button
                onClick={() => setOpen(true)}
                className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-slate-800 transition-all"
             >
               Create Project
             </button>
           )}
        </div>
      )}

      {open && (
        <ProjectModal
          onClose={() => setOpen(false)}
          onSuccess={loadProjects}
        />
      )}
    </Layout>
  );
}