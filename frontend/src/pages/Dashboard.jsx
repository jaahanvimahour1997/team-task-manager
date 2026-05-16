import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import API from "../api/api";
import { 
  HiOutlineCollection, 
  HiOutlineClipboardList, 
  HiOutlineClock, 
  HiOutlineCheckCircle,
  HiOutlineTrendingUp
} from "react-icons/hi";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    overdueTasks: 0
  });
  const [recentTasks, setRecentTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await API.get("/dashboard");
      const tasksRes = await API.get("/tasks");
      
      setStats(res.data);
      setRecentTasks(tasksRes.data.slice(0, 5));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: "Total Projects",
      value: stats.totalProjects,
      icon: <HiOutlineCollection className="w-6 h-6 text-blue-600" />,
      bg: "bg-blue-50",
      color: "text-blue-600"
    },
    {
      title: "Active Tasks",
      value: stats.totalTasks,
      icon: <HiOutlineClipboardList className="w-6 h-6 text-indigo-600" />,
      bg: "bg-indigo-50",
      color: "text-indigo-600"
    },
    {
      title: "In Progress",
      value: stats.inProgressTasks,
      icon: <HiOutlineClock className="w-6 h-6 text-amber-600" />,
      bg: "bg-amber-50",
      color: "text-amber-600"
    },
    {
      title: "Completed",
      value: stats.completedTasks,
      icon: <HiOutlineCheckCircle className="w-6 h-6 text-emerald-600" />,
      bg: "bg-emerald-50",
      color: "text-emerald-600"
    }
  ];

  const completionRate = stats.totalTasks ? Math.round((stats.completedTasks / stats.totalTasks) * 100) : 0;

  return (
    <Layout>
      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card, i) => (
          <div key={i} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl ${card.bg}`}>
                {card.icon}
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Stats</span>
            </div>
            <h3 className="text-slate-500 font-medium text-sm">{card.title}</h3>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-3xl font-bold text-slate-900">{card.value}</span>
              <span className="text-emerald-500 text-xs font-bold mb-1.5 flex items-center">
                <HiOutlineTrendingUp className="w-3 h-3 mr-0.5" />
                +12%
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* RECENT ACTIVITY */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">Recent Activity</h3>
              <p className="text-slate-500 text-sm font-medium mt-1">Check your team's latest task updates.</p>
            </div>
            <button className="text-blue-600 font-bold text-sm hover:underline">View All Tasks</button>
          </div>

          <div className="space-y-4">
            {recentTasks.length > 0 ? recentTasks.map((task) => (
              <div key={task._id} className="group flex items-center justify-between p-4 rounded-2xl border border-slate-50 hover:border-slate-200 hover:bg-slate-50 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                    task.status === "Completed" ? "bg-emerald-100 text-emerald-600" :
                    task.status === "In Progress" ? "bg-amber-100 text-amber-600" :
                    "bg-slate-100 text-slate-600"
                  }`}>
                    {(task.title || "T").charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{task.title}</h4>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-0.5">{task.project?.title || "Internal"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                   <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                     task.priority === "High" ? "bg-red-100 text-red-600" :
                     task.priority === "Medium" ? "bg-blue-100 text-blue-600" :
                     "bg-slate-100 text-slate-500"
                   }`}>
                     {task.priority || "Medium"}
                   </span>
                   <span className={`px-4 py-1.5 rounded-xl text-xs font-bold ${
                     task.status === "Completed" ? "bg-emerald-500 text-white" :
                     task.status === "In Progress" ? "bg-amber-500 text-white" :
                     "bg-slate-200 text-slate-600"
                   }`}>
                     {task.status}
                   </span>
                </div>
              </div>
            )) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                   <HiOutlineClipboardList className="w-8 h-8 text-slate-300" />
                </div>
                <p className="text-slate-400 font-medium text-sm">No recent tasks found.</p>
              </div>
            )}
          </div>
        </div>

        {/* PRODUCTIVITY PANEL */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col">
          <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-8">Overall Progress</h3>
          
          <div className="flex-1 flex flex-col items-center justify-center py-4">
            <div className="relative w-48 h-48 mb-8">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  className="text-slate-100"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={552.92}
                  strokeDashoffset={552.92 - (552.92 * completionRate) / 100}
                  strokeLinecap="round"
                  className="text-blue-600 transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-slate-900">{completionRate}%</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Completed</span>
              </div>
            </div>

            <div className="w-full space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">In Progress</span>
                  <span className="text-sm font-bold text-slate-900">{stats.inProgressTasks} Tasks</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-500 rounded-full transition-all duration-1000"
                    style={{ width: `${stats.totalTasks ? (stats.inProgressTasks / stats.totalTasks) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Overdue</span>
                  <span className="text-sm font-bold text-red-500">{stats.overdueTasks} Tasks</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-500 rounded-full transition-all duration-1000"
                    style={{ width: `${stats.totalTasks ? (stats.overdueTasks / stats.totalTasks) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-50">
             <div className="bg-blue-600 rounded-2xl p-4 text-white">
                <p className="text-xs font-bold opacity-80 uppercase tracking-wider mb-1">Top Performer</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">AJ</div>
                  <span className="font-bold text-sm">Alex Johnson</span>
                </div>
             </div>
          </div>
        </div>

      </div>
    </Layout>
  );
}