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
      const selectedTags = state.selectedTags;
      const { tag, value } = action;

      const newSelectedTags = value
        ? TagSet.add(selectedTags, tag)
        : TagSet.remove(selectedTags, tag);

      return { ...state, selectedTags: newSelectedTags };

    default:
      return state;
  }
}
