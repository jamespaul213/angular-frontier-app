import { State, Selector, Action, StateContext } from '@ngxs/store';

export interface User {
  id: number;
  username: string;
 image: { png: string };
}

export interface UserStateModel {
  currentUser: User | null;
}

export class SetCurrentUser {
  static readonly type = '[User] Set Current User';

  constructor(public payload: User) {}
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    currentUser: null
  }
})
export class UserState {

@Selector()
static currentUser(state: UserStateModel): User | null {
  return state.currentUser;
}

  @Action(SetCurrentUser)
  setUser(ctx: StateContext<UserStateModel>, action: SetCurrentUser) {
    ctx.patchState({
      currentUser: action.payload
    });
  }
}