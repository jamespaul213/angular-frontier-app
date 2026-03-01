import { Component, EventEmitter, Output, Input } from '@angular/core';

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
  @Output() replyRequest = new EventEmitter<Comment>();
  @Output() deleteRequest = new EventEmitter<number>();

  constructor() {}

  openReplyModal(comment: Comment) {
    this.replyingComment = comment;
  }

  onReplyClick(comment: Comment) {
    this.replyRequest.emit(comment);
  }

}