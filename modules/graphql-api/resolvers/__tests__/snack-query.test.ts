import gql from "graphql-tag";
import { withContext } from "__tests__/db-helpers";

describe("Snack queries", () => {
  it(
    "works",
    withContext(async context => {
      const graphql = context.apolloClient;

      const snack = await context.snackRepository.insert({ name: "Foo" });
      await Promise.all([
        context.voteRepository.insert({ snackId: snack.id }),
        context.voteRepository.insert({ snackId: snack.id })
      ]);

      const result = await graphql.query<any>({
        query: gql`
          query Snacks {
            allSnacks {
              id
              name
              voteCount
            }
          }
        `
      });

      expect(result.data.allSnacks.length).toEqual(1);

      const snackResult: any = result.data.allSnacks[0];
      expect(snackResult.name).toEqual("Foo");
      expect(snackResult.voteCount).toEqual(2);
    })
  );
});
