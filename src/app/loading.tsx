export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f5f4f0] dark:bg-slate-950 flex items-start justify-center py-14 px-4">
      <div className="w-full max-w-130 bg-white dark:bg-slate-900 rounded-[20px] overflow-hidden border border-[#e8e5de] dark:border-slate-800">
        
        {/* Skeleton Header */}
        <div className="px-7 pt-7 pb-5 animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="h-7 w-32 bg-slate-200 dark:bg-slate-800 rounded-md" />
            <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-800" />
          </div>
          
          {/* Skeleton Search Bar */}
          <div className="h-10 w-full bg-slate-100 dark:bg-slate-800 rounded-xl mb-5" />
          
          <div className="h-4 w-40 bg-slate-100 dark:bg-slate-800 rounded-md mb-5" />
          
          <div className="flex gap-2">
            <div className="h-7 w-16 bg-slate-200 dark:bg-slate-800 rounded-full" />
            <div className="h-7 w-16 bg-slate-200 dark:bg-slate-800 rounded-full" />
            <div className="h-7 w-16 bg-slate-200 dark:bg-slate-800 rounded-full" />
          </div>
        </div>

        {/* Skeleton Add Task Input */}
        <div className="px-7 pb-5 border-b border-[#f0ede6] dark:border-slate-800 animate-pulse">
          <div className="h-12 w-full bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700" />
        </div>

        {/* Skeleton Task List */}
        <div className="px-7 py-3 space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-3 py-4 border-b border-[#f5f4f0] dark:border-slate-800 last:border-none animate-pulse">
              <div className="w-5 h-5 bg-slate-200 dark:bg-slate-800 rounded-md" />
              <div className="h-4 flex-1 bg-slate-100 dark:bg-slate-800 rounded-md" />
              <div className="w-7 h-7 bg-slate-200 dark:bg-slate-800 rounded-lg" />
            </div>
          ))}
        </div>

        {/* Skeleton Footer */}
        <div className="px-7 py-4 flex items-center justify-between border-t border-[#f0ede6] dark:border-slate-800 animate-pulse">
          <div className="h-3 w-24 bg-slate-100 dark:bg-slate-800 rounded-md" />
          <div className="h-3 w-20 bg-slate-100 dark:bg-slate-800 rounded-md" />
        </div>
      </div>
    </main>
  );
}