import * as Schema from "graphql-api/schema-types";
import { Context } from "graphql-api";

/** The graphql schema-compatible typescript type required to implement any snack resolver */
export interface MinimalSnack extends Partial<Schema.Snack> {
  id: Schema.Snack["id"];
}

export const SnackResolvers = {
  async name(
    snack: MinimalSnack,
    args: {},
    context: Context
  ): Promise<Schema.Snack["name"]> {
    if (snack.name) return snack.name;

    const record = await context.snackRepository.findById.load(snack.id);
    if (!record) throw `Couldn't find a record for snack with id ${snack.id}`;
    return record.name;
  },

  async voteCount(
    snack: MinimalSnack,
    args: {},
    context: Context
  ): Promise<Schema.Snack["voteCount"]> {
    return await context.voteRepository.countForSnack.load(snack.id);
  },

  async tags(
    snack: MinimalSnack,
    args: {},
    context: Context
  ): Promise<Schema.Snack["tags"]> {
    const taggings = await context.taggingRepository.forSnack.load(snack.id);
    const tags = await context.tagRepository.forTagging.loadMany(taggings);
    return tags.map(t => t.name);
  }
};
