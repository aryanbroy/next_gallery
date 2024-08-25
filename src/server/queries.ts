import { auth } from "@clerk/nextjs/server";
import "server-only";
import { database } from "./db";
import { images } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import analyticsServerClient from "./analytics";

export async function getMyImages() {
  const user = auth();

  if (!user.userId) throw new Error("Not signed in!");

  const images = await database.query.images.findMany({
    where: (image, { eq }) => eq(image.userId, user.userId),
    orderBy: (images, { desc }) => desc(images.id),
  });
  return images;
}

export async function getImage(id: number) {
  const user = auth();
  const image = await database.query.images.findFirst({
    where: (image, { eq }) => eq(image.id, id),
  });

  if (!image) {
    redirect("/");
  }

  if (image.userId !== user.userId) throw new Error("Unauthorized");

  return image;
}

export async function deleteImage(id: number) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized!");

  await database
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, user.userId)));

  analyticsServerClient.capture({
    distinctId: user.userId,
    event: "delete image",
    properties: {
      imageId: id,
    },
  });
  redirect("/");
}
