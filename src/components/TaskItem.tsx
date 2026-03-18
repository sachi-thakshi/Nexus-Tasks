"use client";

import { useState } from "react";
import { updateTask, deleteTask, toggleTask } from "@/app/actions";

export default function TaskItem({ task }: { task: any }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateTask(task.id, title);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center gap-3 py-3.5 border-b border-[#f5f4f0] last:border-none">
      {/* Toggle Checkbox */}
      <form action={() => toggleTask(task.id, task.isDone)}>
        <button
          className={`w-5 h-5 rounded-md shrink-0 flex items-center justify-center transition-colors ${
            task.isDone ? "bg-[#1a1916] border-[#1a1916]" : "border-[#d4d0c8]"
          }`}
          style={{ border: `1.5px solid ${task.isDone ? "#1a1916" : "#d4d0c8"}` }}
        >
          {task.isDone && (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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
            onBlur={() => setIsEditing(false)}
            className="w-full bg-transparent outline-none text-[14px] font-medium text-[#1a1916] border-b border-blue-400"
          />
        </form>
      ) : (
        <span
          onClick={() => setIsEditing(true)}
          className={`flex-1 text-[14px] font-medium cursor-pointer ${
            task.isDone ? "line-through text-[#b5b2a9] font-normal" : "text-[#1a1916]"
          }`}
        >
          {task.title}
        </span>
      )}

      {/* Delete Button */}
      <form action={() => deleteTask(task.id)}>
        <button className="w-7 h-7 rounded-lg flex items-center justify-center text-[#9e9b93] text-[15px] hover:bg-[#f5f4f0] transition-colors border border-[#e8e5de]">
          ×
        </button>
      </form>
    </div>
  );
}