import * as React from "react";
import * as TagSet from "core/tag-set";

export interface Props {
  readonly tags: ReadonlyArray<string>;
  readonly selected: TagSet.Type;
  readonly onTagChange: (tag: string, value: boolean) => void;
}

export const TagPicker: React.SFC<Props> = props => {
  const { onTagChange, selected, tags } = props;
  if (tags.length === 0) return null;

  const entries = tags.map(tag => {
    const checked = TagSet.has(selected, tag);
    return (
      <li key={tag}>
        <label>
          <input
            type="checkbox"
            checked={checked}
            onChange={event => onTagChange(tag, !checked)}
          />
          {tag}
        </label>
      </li>
    );
  });
  return <ul>{entries}</ul>;
};
