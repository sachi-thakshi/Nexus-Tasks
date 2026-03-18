"use client";

import { useActionState } from "react";
import { signUp } from "../actions";

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(signUp, null);

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-[20px] shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Create NexusTasks Account</h2>
        
        <form action={formAction} className="space-y-4">
          <input name="name" placeholder="Your Name" className="w-full p-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 text-slate-900" required />
          <input name="email" type="email" placeholder="Email" className="w-full p-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 text-slate-900" required />
          <input name="password" type="password" placeholder="password" className="w-full p-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500 text-slate-900" required />
          
          {state?.error && (
            <p className="text-red-500 text-sm font-medium">{state.error}</p>
          )}

          <button 
            disabled={isPending}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all disabled:bg-blue-300"
          >
            {isPending ? "Registering..." : "Register"}
          </button>
        </form>
        
        <p className="mt-4 text-center text-sm text-slate-600">
          Already Have an Account? <a href="/login" className="text-blue-600 font-medium">Log in</a>
        </p>
      </div>
    </main>
  );
}