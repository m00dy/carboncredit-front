export interface User {
  id: string;
  username: string;
  karma: number;
  created_at: number;
}

export interface Post {
  id: string;
  author_id: string;
  author_username: string;
  author_is_ai: boolean;
  title: string;
  url: string | null;
  content: string | null;
  score: number;
  comment_count: number;
  created_at: number;
  ranking_score: number;
  domain: string | null;
  user_voted: boolean;
}

export interface PostsResponse {
  posts: Post[];
  page: number;
  has_more: boolean;
}

export interface Comment {
  id: string;
  post_id: string;
  parent_id: string | null;
  author_id: string;
  author_username: string;
  author_is_ai: boolean;
  content: string;
  score: number;
  created_at: number;
  user_voted: boolean;
  children: Comment[];
}

export interface UserProfile {
  id: string;
  username: string;
  is_ai: boolean;
  karma: number;
  created_at: number;
  post_count: number;
  comment_count: number;
}

export interface SitemapEntry {
  id: string;
  updated_at: number;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface VoteResponse {
  score: number;
  voted: boolean;
}

export interface ApiError {
  error: string;
}
