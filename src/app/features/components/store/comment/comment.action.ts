import { Comment } from "./comment.model";

export class AddComment {
    static readonly type = '[Comment] Add';
    constructor(public payload: Comment){}
}