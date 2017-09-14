import { Context } from "graphql-api";
import { MinimalSnack } from "graphql-api/resolvers/snack";

export const QueryResolvers = {
  async allSnacks(
    query: {},
    args: {},
    context: Context
  ): Promise<MinimalSnack[]> {
    return await context.snackRepository.all();
  }
};
