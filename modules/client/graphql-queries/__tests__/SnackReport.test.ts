import { withContext } from "__tests__/db-helpers";
import { SnackReportQuery } from "client/graphql-types";

describe("query SnackReport", () => {
  it(
    "returns snacks in order of vote count",
    withContext(async context => {
      const graphql = context.apolloClient;

      const barSnack = await context.snackRepository.insert({ name: "Bar" });
      const fooSnack = await context.snackRepository.insert({ name: "Foo" });
      await Promise.all([
        context.voteRepository.insert({ snackId: fooSnack.id }),
        context.voteRepository.insert({ snackId: fooSnack.id }),
        context.voteRepository.insert({ snackId: barSnack.id })
      ]);

      const result = await graphql.query<SnackReportQuery>({
        query: require("../SnackReport.graphql")
      });

      if (!result.data || !result.data.topSnacks) throw "no result!";
      expect(result.data.topSnacks.length).toEqual(2);

      const fooResult = result.data.topSnacks[0];
      const barResult = result.data.topSnacks[1];

      expect(fooResult.name).toEqual("Foo");
      expect(fooResult.voteCount).toEqual(2);

      expect(barResult.name).toEqual("Bar");
      expect(barResult.voteCount).toEqual(1);
    })
  );
});
