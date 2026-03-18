"use client";

import { useActionState } from "react";
import { login } from "../actions";
import Link from "next/link";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, null);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 transition-colors">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 p-8 rounded-[20px] shadow-sm border border-slate-200 dark:border-slate-800">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 text-center">welcome Back!</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm text-center mb-6">Nice to see you again.</p>
        
        <form action={formAction} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Email</label>
            <input 
              name="email" 
              type="email" 
              placeholder="example@mail.com" 
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white" 
              required 
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Password</label>
            <input 
              name="password" 
              type="password" 
              placeholder="********" 
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white" 
              required 
            />
          </div>
          
          {state?.error && (
            <p className="text-red-500 text-sm font-medium bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-center">
              {state.error}
            </p>
          )}

          <button 
            disabled={isPending}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all disabled:bg-blue-300 shadow-lg shadow-blue-200 dark:shadow-none mt-2"
          >
            {isPending ? "Logging..." : "Login"}
          </button>
        </form>
        
        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          Don't have an account? <Link href="/register" className="text-blue-600 font-medium hover:underline">Register</Link>
        </p>
      </div>
    </main>
  );
}