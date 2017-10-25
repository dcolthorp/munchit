import { withContext } from "__tests__/db-helpers";
import {
  SnackReportQuery,
  SnackReportQueryVariables
} from "client/graphql-types";

describe("query SnackReport", () => {
  it(
    "returns snacks in order of vote count",
    withContext(async context => {
      const graphql = context.apolloClient;

      const barSnack = await context.snackRepository.insert({ name: "Bar" });
      const fooSnack = await context.snackRepository.insert({ name: "Foo" });

      const tag = await context.tagRepository.insert({ name: "Filling" });
      await context.taggingRepository.insert({
        snackId: fooSnack.id,
        tagId: tag.id
      });

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
      expect(fooResult.tags).toEqual(["Filling"]);

      expect(barResult.name).toEqual("Bar");
      expect(barResult.voteCount).toEqual(1);
      expect(barResult.tags).toEqual([]);
    })
  );

  it(
    "filters snacks by tag",
    withContext(async context => {
      const graphql = context.apolloClient;

      const fooSnack = await context.snackRepository.insert({ name: "Foo" });
      await context.snackRepository.insert({ name: "Bar" });

      const tag = await context.tagRepository.insert({ name: "Smelly" });
      await context.taggingRepository.insert({
        snackId: fooSnack.id,
        tagId: tag.id
      });

      const variables: SnackReportQueryVariables = {
        tags: ["Smelly"]
      };
      const result = await graphql.query<SnackReportQuery>({
        query: require("../SnackReport.graphql"),
        variables
      });

      if (!result.data || !result.data.topSnacks) throw "no result!";

      expect(result.data.topSnacks.length).toEqual(1);

      const snackResult1 = result.data.topSnacks[0];
      expect(snackResult1.name).toEqual("Foo");
    })
  );
});
