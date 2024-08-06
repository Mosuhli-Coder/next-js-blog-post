import React from "react";
import prisma from "../../../lib/db";
import { getPostBySlug } from "../../../actions/actions";

export default async function PostPage({ params }) {
  const post = await getPostBySlug(params.slug);
  return (
    <main className="flex flex-col items-center gap-y-5 p-24 text-center">
      <h1 className="text-3xl font-semibold">{post?.title}</h1>
      <p>{post?.content}</p>
    </main>
  );
}
