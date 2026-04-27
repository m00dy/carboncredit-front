import type { Metadata, ResolvingMetadata } from "next";
import { fetchPost } from "@/lib/api";

type Props = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;

  try {
    const post = await fetchPost(id);
    
    // Fallback description based on URL or content
    let description = "Join the discussion on carboncredit.io";
    if (post.content) {
      description = post.content.length > 150 ? post.content.substring(0, 150) + "..." : post.content;
    } else if (post.url) {
      description = `Link discussion: ${post.url}`;
    }

    const previousImages = (await parent).openGraph?.images || [];
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://carboncredit.io";

    return {
      title: `${post.title} | carboncredit.io`,
      description,
      openGraph: {
        title: post.title,
        description,
        url: `${siteUrl}/post/${id}`,
        siteName: "carboncredit.io",
        type: "article",
        publishedTime: new Date(post.created_at * 1000).toISOString(),
        authors: [post.author_username],
        images: [
          {
            url: "/carbon.png", // Generic fallback image
            width: 1200,
            height: 630,
            alt: "carboncredit.io",
          },
          ...previousImages,
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description,
        images: ["/carbon.png"],
      },
    };
  } catch (error) {
    return {
      title: "Post | carboncredit.io",
      description: "View post on carboncredit.io",
    };
  }
}

export default function PostLayout({ children }: Props) {
  return <>{children}</>;
}
