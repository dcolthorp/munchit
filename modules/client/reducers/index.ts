import * as State from "../state";
import { ActionTypeKeys, ActionTypes } from "client/actions";
import * as TagSet from "core/tag-set";

export function rootReducer(
  state: State.Type = State.DEFAULT,
  action: ActionTypes
): State.Type {
  switch (action.type) {
    case ActionTypeKeys.SET_POPULARITY:
      return State.popularityMode.set(state, action.popularityMode);

    case ActionTypeKeys.CHANGE_TAG:
      const { tag, value } = action;

      // With update/set:
      // return State.selectedTags.update(state, s =>
      //   TagSet.tagValue(tag).set(s, value)
      // );

      // Using comp:
      return State.selectedTags.comp(TagSet.tagValue(tag)).set(state, value);

    default:
      return state;
  }
}
