import { Routes } from '@angular/router';
import { CommentPage } from './features/components/comments/comment-page/comment-page';
import { Login } from './auth/login/login';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: Login },

  { path: 'comments', component: CommentPage },

  { path: '**', redirectTo: 'login' } // fallback
];
