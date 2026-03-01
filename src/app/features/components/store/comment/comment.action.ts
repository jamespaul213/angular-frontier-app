import { Comment } from "./comment.model";

export class GetComments {
  static readonly type = '[Comment] Get Comments';
}


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
    constructor( public payload: Comment, public id: number){}
}


export class AddReply{
    static readonly type = `[Comment] Add Reply`;
    constructor(public payload:{parentId: number; comment: Comment}){}
}

export class VoteComment {
  static readonly type = '[Comment] Vote';
  constructor(public id: number, public value: 1 | -1) {}
}