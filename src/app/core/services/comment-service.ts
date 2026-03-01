import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment, CommentData } from '../../features/components/store/comment/comment.model';


@Injectable({
  providedIn: 'root',
})
export class CommentService {
   constructor(private http: HttpClient) {}

getComments() {
  return this.http.get<{
    currentUser: any;
    comments: Comment[];
  }>('assets/data/data.json');
}

getUsers() {
  return this.http.get<any>('assets/data/data.json');
}



}
