import * as State from "../state";

import { Action } from "redux";
import { Lens } from "@atomic-object/lenses";

const defaultState: State.Type = {
  router: undefined as any, // provided at startup
  apollo: undefined as any // provided at startup
};

export function targetReducer<T, U>(
  reducer: (arg: U, action: any) => U,
  lens: Lens<T, U>
): (arg: T, action: any) => T {
  return (arg: T, action: any) => lens.set(arg, reducer(lens.get(arg), action));
}

export function rootReducer(
  state: State.Type = defaultState,
  action: Action
): State.Type {
  return state;
}
