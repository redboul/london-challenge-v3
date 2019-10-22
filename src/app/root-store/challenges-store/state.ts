import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Challenge } from '../../challenge';


export const challengesAdapter: EntityAdapter<Challenge> = createEntityAdapter<
    Challenge
>({
    selectId: model => model.id
});

export interface State extends EntityState<Challenge> {
    isLoading?: boolean;
    error?: any;
}

export const initialState: State = challengesAdapter.getInitialState({
    isLoading: false,
    error: null
});