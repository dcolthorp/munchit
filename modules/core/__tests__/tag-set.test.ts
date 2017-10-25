import * as TagSet from "../tag-set";

describe("TagSet.has", () => {
  it("returns true if the set contains the tagname", () => {
    expect(TagSet.has(["foo"], "foo")).toBeTruthy();
  });
  it("returns false if the set doesn't contain the value", () => {
    expect(TagSet.has(["foo"], "bar")).toBeFalsy();
  });
});

describe("TagSet.add", () => {
  it("can add a tag to a TagSet", () => {
    expect(TagSet.add(TagSet.EMPTY, "foo")).toEqual(["foo"]);
  });
  it("can keeps the tag set ordered", () => {
    expect(TagSet.add(["foo"], "bar")).toEqual(["bar", "foo"]);
  });
  it("does not duplicate entries", () => {
    const original: TagSet.Type = ["foo"];
    expect(TagSet.add(original, "foo")).toBe(original);
  });
});

describe("TagSet.remove", () => {
  it("can remove a tag from a TagSet", () => {
    expect(TagSet.remove(["bar", "foo"], "foo")).toEqual(["bar"]);
  });
  it("returns the tagSet if the tag isn't present", () => {
    const original: TagSet.Type = ["bar"];
    expect(TagSet.remove(original, "foo")).toBe(original);
  });
});
