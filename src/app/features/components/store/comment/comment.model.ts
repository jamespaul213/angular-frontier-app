export interface CommentImage {
  png: string;
}

export interface CommentUser {
  image: CommentImage;
  username: string;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: CommentUser;
  replies: Comment[];
}