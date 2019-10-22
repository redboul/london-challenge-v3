import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { FulfilledChallenge } from '../../fulfilled-challenge';


export const fulfilledChallengesAdapter: EntityAdapter<FulfilledChallenge> = createEntityAdapter<
    FulfilledChallenge
>({
    selectId: model => model.id
});

export interface State extends EntityState<FulfilledChallenge> {
    isLoading?: boolean;
    error?: any;
    isAdding?: boolean;
    errorOnAdd?: any;
}

export const initialState: State = fulfilledChallengesAdapter.getInitialState({
    isLoading: false,
    error: null,
    isAdding: false,
    errorOnAdd: null,
});