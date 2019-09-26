import { User } from '../../user';

export interface State {
    isLoading?: boolean;
    error?: any;
    user?: User
}

export const initialState: State = {
    isLoading: false,
    error: null
};