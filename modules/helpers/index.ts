import { Lens } from "@atomic-object/lenses/lib";

export { AssertAssignable } from "./assert-assignable";

export function sleep(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

export function targetReducer<T, U>(
  reducer: (arg: U, action: any) => U,
  lens: Lens<T, U>
): (arg: T, action: any) => T {
  return (arg: T, action: any) => lens.set(arg, reducer(lens.get(arg), action));
}
