import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/cms";
import { PostForm } from "@/components/admin/PostForm";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function EditPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-navy">Edit Post</h1>
        <p className="mt-1 text-sm text-muted">
          Editing: <span className="font-medium text-ink">{post.title}</span>
        </p>
      </div>
      <PostForm mode="edit" initial={post} />
    </div>
  );
}
