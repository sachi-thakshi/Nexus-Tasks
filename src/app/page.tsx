import { db } from "@/lib/db";
import { addTask } from "./actions";
import TaskItem from "@/components/TaskItem";
import SearchInput from "@/components/SearchInput"; 

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
    <main className="min-h-screen bg-[#f5f4f0] flex items-start justify-center py-14 px-4"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="w-full max-w-130 bg-white rounded-[20px] overflow-hidden border border-[#e8e5de]">

        {/* Header */}
        <div className="px-7 pt-7 pb-5">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-[22px] font-semibold text-[#1a1916] tracking-tight">NexusTasks</h1>
            <span className="w-2 h-2 rounded-full bg-green-400" />
          </div>

          {/* (Search Input) */}
          <div className="mb-5">
            <SearchInput />
          </div>
          
          <p className="text-[13px] text-[#9e9b93] mb-5">
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
          
          {/* Stats/Filters */}
          <div className="flex gap-2">
            <span className="text-[12px] font-medium px-3 py-1.5 rounded-full bg-[#1a1916] text-white">All {tasks.length}</span>
            <span className="text-[12px] font-medium px-3 py-1.5 rounded-full bg-[#f5f4f0] text-[#6b6860] border border-[#e8e5de]">Open {pending}</span>
            <span className="text-[12px] font-medium px-3 py-1.5 rounded-full bg-[#f5f4f0] text-[#6b6860] border border-[#e8e5de]">Done {done}</span>
          </div>
        </div>

        {/* Add Task Input */}
        <div className="px-7 pb-5 border-b border-[#f0ede6]">
          <form action={addTask} className="flex items-center gap-2.5 bg-[#f5f4f0] rounded-xl px-4 py-2.5 border border-[#e8e5de]">
            <input
              name="title"
              autoComplete="off"
              placeholder="Add a new task..."
              className="flex-1 bg-transparent outline-none text-[14px] text-[#1a1916] placeholder:text-[#b5b2a9]"
            />
            <button className="bg-[#1a1916] text-white text-[12px] font-medium px-3.5 py-1.5 rounded-lg whitespace-nowrap">
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
            <p className="text-center text-[13px] text-[#b5b2a9] py-10">
              {query ? `No tasks found for "${query}"` : "No tasks yet — add one above."}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="px-7 py-4 flex items-center justify-between border-t border-[#f0ede6]">
          <span className="text-[12px] text-[#b5b2a9]">{pending} tasks remaining</span>
          <span className="text-[12px] text-[#9e9b93] underline cursor-pointer hover:text-[#1a1916]">Clear completed</span>
        </div>
      </div>
    </main>
  );
}