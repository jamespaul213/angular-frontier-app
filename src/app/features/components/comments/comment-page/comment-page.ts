import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Comment } from '../../store/comment/comment.model';
import { CommentState } from '../../store/comment/comment.state';
import { CommonModule } from '@angular/common';
import { CommentList } from '../comment-list/comment-list';
import { DeleteComment, GetComments } from '../../store/comment/comment.action';
import { MatDialog} from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteModal } from '../../../modals/delete-modal/delete-modal';
import { UserState, User } from '../../store/store/user.state';
import { CreateComment } from '../create-comment/create-comment';


@Component({
  selector: 'app-comment-page',
  imports: [CommonModule, CommentList, MatDialogModule, CreateComment],
  templateUrl: './comment-page.html',
  styleUrl: './comment-page.css',
})
export class CommentPage implements OnInit{

  activeEditId: number | null = null;
  activeReplyId: number | null = null;

  comments$!: Observable<Comment[]>;
  currentUser$!: Observable<User | null>;

  selectedComment: Comment | null = null;

  selectedCommentId: number | null = null;
  showDeleteModal: boolean = false;

  constructor(private store: Store, private dialog: MatDialog) {
    this.comments$ = this.store.select(CommentState.comments);
  }

  ngOnInit(): void {
  this.currentUser$ = this.store.select(UserState.currentUser);
  const comments = this.store.selectSnapshot(CommentState.comments);

  if (!comments || comments.length === 0) {
    alert('No comments found. Please add a comment to see it here.');
    this.store.dispatch(new GetComments());
  }
}

onDeleteComment(commentId: number) {
  console.log("Delete comment id:", commentId);

  // Call API / NGXS action / service here
  this.store.dispatch(new DeleteComment(commentId));
}

editModeChange(id: number | null) {
  this.activeReplyId = null;
  this.activeEditId = id;
}

replyModeChange(id: number | null) {
  this.activeEditId = null;
  this.activeReplyId = id;
}


openDeleteModal(commentId: number) {

  const dialogRef = this.dialog.open(DeleteModal, {
    width: '600px',
      panelClass: 'delete-dialog',
    data: { commentId }
  });

   console.log(commentId);
  dialogRef.afterClosed().subscribe(result => {

    if (result === true) {
      this.store.dispatch(new DeleteComment(commentId));
    }

  });

}

openModal() {
  this.dialog.open(DeleteModal, {
    width: '400px',
    disableClose: false
  });
  console.log('Modal opened');
}

  openReply(comment: Comment) {
    this.selectedComment = comment;
  }

// for adjusting to the size of the text-area content
  autoGrow(textarea: HTMLTextAreaElement) {
    if (!textarea) return;

    const minHeight = 120;
    const maxHeight = 120;

    textarea.style.height = 'auto';

    const newHeight = Math.min(textarea.scrollHeight, maxHeight);

    textarea.style.height = Math.max(newHeight, minHeight) + 'px';
  }

}
