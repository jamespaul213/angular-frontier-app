import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Store } from '@ngxs/store';

import { Comment } from '../../store/comment/comment.model';
import { CommonModule } from '@angular/common';
import { CommentCardComponent } from '../comment-card/comment-card';

@Component({
  selector: 'app-comment-list',
  imports: [CommonModule,CommentCardComponent],
  templateUrl: './comment-list.html',
  styleUrls: ['./comment-list.css']
})
export class CommentList {

  replyingComment: Comment | null = null;
  @Input() comments: Comment[] = [];
  @Output() reply = new EventEmitter<Comment>();

  constructor(private store: Store) {}

  openReplyModal(comment: Comment) {
    this.replyingComment = comment;
  }

  onReplyClick(comment: Comment) {
    this.reply.emit(comment);
  }

}