import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Comment } from './comment.model';
import { AddComment, DeleteComment, EditComment } from './comment.action';


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

 @Action(DeleteComment)
    deleteComment(
        ctx: StateContext<CommentStateModel>,
        action: DeleteComment
    ) : any{
        const state = ctx.getState();

        const deletedComment = state.comments.filter(comment => comment.id !== action.id);

        ctx.patchState({
           comments: deletedComment
        });
    }

 @Action(EditComment)
    editComment(
        ctx: StateContext<CommentStateModel>,
        action: EditComment
    ){
        const state = ctx.getState();

        const updatedComment = state.comments.map((data:any,i:number) => {
            if(action.index === i){
                return action.payload;
            }else{
                return data
            }
        })

          ctx.patchState({
        comments: updatedComment
    });
    }
}
