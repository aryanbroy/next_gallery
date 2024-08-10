import { auth } from "@clerk/nextjs/server";
import { database } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const user = auth();

  const images = await database.query.images.findMany({
    orderBy: (images, { desc }) => desc(images.id),
  });

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {user.userId ? (
          images.map((image, index) => (
            <div key={image.id + "-" + index} className="flex w-48 flex-col">
              <img src={image.url} alt="image" />
              <div>{image.name}</div>
            </div>
          ))
        ) : (
          <div className="flex w-full justify-center text-xl font-bold">
            Not signed in!
          </div>
        )}
      </div>
    </main>
  );
}
