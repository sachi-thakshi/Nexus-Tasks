"use client";

import { useState } from "react";
import { updateTask, deleteTask, toggleTask } from "@/app/actions";

export default function TaskItem({ task }: { task: any }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "") return;
    await updateTask(task.id, title);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center gap-3 py-3.5 border-b border-slate-50 dark:border-slate-800/50 last:border-none transition-colors group">
      
      {/* Toggle Checkbox */}
        <form action={() => toggleTask(task.id, task.isDone)}>
            <button
                type="submit"
                className={`w-5 h-5 rounded-md shrink-0 flex items-center justify-center transition-all border-[1.5px] ${
                task.isDone 
                    ? "bg-slate-900 dark:bg-blue-600 border-slate-900 dark:border-blue-600" 
                    : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 hover:border-blue-500"
                }`}
            >
                {task.isDone && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path 
                    d="M1 4L3.5 6.5L9 1" 
                    stroke="white" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    />
                </svg>
                )}
            </button>
        </form>
      {/* Task Title / Edit Input */}
      {isEditing ? (
        <form onSubmit={handleUpdate} className="flex-1">
          <input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleUpdate} 
            className="w-full bg-transparent outline-none text-[14px] font-medium text-slate-900 dark:text-white border-b-2 border-blue-500 py-0.5"
          />
        </form>
      ) : (
        <span
          onClick={() => setIsEditing(true)}
          className={`flex-1 text-[14px] font-medium cursor-pointer transition-all ${
            task.isDone 
              ? "line-through text-slate-400 dark:text-slate-500 font-normal" 
              : "text-slate-800 dark:text-slate-100" 
          }`}
        >
          {task.title}
        </span>
      )}

      {/* Delete Button */}
      <form action={() => deleteTask(task.id)}>
        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all opacity-0 group-hover:opacity-100">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </form>
    </div>
  );
}