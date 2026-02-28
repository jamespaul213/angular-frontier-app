import { Component } from '@angular/core';
import { SetCurrentUser, UserState } from '../../features/components/store/store/user.state';
import { Store } from '@ngxs/store';
import { FormsModule } from '@angular/forms';
import { CommentService } from '../../core/services/comment-service';
import { Comment } from '../../features/components/store/comment/comment.model';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username = '';

  get currentUser$() {
  return this.store.select(UserState.currentUser);
}


constructor(private store: Store, private commentService: CommentService) {
  
}

login() {
  // if (!this.username.trim()) return;

  this.commentService.getUsers().subscribe((data: any) => {

  console.log('Data from service:', data); // Debugging log 
  const users = Array.isArray(data.users) ? data.users : [];

  const validUser = users.some(
    (u: any) => u.username === this.username.trim()
  );


    if (!validUser) {
      alert("Login error: Username not found");
      return;
    }

    // this.store.dispatch(
    //   new SetCurrentUser({
    //     id: Date.now(),
    //     username: data.currentUser.username
    //   })
    // );

    console.log("Logged in as:", this.username);

    this.username = '';
  });
}

}
