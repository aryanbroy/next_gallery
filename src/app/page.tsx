import Link from "next/link";

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

export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {[...mockImages, ...mockImages].map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} alt="image" />
          </div>
        ))}
      </div>
    </main>
  );
}
