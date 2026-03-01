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
  replies?: Comment[];
}

export interface User {
  id: number;
  username: string;
  image: {
    png: string;
  };
}

export interface UserData {
  username: string;
  image?: any;
}

export interface CommentData {
  currentUser: UserData;
  users: UserData[];
  comments: Comment[];
}