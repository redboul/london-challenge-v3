import { Action } from "@ngrx/store";
import { Day } from "../../Day";

export enum ActionTypes {
  LOAD_DAYS_REQUEST = "Days Load Request",
  LOAD_DAYS_FAILURE = "Days Load Failure",
  LOAD_DAYS_SUCCESS = "Days Load Success",
  UPDATE_CURRENT_DAY_ID_SUCCESS = "Update Current Day Id"
}

export class LoadDaysRequestAction implements Action {
  readonly type = ActionTypes.LOAD_DAYS_REQUEST;
}

export class LoadDaysFailureAction implements Action {
  readonly type = ActionTypes.LOAD_DAYS_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class LoadDaysSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_DAYS_SUCCESS;
  constructor(public payload: { days: Day[] }) {}
}

export class UpdateCurrentDayIdSuccess implements Action {
  readonly type = ActionTypes.UPDATE_CURRENT_DAY_ID_SUCCESS;
  constructor(public payload: { dayId: string }) {}
}

export type Actions =
  | LoadDaysRequestAction
  | LoadDaysFailureAction
  | LoadDaysSuccessAction
  | UpdateCurrentDayIdSuccess;
