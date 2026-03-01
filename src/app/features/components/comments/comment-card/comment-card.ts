import { Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import { Store } from '@ngxs/store';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Comment } from '../../store/comment/comment.model';
import { AddReply } from '../../store/comment/comment.action';
import { DeleteComment, EditComment, VoteComment } from '../../store/comment/comment.action';
import { CommentState } from '../../store/comment/comment.state';
import { UserState } from '../../store/store/user.state';
import { User } from '../../store/store/user.state';
import { Observable} from 'rxjs';
import getUserImage from '../../../../core/helpers/getUserImage';
import getTimeAgo from '../../../../core/helpers/getTimeAgo';


@Component({
  selector: 'app-comment-card',
  imports: [FormsModule, CommonModule],
  templateUrl: './comment-card.html',
  styleUrls: ['./comment-card.css'],
})
export class CommentCardComponent {

  @Input() comment!: Comment;
  
  @Output() deleteRequest = new EventEmitter<number>();
  @Output() replyRequest = new EventEmitter<Comment>();

  replyText = '';
  selectedReplyParentId: number | null = null;
  originalComment: string = '';

  timeAgo: string | number = '';
  
  isThereActiveModal: boolean = false;

  commentText = '';
  currentUser$: any;
  isEdit: boolean = false;
  editIndex: number | null = null;
  editInputText: string = '';
  currentUser: any ={
    user: '',
    image: { png: '' }
  }

  Users$!: Observable<User | null>;
  
  
  isReplyMode: boolean = false;
  isReplySubmitted: boolean = false;

  selectedComment!: Comment;


  constructor(private store: Store) {
    this.currentUser$ = this.store.select<User | null>(
    UserState.currentUser
);
  }

  ngOnInit(): void {
     this.timeAgo = getTimeAgo(this.comment.createdAt);
    this.Users$ = this.store.select(UserState.currentUser);

    this.currentUser$.subscribe((user: any) => {
          if (!user) return; 
       this.currentUser = user.id;

      this.currentUser = {
        user: user.username,
        image: {
          png: getUserImage(user.username)
        }
      };
    });

  }
  
  onReplyClick(parentId: number) {
     this.selectedReplyParentId=  parentId;
  }


  editComment(i :number) {
  this.selectedReplyParentId = null;

  this.isEdit = !this.isEdit;

  this.editIndex = this.comment?.id;

  this.originalComment = this.comment.content;

  this.editInputText = this.comment.content;
    
  }


  cancelReply() {
    this.replyText = '';
    this.selectedReplyParentId = null;
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
          username: this.currentUser.user,
          image: {
            png: this.currentUser.image.png
          }
        },
        replies: []
      }
    }));
    this.isReplySubmitted = true;
    this.replyText = '';
    this.selectedReplyParentId= null;
  }

    saveComment(index: number){
         const comments = this.store.selectSnapshot(CommentState.comments);

          if(this.editInputText === this.originalComment){
          alert("You did not make any changes");
          return;
        }
         
         const updateComment: Comment = {
          id: this.comment.id,
          content: this.editInputText,
          createdAt: new Date().toISOString(),
          score: 0,
          user: {
            image: { png: 'assets/avatars/user.png' },
            username: this.currentUser.user
          },
          replies: []
        }
        this.store.dispatch(new EditComment(updateComment, index)); 
        this.editInputText = '';
        this.isEdit = false;
      }

  deleteComment(id : number){
      this.store.dispatch(new DeleteComment(id));
    }

  upvote(id: number) {
  this.store.dispatch(new VoteComment(id, 1));
  }

  downvote(id: number) {
    this.store.dispatch(new VoteComment(id, -1));
  }

autoGrow(textarea: HTMLTextAreaElement) {
  if (!textarea) return;

  textarea.style.height = 'auto';

  const maxHeight = 200; // allow more growth

  const newHeight = Math.min(textarea.scrollHeight, maxHeight);

  textarea.style.height = newHeight + 'px';
}


}