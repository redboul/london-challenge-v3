import { UsersStoreState } from './users-store';
import { UserStoreState } from './user-store';

export interface State {
    users: UsersStoreState.State;
    user: UserStoreState.State;
}
