import { Component, OnInit } from '@angular/core';
import {Store} from '@ngxs/store';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { SetCurrentUser } from './features/components/store/store/user.state';
import getUserImage from './core/helpers/getUserImage';
import { CreateComment } from './features/components/comments/create-comment/create-comment';


@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, MatIconModule, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})


export class App implements OnInit {
  showCreateComment: boolean = false;

  constructor(private store: Store, private router: Router) {
  }
  ngOnInit(): void {

  //Used local storage for temporary login
  const savedUser = localStorage.getItem('currentUser');

  if (!savedUser) {
    this.showCreateComment = false;
    this.router.navigate(['/login']);
    return;
  }
   this.showCreateComment = true;
  const user = JSON.parse(savedUser);

  this.store.dispatch(
    new SetCurrentUser({
      id: user.id,
      username: user.username,
      image: {
        png: user.image?.png || getUserImage(user.username)
      }
    })
  );


  }

    
}


