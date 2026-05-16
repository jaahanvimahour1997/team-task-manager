import TaskCard from "./TaskCard";

export default function TaskColumn({ title, count, tasks, onRefresh, color, border }) {
  return (
    <div className="flex flex-col h-full bg-slate-50/50 rounded-[2rem] border border-slate-100 p-4">
      <div className="flex items-center justify-between px-4 py-3 mb-6">
        <div className="flex items-center gap-3">
          <div className={`w-2.5 h-2.5 rounded-full ${color}`}></div>
          <h2 className="font-bold text-slate-900 tracking-tight">{title}</h2>
        </div>
        <span className="bg-white border border-slate-200 text-slate-500 text-[10px] font-black px-2 py-1 rounded-lg">
          {count}
        </span>
      </div>

      <div className="flex-1 flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-320px)] custom-scrollbar px-1">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onRefresh={onRefresh}
          />
        ))}
        {tasks.length === 0 && (
          <div className="border-2 border-dashed border-slate-200 rounded-3xl py-12 flex flex-col items-center justify-center text-slate-400">
             <p className="text-sm font-medium tracking-tight">Empty Column</p>
          </div>
        )}
      </div>
    </div>
  );
}