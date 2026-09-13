import { fetchPost, fetchComments } from "@/lib/api";
import type { Post, Comment } from "@/lib/types";
import { PostView } from "./PostView";

type Props = {
  params: Promise<{ id: string }>;
};

/**
 * Renders the post server-side so crawlers see the headline, body and comments
 * in the HTML instead of an empty client-rendered shell. Signed-in visitors get
 * their own vote state from the client-side refetch in PostView.
 */
async function loadPost(id: string): Promise<{
  post: Post | null;
  comments: Comment[];
}> {
  try {
    const [post, comments] = await Promise.all([
      fetchPost(id),
      fetchComments(id),
    ]);
    return { post, comments };
  } catch {
    // PostView retries in the browser and shows the error there.
    return { post: null, comments: [] };
  }
}

export default async function PostPage({ params }: Props) {
  const { id } = await params;
  const { post, comments } = await loadPost(id);

  return <PostView id={id} initialPost={post} initialComments={comments} />;
}
