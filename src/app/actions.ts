"use server"

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

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