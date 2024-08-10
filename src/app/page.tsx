import { database } from "~/server/db";

export const dynamic = "force-dynamic";

const mockUrls = [
  "https://utfs.io/f/94668c19-9977-4701-afcb-2f96ec1cb53b-kdo2jo.jpg",
  "https://utfs.io/f/104355de-f5df-4f09-a5d8-93704af8998e-s60oqi.jpg",
  "https://utfs.io/f/09fda780-300f-4241-b113-8b1d526547ee-s60oqj.jpg",
  "https://utfs.io/f/86455042-c384-4374-9e1b-f31eedffc670-s60oqh.jpg",
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default async function HomePage() {
  const images = await database.query.images.findMany({
    orderBy: (images, { desc }) => desc(images.id),
  });

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {images.map((image, index) => (
          <div key={image.id + "-" + index} className="flex w-48 flex-col">
            <img src={image.url} alt="image" />
            <div>{image.name}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
