import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Day } from '../../day';

export const dayAdapter: EntityAdapter<Day> = createEntityAdapter<
    Day
>({
    selectId: model => model.id
});

export interface State extends EntityState<Day> {
    isLoading?: boolean;
    error?: any;
    currentDayId?: string;
}

export const initialState: State = dayAdapter.getInitialState({
    isLoading: false,
    error: null,
    currentDayId: null
});
