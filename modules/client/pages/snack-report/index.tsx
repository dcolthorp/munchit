import {
  SnackReportUI,
  SnackReportUIProps,
  SnackReportRow
} from "client/pages/snack-report/snack-report-ui";
import * as React from "react";
import { SnackReportQuery } from "client/graphql-types";

export function dataToRows(data: SnackReportQuery): SnackReportRow[] {
  if (!data.allSnacks) {
    return [];
  }

  return data.allSnacks.map((row, index) => ({
    place: index + 1,
    name: row.name,
    votes: row.voteCount,
    tags: []
  }));
}

export const SnackReportPage: React.SFC = props => (
  <SnackReportUI rows={null} />
);
