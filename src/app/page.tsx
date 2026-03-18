import { db } from "@/lib/db";
import { addTask, deleteTask, toggleTask } from "./actions";

export default async function Home() {
  const tasks = await db.task.findMany({ orderBy: { createdAt: "desc" } });
  const done = tasks.filter((t) => t.isDone).length;
  const pending = tasks.length - done;

  return (
    <main className="min-h-screen bg-[#f5f4f0] flex items-start justify-center py-14 px-4"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="w-full max-w-130 bg-white rounded-[20px] overflow-hidden"
        style={{ border: "1px solid #e8e5de" }}>

        {/* Header */}
        <div className="px-7 pt-7 pb-5">
          <div className="flex items-center justify-between mb-1">
            <h1 className="text-[22px] font-semibold text-[#1a1916] tracking-tight">My Tasks</h1>
            <span className="w-2 h-2 rounded-full bg-green-400" />
          </div>
          <p className="text-[13px] text-[#9e9b93] mb-5">
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
          <div className="flex gap-2">
            {[
              { label: `All ${tasks.length}`, active: true },
              { label: `Open ${pending}`, active: false },
              { label: `Done ${done}`, active: false },
            ].map(({ label, active }) => (
              <span key={label}
                className={`text-[12px] font-medium px-3 py-1.5 rounded-full ${
                  active
                    ? "bg-[#1a1916] text-white"
                    : "bg-[#f5f4f0] text-[#6b6860] border border-[#e8e5de]"
                }`}>
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="px-7 pb-5" style={{ borderBottom: "1px solid #f0ede6" }}>
          <form action={addTask}
            className="flex items-center gap-2.5 bg-[#f5f4f0] rounded-xl px-4 py-2.5"
            style={{ border: "1px solid #e8e5de" }}>
            <input
              name="title"
              placeholder="Add a new task..."
              className="flex-1 bg-transparent outline-none text-[14px] text-[#1a1916] placeholder:text-[#b5b2a9]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            />
            <button
              className="bg-[#1a1916] text-white text-[12px] font-medium px-3.5 py-1.5 rounded-lg whitespace-nowrap"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              + Add
            </button>
          </form>
        </div>

        {/* Task list */}
        <div className="px-7 py-3">
          {tasks.map((task, i) => (
            <div key={task.id}
              className="flex items-center gap-3 py-3.5"
              style={{ borderBottom: i < tasks.length - 1 ? "1px solid #f5f4f0" : "none" }}>

              {/* Toggle */}
              <form action={toggleTask.bind(null, task.id, task.isDone)}>
                <button
                  className={`w-5 h-5 rounded-md shrink-0 flex items-center justify-center transition-colors ${
                    task.isDone ? "bg-[#1a1916] border-[#1a1916]" : "border-[#d4d0c8]"
                  }`}
                  style={{ border: `1.5px solid ${task.isDone ? "#1a1916" : "#d4d0c8"}` }}>
                  {task.isDone && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </form>

              {/* Text */}
              <span className={`flex-1 text-[14px] font-medium leading-snug ${
                task.isDone ? "line-through text-[#b5b2a9] font-normal" : "text-[#1a1916]"
              }`}>
                {task.title}
              </span>

              {/* Delete */}
              <form action={deleteTask.bind(null, task.id)}>
                <button
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-[#9e9b93] text-[15px] hover:bg-[#f5f4f0] transition-colors"
                  style={{ border: "1px solid #e8e5de" }}>
                  ×
                </button>
              </form>
            </div>
          ))}

          {tasks.length === 0 && (
            <p className="text-center text-[13px] text-[#b5b2a9] py-10">No tasks yet — add one above.</p>
          )}
        </div>

        {/* Footer */}
        <div className="px-7 py-4 flex items-center justify-between"
          style={{ borderTop: "1px solid #f0ede6" }}>
          <span className="text-[12px] text-[#b5b2a9]">{pending} task{pending !== 1 ? "s" : ""} remaining</span>
          <span className="text-[12px] text-[#9e9b93] underline cursor-pointer">Clear completed</span>
        </div>
      </div>
    </main>
  );
}