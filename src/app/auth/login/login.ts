import { Component } from '@angular/core';
import { SetCurrentUser, UserState } from '../../features/components/store/store/user.state';
import { Store } from '@ngxs/store';
import { FormsModule } from '@angular/forms';
import { CommentService } from '../../core/services/comment-service';
import { Comment } from '../../features/components/store/comment/comment.model';
import getAllUsers from '../../core/helpers/getAllUsers';
import getUserImage from '../../core/helpers/getUserImage';
import { Router } from '@angular/router';

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


constructor(private store: Store, private commentService: CommentService, private router: Router) {
  
}

login() {

  if (!this.username.trim()) return;
  

  this.commentService.getUsers().subscribe((data: any) => {

    const allUsers = getAllUsers(data);

    const foundUser = allUsers.find(
      user => user.username.toLowerCase() === this.username.trim().toLowerCase()
    );

    if (!foundUser) {
      alert("Login error: Username not found");
      return;
    }
    localStorage.setItem(
  'currentUser',
  JSON.stringify({
    id: foundUser.id,
    username: foundUser.username,
    image: {
      png: getUserImage(foundUser.username)
    }
  })
);
    // Dispatch to NGXS
    this.store.dispatch(
      new SetCurrentUser({
        id: foundUser.id,
        username: foundUser.username,
        image: {
          png: getUserImage(foundUser.username)
        }
      })
    );

    console.log("Logged in as:", foundUser.username);
    this.router.navigate(['/comments']);

    this.username = '';

  });
}
}
