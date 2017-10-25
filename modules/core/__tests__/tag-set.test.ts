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

describe("tagValue", () => {
  it("Can get presence of a tag in a tag set", () => {
    expect(TagSet.tagValue("foo").get(["foo"])).toBe(true);
    expect(TagSet.tagValue("bar").get(["foo"])).toBe(false);
  });

  it("Can set presence of a tag into a tag set", () => {
    expect(TagSet.tagValue("foo").set(["bar"], true)).toEqual(["bar", "foo"]);
    expect(TagSet.tagValue("foo").set(["foo"], false)).toEqual(TagSet.EMPTY);
    expect(TagSet.tagValue("foo").set(["foo"], true)).toEqual(["foo"]);
    expect(TagSet.tagValue("bar").set(["foo"], false)).toEqual(["foo"]);
  });

  it("Can update a tag in a tagset", () => {
    expect(TagSet.tagValue("foo").update(["foo"], b => !b)).toEqual(
      TagSet.EMPTY
    );

    expect(TagSet.tagValue("bar").update(["foo"], b => !b)).toEqual([
      "bar",
      "foo"
    ]);
  });
});
