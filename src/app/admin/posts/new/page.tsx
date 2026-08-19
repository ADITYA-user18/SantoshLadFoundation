import { PostForm } from "@/components/admin/PostForm";

export default function NewPostPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-navy">New Post</h1>
        <p className="mt-1 text-sm text-muted">
          Create a new post. Save as draft or publish directly to the public site.
        </p>
      </div>
      <PostForm mode="create" />
    </div>
  );
}
