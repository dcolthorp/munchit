import {
  SnackReportUI,
  SnackReportUIProps,
  SnackReportRow
} from "client/pages/snack-report/snack-report-ui";
import { SnackReportQuery } from "client/graphql-types";
import { graphql } from "react-apollo";

export function dataToRows(data: SnackReportQuery): SnackReportRow[] {
  if (!data.topSnacks) {
    return [];
  }

  return data.topSnacks.map((row, index) => ({
    place: index + 1,
    name: row.name,
    votes: row.voteCount,
    tags: row.tags
  }));
}

const wireToApollo = graphql<
  SnackReportQuery,
  {},
  SnackReportUIProps
>(require("client/graphql-queries/SnackReport.graphql"), {
  props(result): SnackReportUIProps {
    if (!result.data || result.data.loading) {
      return {
        rows: null,
        onTagChange: () => {},
        selectedTags: []
      };
    } else {
      return {
        rows: dataToRows(result.data),
        onTagChange: () => {},
        selectedTags: ["Vegan"]
      };
    }
  }
});

export const SnackReportPage = wireToApollo(SnackReportUI);
