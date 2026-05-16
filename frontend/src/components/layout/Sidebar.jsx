import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  HiOutlineViewGrid,
  HiOutlineCollection,
  HiOutlineClipboardList,
  HiOutlineLogout
} from "react-icons/hi";

export default function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <HiOutlineViewGrid className="w-6 h-6" />,
    },
    {
      name: "Projects",
      path: "/projects",
      icon: <HiOutlineCollection className="w-6 h-6" />,
    },
    {
      name: "Tasks",
      path: "/tasks",
      icon: <HiOutlineClipboardList className="w-6 h-6" />,
    },
  ];

  return (
    <div className="w-72 bg-slate-900 text-white flex flex-col h-screen shrink-0">
      
      {/* LOGO */}
      <div className="p-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="text-xl font-bold">T</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">TaskFlow</h1>
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Workspace</span>
          </div>
        </div>
      </div>

      {/* MENU */}
      <nav className="flex-1 px-4 py-4">
        <div className="space-y-1">
          {menu.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  active
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <span className={`${active ? "text-white" : "text-slate-500 group-hover:text-blue-400 transition-colors"}`}>
                  {item.icon}
                </span>
                <span className="font-semibold">{item.name}</span>
                {active && (
                   <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* USER FOOTER */}
      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center font-bold text-sm">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div className="overflow-hidden">
              <p className="font-bold text-sm truncate">{user?.name || "Guest User"}</p>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{user?.role || "Member"}</p>
            </div>
          </div>
          
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-red-500/10 hover:text-red-400 text-slate-400 transition-all text-xs font-bold border border-slate-700"
          >
            <HiOutlineLogout className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}