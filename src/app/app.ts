import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Store} from '@ngxs/store';
import { Observable, timestamp } from 'rxjs';
import { CommentState } from './features/components/store/comment/comment.state';
import { Comment } from './features/components/store/comment/comment.model';
import { AddComment, DeleteComment, EditComment } from './features/components/store/comment/comment.action';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-root',
  imports: [FormsModule, AsyncPipe, CommonModule, MatIconModule ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})


export class App implements OnInit {
  comments$: Observable<Comment[]>;
  commentText = '';
  isEdit: boolean = false;
  editIndex: number | null = null;
  editInputText: string = '';
  isReplyMode: boolean = false;
  replyingCommentId: number | null = null;

  constructor(private store: Store){
    this.comments$ = this.store.select(CommentState.comments);
  }
  ngOnInit(): void {
  }

    addComment(){
      const newComment: Comment = {
        id: Date.now(),
        content: this.commentText,
        createdAt: new Date().toISOString(),
        score: 0,
        user: {
          image: { png: 'assets/user.png' },
          username: 'james'
        },
        replies: []
      };

        this.store.dispatch(new AddComment(newComment));
        this.commentText = '';
    }

    deleteComment(id : number){
      this.store.dispatch(new DeleteComment(id));
    }

    editComment(id: number){
      this.isEdit = true;
      this.editIndex = id;
    }

    saveComment(index: number){
       const comments = this.store.selectSnapshot(CommentState.comments);
       
       const updateComment: Comment = {
        id: Date.now(),
        content: this.editInputText,
        createdAt: new Date().toISOString(),
        score: 0,
        user: {
          image: { png: 'assets/user.png' },
          username: 'james'
        },
        replies: []
      }
      this.store.dispatch(new EditComment(updateComment, index)); 
      console.log('New Comments', comments);
      this.editInputText = '';
      this.isEdit = false;
    }

    replyComment(){
      this.isReplyMode = true;
    }

    replyToComment(commentId: number) {
    this.replyingCommentId = commentId;
    this.isReplyMode = true;
  }

  addReply(commentId: number) {
  console.log("Replying to:", commentId, this.commentText);

  
  this.replyingCommentId = null;
}

  autoGrow(textarea: HTMLTextAreaElement) {
    if (!textarea) return;

    const minHeight = 120;
    const maxHeight = 120;

    textarea.style.height = 'auto';

    const newHeight = Math.min(textarea.scrollHeight, maxHeight);

    textarea.style.height = Math.max(newHeight, minHeight) + 'px';
  }

getTimeAgo(date: string | number): string {

  if (!date) return '';

  const timestamp = typeof date === 'string'
    ? new Date(date).getTime()
    : date;

  const diff = Date.now() - timestamp;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return `${seconds} sec ago`;
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hr ago`;

  return `${days} day${days > 1 ? 's' : ''} ago`;
}

    
}


