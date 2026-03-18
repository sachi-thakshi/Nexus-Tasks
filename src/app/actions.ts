"use server"

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export async function addTask(formData: FormData) {
  const title = formData.get("title") as string;
  if (!title || title.trim() === "") return;

  await db.task.create({ 
    data: { 
      title,
      userId: 1 
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
    return { error: "සියලුම තොරතුරු ඇතුළත් කරන්න." };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.user.create({
      data: { name, email, password: hashedPassword },
    });
  } catch (error) {
    return { error: "මෙම Email එක දැනටමත් භාවිතයේ පවතී." };
  }

  redirect("/login");
}