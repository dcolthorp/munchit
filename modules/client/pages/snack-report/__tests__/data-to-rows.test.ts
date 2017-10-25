import { SnackReportQuery } from "client/graphql-types";
import { SnackReportRow } from "client/pages/snack-report/snack-report-ui";
import { dataToRows } from "client/pages/snack-report";

describe("SnackReport.dataToRows", () => {
  it("handles a failed lookup", () => {
    const data: SnackReportQuery = {
      allSnacks: null
    };

    expect(dataToRows(data)).toEqual([]);
  });

  it("creates valid rows with incrementing place counts", () => {
    const data: SnackReportQuery = {
      allSnacks: [
        {
          id: 29,
          name: "Cucumber sandwiches",
          voteCount: 71
        },
        {
          id: 79,
          name: "Falafel",
          voteCount: 11
        }
      ]
    };

    const expected: SnackReportRow[] = [
      {
        place: 1,
        name: "Cucumber sandwiches",
        votes: 71,
        tags: []
      },
      {
        place: 2,
        name: "Falafel",
        votes: 11,
        tags: []
      }
    ];

    expect(dataToRows(data)).toEqual(expected);
  });
});
