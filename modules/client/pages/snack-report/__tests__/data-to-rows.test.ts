import { SnackReportQuery } from "client/graphql-types";
import { SnackReportRow } from "client/pages/snack-report/snack-report-ui";
import { dataToRows } from "client/pages/snack-report";

describe("SnackReport.dataToRows", () => {
  it("handles a failed lookup", () => {
    const data: SnackReportQuery = {
      topSnacks: null
    };

    expect(dataToRows(data)).toEqual([]);
  });

  it("creates valid rows with incrementing place counts", () => {
    const data: SnackReportQuery = {
      topSnacks: [
        {
          id: 29,
          name: "Cucumber sandwiches",
          voteCount: 71,
          tags: ["edible"]
        },
        {
          id: 79,
          name: "Falafel",
          voteCount: 11,
          tags: []
        }
      ]
    };

    const expected: SnackReportRow[] = [
      {
        place: 1,
        name: "Cucumber sandwiches",
        votes: 71,
        tags: ["edible"]
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
