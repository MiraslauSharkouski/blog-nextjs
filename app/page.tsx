import { BlogpostCard } from "@/components/general/BlogpostCard";
import { prisma } from "./utils/db";

export const revalidate = 60;

async function getData() {
  const data = await prisma.blogPost.findMany({
    select: {
      title: true,
      content: true,
      imageUrl: true,
      authorImage: true,
      authorName: true,
      id: true,
      createdAt: true,
      authorId: true,
      updatedAt: true,
    },
  });

  return data;
}
export default async function Home() {
  const data = await getData();
  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Latest posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <BlogpostCard data={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
