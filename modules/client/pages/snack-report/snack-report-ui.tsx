import * as React from "react";

export interface SnackReportRow {
  place: number;
  votes: number;
  name: string;
  tags: string[];
}

export interface SnackReportUIProps {
  rows: SnackReportRow[] | null;
}

export const SnackReportUI: React.SFC<SnackReportUIProps> = props => {
  if (props.rows === null) {
    return <div className="snack-report">Loading...</div>;
  } else if (props.rows.length === 0) {
    return <div className="snack-report">No snacks to show.</div>;
  } else {
    const rows = props.rows.map((row, i) => (
      <tr key={i}>
        <td>{row.place}.</td>
        <td>{row.votes}</td>
        <td>{row.name}</td>
        <td>{row.tags.join(", ")}</td>
      </tr>
    ));

    return (
      <div className="snack-report">
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
      </div>
    );
  }
};
