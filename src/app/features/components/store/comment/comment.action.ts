import { Comment } from "./comment.model";

export class AddComment {
    static readonly type = '[Comment] Add';
    constructor(public payload: Comment){}
}

export class DeleteComment{
    static readonly type = '[Delete] Comment';
    constructor(public id: number){}
}

export class EditComment{
    static readonly type = '[Edit] Comment';
    constructor( public payload: Comment, public index: number){}
}