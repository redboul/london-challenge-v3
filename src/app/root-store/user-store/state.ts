import { User } from '../../user';

export interface State {
    isLoading?: boolean;
    error?: any;
    authenticatedUser?: User;
    currentTeam?: User;
}

export const initialState: State = {
    isLoading: false,
    error: null
};