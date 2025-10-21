import Link from "next/link";
import { getDb } from "@/lib/db";

export default async function AuthorDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  
  const db = getDb();
  const { id } = await params;
  const authorId = parseInt(id);

  if (isNaN(authorId)) return <div>Invalid author id</div>;

  const author = await db
    .selectFrom("authors")
    .select(["id", "name", "bio"])
    .where("id", "=", authorId)
    .executeTakeFirst();

  if (!author) return <div>Author not found</div>;

  const albums = await db
    .selectFrom("albums")
    .select(["id", "name", "release_date"])
    .where("author_id", "=", authorId)
    .execute();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start max-w-xl">
        <h1 className="text-3xl font-bold">{author.name}</h1>
        <p className="text-gray-700 whitespace-pre-line">{author.bio}</p>

        <div className="w-full mt-8">
          <h2 className="text-2xl font-semibold mb-4">Albums</h2>
          {albums.length === 0 ? (
            <p>This author has no albums yet.</p>
          ) : (
            <ul className="list-disc pl-5 space-y-2">
              {albums.map((album) => (
                <li key={album.id}>
                  <Link
                    href={`/album/${album.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {album.name}
                  </Link>{" "}
                  <span className="text-sm text-gray-500">
                    ({album.release_date})
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
