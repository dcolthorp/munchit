import { Flavor } from "helpers";

export type Type = Flavor<Array<string>, "TagSet">;
export const EMPTY: Type = [];

export const has = (tagSet: Type, tagName: string): boolean =>
  tagSet.indexOf(tagName) >= 0;

export const add = (tagSet: Type, tagName: string): Type =>
  has(tagSet, tagName) ? tagSet : [...tagSet, tagName].sort();

export const remove = (tagSet: Type, tagName: string): Type =>
  has(tagSet, tagName) ? tagSet.filter(t => t != tagName) : tagSet;
