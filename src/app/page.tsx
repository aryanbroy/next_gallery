import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { database } from "~/server/db";
import { getMyImages } from "~/server/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const user = auth();

  let images;
  if (user.userId) {
    images = await getMyImages();
  }

  return (
    <main className="">
      <div className="flex flex-wrap justify-center gap-4">
        {user.userId ? (
          images?.map((image, index) => (
            <div
              key={image.id + "-" + index}
              className="flex h-48 w-48 flex-col"
            >
              <Image
                src={image.url}
                alt={image.name}
                width={192}
                height={192}
              />
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
