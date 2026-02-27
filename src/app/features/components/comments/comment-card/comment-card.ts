import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Comment } from '../../store/comment/comment.model';
import { AddReply } from '../../store/comment/comment.action';
import { DeleteComment, AddComment, EditComment } from '../../store/comment/comment.action';
import { CommentState } from '../../store/comment/comment.state';

@Component({
  selector: 'app-comment-card',
  imports: [FormsModule, CommonModule],
  templateUrl: './comment-card.html',
  styleUrls: ['./comment-card.css'],
})
export class CommentCardComponent {

  @Input() comment!: Comment;

  replyText = '';
  replyingCommentId: number | null = null;

  commentText = '';

  isEdit: boolean = false;
  editIndex: number | null = null;
  editInputText: string = '';

  isReplyMode: boolean = false;
  isReplySubmitted: boolean = false;

  selectedComment!: Comment;

  constructor(private store: Store) {}

  
  onReplyClick() {
    this.replyingCommentId = this.comment.id;
  }


  editComment() {
    this.isEdit = true;
    this.editIndex = this.comment.id;
    this.editInputText = this.comment.content;
  }


  cancelReply() {
    this.replyText = '';
    this.replyingCommentId = null;
  }


  submitReply(parentId: number) {

    if (!this.replyText.trim()) return;

    this.store.dispatch(new AddReply({
      parentId,
      comment: {
        id: Date.now(),
        content: this.replyText,
        createdAt: new Date().toISOString(),
        score: 0,
        user: {
          username: 'You',
          image: {
            png: 'assets/user.png'
          }
        },
        replies: []
      }
    }));

    this.replyText = '';
    this.replyingCommentId = null;
  }

    saveComment(index: number){
         const comments = this.store.selectSnapshot(CommentState.comments);
         
         const updateComment: Comment = {
          id: this.comment.id,
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

    deleteComment(id : number){
      this.store.dispatch(new DeleteComment(id));
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