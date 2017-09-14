import gql from "graphql-tag";
import { withContext } from "__tests__/db-helpers";

describe("Add Snack", () => {
  it(
    "Inserts a new Snack",
    withContext(async context => {
      const graphql = context.apolloClient;

      const result = await graphql.mutate<any>({
        mutation: gql`
          mutation AddSnack($name: String!) {
            snack: addSnack(name: $name) {
              id
              name
              voteCount
            }
          }
        `,
        variables: { name: "Guacamole" }
      });

      expect(result.data.snack).not.toBeFalsy();

      const snackResult: any = result.data.snack;
      expect(snackResult.id).toBeGreaterThan(0);
      expect(snackResult.name).toEqual("Guacamole");
      expect(snackResult.voteCount).toEqual(0);
    })
  );
});
