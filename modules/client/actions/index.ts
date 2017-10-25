import { PopularityMode } from "client/state";

export enum ActionTypeKeys {
  SET_POPULARITY = "SET_POPULARITY",
  CHANGE_TAG = "CHANGE_TAG",
  OTHER_ACTION = "__fake_to_support_system_events__"
}
export type ActionTypes = SetPopularityAction | ChangeTagAction | OtherAction;

export type SetPopularityAction = {
  type: ActionTypeKeys.SET_POPULARITY;
  popularityMode: PopularityMode;
};

export const setPopularity = (
  popularityMode: PopularityMode
): SetPopularityAction => ({
  type: ActionTypeKeys.SET_POPULARITY,
  popularityMode
});

export type ChangeTagAction = {
  type: ActionTypeKeys.CHANGE_TAG;
  tag: string;
  value: boolean;
};

export const changeTag = (tag: string, value: boolean): ChangeTagAction => ({
  type: ActionTypeKeys.CHANGE_TAG,
  tag,
  value
});

export type OtherAction = {
  readonly type: ActionTypeKeys.OTHER_ACTION;
};
