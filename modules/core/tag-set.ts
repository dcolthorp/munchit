import { Flavor } from "helpers";
import { Lens } from "@atomic-object/lenses/lib";

export type Type = Flavor<Array<string>, "TagSet">;
export const EMPTY: Type = [];

export const has = (tagSet: Type, tagName: string): boolean =>
  tagSet.indexOf(tagName) >= 0;

export const add = (tagSet: Type, tagName: string): Type =>
  has(tagSet, tagName) ? tagSet : [...tagSet, tagName].sort();

export const remove = (tagSet: Type, tagName: string): Type =>
  has(tagSet, tagName) ? tagSet.filter(t => t != tagName) : tagSet;

/** Provide a lens to get/set inclusion of an arbitrary tag in a given tag set. */
export const tagValue = (tag: string): Lens<Type, boolean> =>
  Lens.of<Type, boolean>({
    get: tagSet => has(tagSet, tag),
    set: (tagSet, value) => (value ? add(tagSet, tag) : remove(tagSet, tag))
  });
