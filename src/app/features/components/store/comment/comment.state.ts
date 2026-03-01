import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Comment } from './comment.model';
import { GetComments, AddComment, DeleteComment, EditComment, AddReply, VoteComment } from './comment.action';
import { CommentService } from '../../../../core/services/comment-service';
import { inject } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';



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


@Injectable()
export class CommentState{
    @Selector()
    static comments(state: CommentStateModel){
        return state.comments;
    }


  constructor(private commentService: CommentService) {}

@Action(GetComments)
getComments(ctx: StateContext<CommentStateModel>) {

  return this.commentService.getComments().pipe(
    tap(response => {
      ctx.patchState({
        comments: response.comments
      });
    })
  );
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

        const deleteRecursive = (comments: Comment[]): Comment[] => {
        return comments
        .filter(comment => comment.id !== action.id)
        .map(comment => ({
            ...comment,
            replies: comment.replies
            ? deleteRecursive(comment.replies)
            : []
        }));
    };

    ctx.patchState({
        comments: deleteRecursive(state.comments)
    });
    }

 @Action(EditComment)
editComment(
  ctx: StateContext<CommentStateModel>,
  action: EditComment
) {
  const state = ctx.getState();

  const updateRecursive = (comments: Comment[]): Comment[] => {
    return comments.map(comment => {

      // If comment matches → update content
      if (comment.id === action.id) {
        return {
          ...comment,
          content: action.payload.content
        };
      }

      // If has replies → recurse
      if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: updateRecursive(comment.replies)
        };
      }

      return comment;
    });
  };

  ctx.patchState({
    comments: updateRecursive(state.comments)
  });
}
    @Action(AddReply)
    addReply(ctx: StateContext<CommentStateModel>, action: AddReply) {
    const state = ctx.getState();

    const updated = this.addReplyRecursive(
        state.comments,
        action.payload
    );

    ctx.patchState({ comments: updated });
    }

    private addReplyRecursive(
    comments: Comment[],
    payload: { parentId: number; comment: Comment }
    ): Comment[] {

    return comments.map(comment => {

        // If parent comment found → append reply
        if (comment.id === payload.parentId) {

        return {
            ...comment,
            replies: [
            ...(comment.replies || []),
            payload.comment
            ]
        };
        }

        // If not parent → search inside children recursively
        return {
        ...comment,
        replies: this.addReplyRecursive(
            comment.replies || [],
            payload
        )
        };

    });

    }

    @Action(VoteComment)
    voteComment(ctx: StateContext<CommentStateModel>, action: VoteComment) {
    const state = ctx.getState();

      const updateScoreRecursive = (comments: Comment[]): Comment[] => {
    return comments
      .map(comment => {
        if (comment.id === action.id) {
          return {
            ...comment,
            score: comment.score + action.value
          };
        }

        return {
          ...comment,
          replies: comment.replies
            ? updateScoreRecursive(comment.replies)
            : []
        };
      })
      .sort((a, b) => b.score - a.score); 
  };

    ctx.patchState({
        comments: updateScoreRecursive(state.comments)
    });
    }
}
