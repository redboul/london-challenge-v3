import { UsersStoreState } from './users-store';
import { UserStoreState } from './user-store';
import { DaysStoreState } from './days-store';

export interface State {
    users: UsersStoreState.State;
    user: UserStoreState.State;
    days: DaysStoreState.State
}
