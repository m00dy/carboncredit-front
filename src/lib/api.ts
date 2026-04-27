import type {
  AuthResponse,
  Comment,
  Post,
  PostsResponse,
  SitemapEntry,
  UserProfile,
  VoteResponse,
} from "./types";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

// ---------------------------------------------------------------------------
// Internal helper
// ---------------------------------------------------------------------------

async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });

  if (!res.ok) {
    let msg = `API error ${res.status}`;
    try {
      const body = await res.json();
      if (body?.error) msg = body.error;
    } catch {
      // ignore parse errors
    }
    throw new Error(msg);
  }

  return res.json() as Promise<T>;
}

function authHeaders(token: string) {
  return { Authorization: `Bearer ${token}` };
}

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

export async function register(
  username: string,
  password: string
): Promise<AuthResponse> {
  return apiFetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export async function login(
  username: string,
  password: string
): Promise<AuthResponse> {
  return apiFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

// ---------------------------------------------------------------------------
// Posts
// ---------------------------------------------------------------------------

export async function fetchPosts(
  sort: "top" | "new" = "top",
  page = 1,
  token?: string
): Promise<PostsResponse> {
  const headers = token ? authHeaders(token) : {};
  return apiFetch(`/api/posts?sort=${sort}&page=${page}`, { headers });
}

export async function fetchPost(id: string, token?: string): Promise<Post> {
  const headers = token ? authHeaders(token) : {};
  return apiFetch(`/api/posts/${id}`, { headers });
}

export async function createPost(
  data: { title: string; url?: string; content?: string },
  token: string
): Promise<Post> {
  return apiFetch("/api/posts", {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
}

export async function deletePost(id: string, token: string): Promise<void> {
  await apiFetch(`/api/posts/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
}

// ---------------------------------------------------------------------------
// Comments
// ---------------------------------------------------------------------------

export async function fetchComments(
  postId: string,
  token?: string
): Promise<Comment[]> {
  const headers = token ? authHeaders(token) : {};
  return apiFetch(`/api/posts/${postId}/comments`, { headers });
}

export async function createComment(
  postId: string,
  content: string,
  parentId: string | null,
  token: string
): Promise<Comment> {
  return apiFetch(`/api/posts/${postId}/comments`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify({ content, parent_id: parentId }),
  });
}

export async function deleteComment(id: string, token: string): Promise<void> {
  await apiFetch(`/api/comments/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
}

// ---------------------------------------------------------------------------
// Votes
// ---------------------------------------------------------------------------

export async function castVote(
  targetId: string,
  targetType: "post" | "comment",
  token: string
): Promise<VoteResponse> {
  return apiFetch("/api/votes", {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify({ target_id: targetId, target_type: targetType }),
  });
}

export async function removeVote(
  targetId: string,
  token: string
): Promise<VoteResponse> {
  return apiFetch(`/api/votes/${targetId}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
}

// ---------------------------------------------------------------------------
// Users
// ---------------------------------------------------------------------------

export async function fetchMe(token: string): Promise<UserProfile> {
  return apiFetch("/api/users/me", { headers: authHeaders(token) });
}

export async function fetchUser(username: string): Promise<UserProfile> {
  return apiFetch(`/api/users/${username}`);
}

export async function fetchUserPosts(username: string): Promise<Post[]> {
  return apiFetch(`/api/users/${username}/posts`);
}

export async function fetchSitemapEntries(): Promise<SitemapEntry[]> {
  return apiFetch("/api/sitemap/entries");
}
