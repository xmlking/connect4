import { State, Action, Selector, StateContext } from '@ngxs/store';
import { CreateUser, UpdateUser } from './user.actions';
import { UserService } from '../../services/user/user.service';
import { tap } from 'rxjs/operators';

export interface UserStateModel {
  id: string;
  name: string;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    id: undefined,
    name: undefined,
  },
})
export class UserState {
  constructor(private userService: UserService) {}

  @Selector()
  public static getState(state: UserStateModel) {
    return state;
  }
  @Selector()
  public static getId(state: UserStateModel) {
    return state.id;
  }
  @Selector()
  public static getName(state: UserStateModel) {
    return state.name;
  }

  @Action(CreateUser)
  public createUser(ctx: StateContext<UserStateModel>, { payload }: CreateUser) {
    return this.userService.createUser(payload).pipe(
      tap(user => {
        ctx.patchState({ id: user.id, name: user.name || undefined });
      }),
    );
  }

  @Action(UpdateUser)
  public updateUser(ctx: StateContext<UserStateModel>, { payload }: UpdateUser) {
    return this.userService.updateUser(payload.id, { name: payload.name }).pipe(
      tap(user => {
        ctx.patchState({ name: payload.name });
      }),
    );
  }
}
