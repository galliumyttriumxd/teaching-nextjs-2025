import { DB } from "@/lib/db-types";
import SQLite from "better-sqlite3";
import { Kysely, SqliteDialect } from "kysely";
import Link from "next/link";
 
export default async function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { q } = searchParams;
  const dialect = new SqliteDialect({ database: new SQLite("db.sqlite") });
  const db = new Kysely<DB>({ dialect });
 
  const albums = await db
    .selectFrom("albums")
    .innerJoin("authors", "albums.author_id", "authors.id")
    .select([
      "albums.id",
      "albums.name",
      "albums.release_date",
      "authors.name as author_name",
    ])
    .where("albums.name", "like", `%${q}%`)
    .execute();
 
  const authors = await db
    .selectFrom("authors")
    .selectAll()
    .where("authors.name", "like", `%${q}%`)
    .execute();
 
  const songs = await db
    .selectFrom("songs")
    .selectAll()
    .where("songs.name", "like", `%${q}%`)
    .execute();
 
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">

    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Search Results for {q}</h1>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Albums</h2>
        {albums.length > 0 ? (
          <ul>
            {albums.map((album) => (
              <li key={album.id}>
                <Link href={`/album/${album.id}`} className="text-blue-600 hover:underline">
                  {album.name} by {album.author_name}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No albums found.</p>
        )}
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Authors</h2>
        {authors.length > 0 ? (
          <ul>
            {authors.map((author) => (
              <li key={author.id}>
                  {author.name}
              </li>
            ))}
          </ul>
        ) : (
          <p>No authors found.</p>
        )}
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">Songs</h2>
        {songs.length > 0 ? (
          <ul>
            {songs.map((song) => (
              <li key={song.id}>
                {song.name} (Album ID: {song.album_id})
              </li>
            ))}
          </ul>
        ) : (
          <p>No songs found.</p>
        )}
      </section>
    </div>
    </div>
  );
}