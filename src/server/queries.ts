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
