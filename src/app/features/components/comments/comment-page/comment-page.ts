import { Component, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Comment } from '../../store/comment/comment.model';
import { CommentState } from '../../store/comment/comment.state';
import { CommonModule } from '@angular/common';
import { CommentList } from '../comment-list/comment-list';

@Component({
  selector: 'app-comment-page',
  imports: [CommonModule, CommentList],
  templateUrl: './comment-page.html',
  styleUrl: './comment-page.css',
})
export class CommentPage {

  
  comments$!: Observable<Comment[]>;

  selectedComment: Comment | null = null;

  constructor(private store: Store) {

    this.comments$ = this.store.select(CommentState.comments);

  }

  openReply(comment: Comment) {
    this.selectedComment = comment;
  }

    autoGrow(textarea: HTMLTextAreaElement) {
    if (!textarea) return;

    const minHeight = 120;
    const maxHeight = 120;

    textarea.style.height = 'auto';

    const newHeight = Math.min(textarea.scrollHeight, maxHeight);

    textarea.style.height = Math.max(newHeight, minHeight) + 'px';
  }

}
