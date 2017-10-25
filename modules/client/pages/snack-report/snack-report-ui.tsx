import * as React from "react";
import { TagPicker } from "client/components/tag-picker";
import * as TagSet from "core/tag-set";

require("./styles.scss");

const TAGS = [
  "Go-to",
  "Vegan",
  "Vegetarian",
  "Gluten-free",
  "Expensive",
  "Divisive"
];

export interface SnackReportRow {
  place: number;
  votes: number;
  name: string;
  tags: string[];
}

interface SnackTableProps {
  rows: SnackReportRow[];
}
export const SnackTable: React.SFC<SnackTableProps> = props => {
  const rows = props.rows.map((row, i) => (
    <tr key={i}>
      <td>{row.place}.</td>
      <td>{row.votes}</td>
      <td>{row.name}</td>
      <td>{row.tags.join(", ")}</td>
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>
          <th>Place</th>
          <th>Votes</th>
          <th>Snack</th>
          <th>Tags</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export interface SnackReportUIProps {
  rows: SnackReportRow[] | null;
  selectedTags: TagSet.Type;
  onTagChange: (tag: string, value: boolean) => void;
}

export const SnackReportUI: React.SFC<SnackReportUIProps> = props => {
  if (props.rows === null) {
    return <div className="snack-report">Loading...</div>;
  } else {
    const { onTagChange, selectedTags } = props;

    return (
      <div className="snack-report">
        <div className="snack-report-tags">
          <h2>Filter</h2>
          <TagPicker
            tags={TAGS}
            selected={selectedTags}
            onTagChange={onTagChange}
          />
        </div>

        <div className="snack-report-table">
          {props.rows.length === 0 ? (
            "No snacks to show."
          ) : (
            <SnackTable rows={props.rows} />
          )}
        </div>
      </div>
    );
  }
};
