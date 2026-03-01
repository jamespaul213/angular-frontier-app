import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CommentState } from '../../store/comment/comment.state';
import { Comment } from '../../store/comment/comment.model';
import { AddComment } from '../../store/comment/comment.action';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { CommentService } from '../../../../core/services/comment-service';
import { UserState } from '../../store/store/user.state';


@Component({
  selector: 'app-create-comment',
    imports: [FormsModule, CommonModule, MatIconModule, RouterModule],
  templateUrl: './create-comment.html',
  styleUrl: './create-comment.css',
})
export class CreateComment implements OnInit {

  comments$: Observable<Comment[]>;
    commentText = '';

    // isEdit: boolean = false;
    // editIndex: number | null = null;
    // editInputText: string = '';
    isReplyMode: boolean = false;
    // isReplySubmitted: boolean = false;
    // replyingCommentId: number | null = null;
    // replyText = '';
    // selectedComment!: Comment;
    currentUserImage: string = '';
  
    currentUser = {
    username: '',
    image: ''
  };


  currentUser$!: Observable<any>;
  currentUsers!: any;

    
  
    constructor(private store: Store, private router: Router, private commentService: CommentService) {
      this.comments$ = this.store.select(CommentState.comments);
      this.currentUserImage = this.currentUser.image;
     
    }
    ngOnInit(): void {

    this.comments$ = this.store.select(CommentState.comments);

    this.currentUser$ = this.store.select(UserState.currentUser);

      this.currentUser$.subscribe(user=>{
      this.currentUsers = user;
    });

    const user = localStorage.getItem('currentUser');

    if (!user) {
      this.router.navigate(['/login']);
    }
    
  
    }
  
  getUserImage(username: string): string {
  
    if (!username) return 'assets/avatars/default.png';
  
    const imageMap: any = {
      'yoda': 'assets/avatars/yoda.png',
      'leiaskywalker': 'assets/avatars/leiaskywalker.png',
      'lukeskywalker': 'assets/avatars/lukeskywalker.png',
      'vader': 'assets/avatars/vader.png'
    };
  
    return imageMap[username.toLowerCase()] || 'assets/avatars/default.png';
  }
    
 addComment() {

  if (!this.commentText.trim()) {
    return;
  }
  
    const storedUser = localStorage.getItem('currentUser');

    if (!storedUser) {
      console.error("Session expired");
      this.router.navigate(['/login']);
      return;
    }

  this.currentUser$.subscribe(user => {

    if (!user) return;

    const newComment: Comment = {
      id: Date.now(),
      content: this.commentText,
      createdAt: new Date().toISOString(),
      score: 0,
      user: {
        username: user.username,
        image: {
          png: user.image?.png || 'assets/avatars/default.png'
        }
      },
      replies: []
    };

    this.store.dispatch(new AddComment(newComment));

    this.commentText = '';

  });

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
