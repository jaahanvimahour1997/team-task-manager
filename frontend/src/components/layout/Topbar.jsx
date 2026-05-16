import { useLocation } from "react-router-dom";
import { HiOutlineBell, HiOutlineSearch } from "react-icons/hi";

export default function Topbar() {
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/dashboard") return "Dashboard Overview";
    if (path === "/projects") return "Projects Management";
    if (path === "/tasks") return "Tasks Board";
    return "Workspace";
  };

  const getPageDesc = () => {
    const path = location.pathname;
    if (path === "/dashboard") return "View your team's real-time productivity stats.";
    if (path === "/projects") return "Create, organize and manage team projects.";
    if (path === "/tasks") return "Track, assign and update task progress.";
    return "Welcome to your collaborative workspace.";
  };

  return (
    <div className="h-24 bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-40">
      
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          {getPageTitle()}
        </h2>
        <p className="text-slate-500 text-sm font-medium mt-1">
          {getPageDesc()}
        </p>
      </div>

      <div className="flex items-center gap-4">
        
        <div className="relative hidden lg:block">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search workspace..."
            className="bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-64"
          />
        </div>

        <button className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all relative">
          <HiOutlineBell className="w-6 h-6" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="w-px h-8 bg-slate-200 mx-2 hidden sm:block"></div>

        <div className="flex items-center gap-3 pl-2">
          <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 p-0.5">
             <div className="w-full h-full rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-inner">
               TF
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}