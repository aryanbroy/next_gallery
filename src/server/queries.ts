import { auth } from "@clerk/nextjs/server";
import "server-only";
import { database } from "./db";

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

  if (!image) throw new Error("Image not found");

  if (image.userId !== user.userId) throw new Error("Unauthorized");

  return image;
}
