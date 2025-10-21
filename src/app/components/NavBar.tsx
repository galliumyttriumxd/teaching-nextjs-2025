"use client";

import Link from "next/link";
import { useState } from "react";

export function NavBar() {
  const [searchInput, setSearchInput] = useState("");

  const searchLinkQuery = searchInput !== "" ? { q: searchInput } : {};
  // const searchLinkQuery: { q?: string } = {};
  // if (searchInput !== "") {
  //   searchLinkQuery["q"] = searchInput;
  // }

  console.log("NavBar render, searchInput:", searchInput);

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">

      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Eva Mazíková"
                  src="https://www.stvr.sk/media/a501/image/file/21/1010/eva-mazikova.jpg" />
              </div>
            </div>
        <Link className="btn btn-ghost text-xl" href="/">
          Spotify
        </Link>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto"
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <Link
          className="btn btn-ghost text-xl"
          href={{
            pathname: "/search",
            query: searchLinkQuery,
          }}
        >
          Search
        </Link>
      </div>
    </div>
  );
}
