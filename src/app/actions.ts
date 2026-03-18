"use server"

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { signIn, auth } from "@/auth";
import { AuthError } from "next-auth";
import { signOut } from "@/auth";

export async function addTask(formData: FormData) {
  const session = await auth(); 
  
  if (!session?.user?.id) {
    throw new Error("You must be logged in to add a task");
  }

  const title = formData.get("title") as string;
  if (!title || title.trim() === "") return;

  await db.task.create({ 
    data: { 
      title,
      userId: Number(session.user.id) 
    } 
  });
  
  revalidatePath("/");
}

export async function deleteTask(id: number) {
  await db.task.delete({ where: { id } });
  revalidatePath("/");
}

export async function toggleTask(id: number, currentStatus: boolean) {
  await db.task.update({
    where: { id },
    data: { isDone: !currentStatus }
  });
  revalidatePath("/");
}

export async function updateTask(id: number, newTitle: string) {
  await db.task.update({
    where: { id },
    data: { title: newTitle }
  });
  revalidatePath("/");
}

export async function signUp(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "Enter all information." };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.user.create({
      data: { name, email, password: hashedPassword },
    });
  } catch (error) {
    return { error: "This email is already in use." };
  }

  redirect("/login");
}

export async function login(prevState: any, formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/", 
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "The email address or password is incorrect." };
        default:
          return { error: "An error occurred. Please try again." };
      }
    }
    throw error; 
  }
}

export async function logOut() {
  await signOut({ redirectTo: "/login" });
}

export async function clearCompletedTasks() {
  const session = await auth();
  const userId = Number(session?.user?.id);

  if (!userId) return;

  await db.task.deleteMany({
    where: {
      userId: userId,
      isDone: true, 
    },
  });

  revalidatePath("/");
}