import { db } from "@/lib/db";
import { addTask, logOut, clearCompletedTasks } from "./actions";
import TaskItem from "@/components/TaskItem";
import SearchInput from "@/components/SearchInput";
import ThemeToggle from "@/components/ThemeToggle"; 
import { auth } from "@/auth";
import { redirect } from "next/navigation";

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

  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }
  const userId = Number(session?.user?.id);

  const params = await searchParams;
  const query = params.query || "";

  const tasks: Task[] = await db.task.findMany({
    where: {
      userId: userId, 
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
      
      <div className="w-full max-w-130 bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none transition-colors">

        {/* Header */}
        <div className="px-8 pt-8 pb-6 bg-white dark:bg-slate-900">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                 <span className="block w-3 h-3 bg-white rounded-full animate-pulse" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">NexusTasks</h1>
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <form action={logOut}>
                <button className="text-[13px] font-semibold text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors py-1.5 px-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 underline decoration-2 underline-offset-4">
                  Logout
                </button>
              </form>
            </div>
          </div>

          <div className="mb-6">
            <SearchInput />
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-[14px] font-medium text-slate-500 dark:text-slate-400">
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </p>
            
            <div className="flex gap-2">
              <span className="text-[12px] font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                Total {tasks.length}
              </span>
              <span className="text-[12px] font-bold px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800">
                Pending {pending}
              </span>
            </div>
          </div>
        </div>

        {/* Add Task Input Container */}
        <div className="px-8 pb-6 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
          <form action={addTask} className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl px-4 py-3 border border-slate-200 dark:border-slate-700 focus-within:border-blue-500 dark:focus-within:border-blue-400 transition-all shadow-inner">
            <input
              name="title"
              autoComplete="off"
              placeholder="What needs to be done?"
              className="flex-1 bg-transparent outline-none text-[15px] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 font-medium"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-bold px-5 py-2 rounded-lg transition-all active:scale-95 shadow-lg shadow-blue-200 dark:shadow-none">
              Add Task
            </button>
          </form>
        </div>

        {/* Task list Container */}
        <div className="px-8 py-4 bg-white dark:bg-slate-900 min-h-75">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}

          {tasks.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 opacity-40">
              <p className="text-[15px] font-medium text-slate-500 dark:text-slate-400">
                {query ? `No results for "${query}"` : "Your task list is empty."}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-5 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <span className="text-[13px] font-medium text-slate-500 dark:text-slate-400">
            {pending} {pending === 1 ? 'task' : 'tasks'} remaining
          </span>
          
          <form action={clearCompletedTasks}>
            <button 
              type="submit"
              className="text-[13px] font-bold text-blue-600 dark:text-blue-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            >
              Clear completed
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}