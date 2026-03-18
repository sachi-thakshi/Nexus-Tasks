import { db } from "@/lib/db";
import { addTask } from "./actions";
import TaskItem from "@/components/TaskItem";
import SearchInput from "@/components/SearchInput";
import ThemeToggle from "@/components/ThemeToggle"; 

interface Task {
  id: number;
  title: string;
  isDone: boolean;
  createdAt: Date;
  userId: number;
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const params = await searchParams;
  const query = params.query || "";

  const tasks: Task[] = await db.task.findMany({
    where: {
      title: {
        contains: query, 
      },
    },
    orderBy: { createdAt: "desc" },
    include: { category: true } 
  });

  const done = tasks.filter((t: Task) => t.isDone).length;
  const pending = tasks.length - done;

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-start justify-center py-14 px-4 transition-colors duration-300">
      
      <div className="w-full max-w-130 bg-white dark:bg-slate-900 rounded-[20px] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">

        {/* Header */}
        <div className="px-7 pt-7 pb-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {/* Text color: text-[#1a1916] dark:text-white */}
              <h1 className="text-[22px] font-semibold text-slate-900 dark:text-white tracking-tight">NexusTasks</h1>
              <span className="w-2 h-2 rounded-full bg-green-400" />
            </div>

            <ThemeToggle />
          </div>

          <div className="mb-5">
            <SearchInput />
          </div>
          
          <p className="text-[13px] text-[#9e9b93] dark:text-slate-400 mb-5">
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
          
          {/* Stats/Filters Colors */}
          <div className="flex gap-2">
            <span className="text-[12px] font-medium px-3 py-1.5 rounded-full bg-[#1a1916] dark:bg-slate-700 text-white">All {tasks.length}</span>
            <span className="text-[12px] font-medium px-3 py-1.5 rounded-full bg-[#f5f4f0] dark:bg-slate-800 text-[#6b6860] dark:text-slate-300 border border-[#e8e5de] dark:border-slate-700">Open {pending}</span>
            <span className="text-[12px] font-medium px-3 py-1.5 rounded-full bg-[#f5f4f0] dark:bg-slate-800 text-[#6b6860] dark:text-slate-300 border border-[#e8e5de] dark:border-slate-700">Done {done}</span>
          </div>
        </div>

        {/* Add Task Input: bg-[#f5f4f0] dark:bg-slate-800 */}
        <div className="px-7 pb-5 border-b border-[#f0ede6] dark:border-slate-800">
          <form action={addTask} className="flex items-center gap-2.5 bg-[#f5f4f0] dark:bg-slate-800/50 rounded-xl px-4 py-2.5 border border-[#e8e5de] dark:border-slate-700">
            <input
              name="title"
              autoComplete="off"
              placeholder="Add a new task..."
              className="flex-1 bg-transparent outline-none text-[14px] text-[#1a1916] dark:text-white placeholder:text-[#b5b2a9] dark:placeholder:text-slate-500"
            />
            <button className="bg-[#1a1916] dark:bg-blue-600 text-white text-[12px] font-medium px-3.5 py-1.5 rounded-lg whitespace-nowrap hover:opacity-90 transition-all">
              + Add
            </button>
          </form>
        </div>

        {/* Task list Container */}
        <div className="px-7 py-3">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}

          {tasks.length === 0 && (
            <p className="text-center text-[13px] text-[#b5b2a9] dark:text-slate-500 py-10">
              {query ? `No tasks found for "${query}"` : "No tasks yet — add one above."}
            </p>
          )}
        </div>

        {/* Footer: border-t dark:border-slate-800 */}
        <div className="px-7 py-4 flex items-center justify-between border-t border-[#f0ede6] dark:border-slate-800">
          <span className="text-[12px] text-[#b5b2a9] dark:text-slate-500">{pending} tasks remaining</span>
          <span className="text-[12px] text-[#9e9b93] dark:text-slate-400 underline cursor-pointer hover:text-[#1a1916] dark:hover:text-white transition-colors">Clear completed</span>
        </div>
      </div>
    </main>
  );
}