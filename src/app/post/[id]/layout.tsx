import type { Metadata, ResolvingMetadata } from "next";
import { fetchPost } from "@/lib/api";
import type { Post } from "@/lib/types";
import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

function buildDescription(post: Post): string {
  if (post.content) {
    return post.content.length > 150 ? post.content.substring(0, 150) + "..." : post.content;
  }
  const title = post.title;
  return `Discussion and analysis${title ? ` of "${title}"` : ""}. Read the original, share your perspective, and join the conversation on carboncredit.io.`;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;

  try {
    const post = await fetchPost(id);
    const description = buildDescription(post);
    const previousImages = (await parent).openGraph?.images || [];
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://carboncredit.io";
    const publishedTime = new Date(post.created_at * 1000).toISOString();

    return {
      title: `${post.title} | carboncredit.io`,
      description,
      alternates: {
        canonical: `${siteUrl}/post/${id}`,
      },
      openGraph: {
        title: post.title,
        description,
        url: `${siteUrl}/post/${id}`,
        siteName: "carboncredit.io",
        type: "article",
        publishedTime,
        modifiedTime: publishedTime,
        authors: [post.author_username],
        images: [
          {
            url: "/carbon.png",
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

function structuredData(post: Post, siteUrl: string) {
  const articleUrl = `${siteUrl}/post/${post.id}`;
  const publishedTime = new Date(post.created_at * 1000).toISOString();
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: buildDescription(post),
      datePublished: publishedTime,
      dateModified: publishedTime,
      author: {
        "@type": "Person",
        name: post.author_username,
      },
      url: articleUrl,
      publisher: {
        "@type": "Organization",
        name: "carboncredit.io",
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": articleUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: post.title,
          item: articleUrl,
        },
      ],
    },
  ];
}

function truncateTitle(title: string, maxLen = 60): string {
  return title.length > maxLen ? title.substring(0, maxLen - 1) + "…" : title;
}

export default async function PostLayout({ params, children }: Props) {
  const { id } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://carboncredit.io";

  let jsonLd = "";
  let postTitle = "";
  try {
    const post = await fetchPost(id);
    jsonLd = JSON.stringify(structuredData(post, siteUrl));
    postTitle = post.title;
  } catch {
    // If the post fetch fails, skip structured data and breadcrumbs
  }

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}
      {postTitle && (
        <div className="max-w-4xl mx-auto px-4 pt-4">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs font-medium"
            style={{ color: "var(--ink-muted)" }}
          >
            <Link
              href="/"
              className="hover:underline hover:text-[var(--ink-secondary)] transition-colors"
            >
              home
            </Link>
            <span aria-hidden="true">/</span>
            <span
              className="truncate max-w-xs"
              style={{ color: "var(--ink-secondary)" }}
              title={postTitle}
            >
              {truncateTitle(postTitle)}
            </span>
          </nav>
        </div>
      )}
      {children}
    </>
  );
}
