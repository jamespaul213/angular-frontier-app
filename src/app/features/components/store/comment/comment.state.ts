import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Comment } from './comment.model';
import { AddComment } from './comment.action';


export interface CommentStateModel{
    comments: Comment[];
    loading: boolean;
}


@State<CommentStateModel>({
    name: 'comment',
    defaults: {
        comments: [],
        loading: false
    }
})

export class CommentState{
    @Selector()
    static comments(state: CommentStateModel){
        return state.comments;
    }


@Action(AddComment)
    addComment(
        ctx: StateContext<CommentStateModel>,
        action: AddComment
    ): void{
        const state = ctx.getState();
    

    ctx.patchState({
        comments:[...state.comments, action.payload]
    });
  }
}
