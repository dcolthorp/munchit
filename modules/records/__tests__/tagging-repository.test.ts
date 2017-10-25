import { getConnection, destroyConnection } from "db";
import { truncateAll } from "__tests__/db-helpers";
import { TagRepository } from "records/tag-record";
import { TaggingRepository } from "records/tagging-record";
import { SnackRepository } from "records/snack-record";

describe("TaggingRepository", () => {
  const knex = getConnection();
  let snackRepo = new SnackRepository(knex);
  let tagRepo = new TagRepository(knex);
  let taggingRepo = new TaggingRepository(knex);

  // WARNING: These tests all run in the same transaction,
  // so unique constraints can be violated between them.
  beforeAll(async () => truncateAll(knex));
  afterAll(destroyConnection);

  it("Can find taggings for a snack", async () => {
    const tag = await tagRepo.insert({ name: "Food" });
    const snack = await snackRepo.insert({ name: "Snack" });

    const tagging = await taggingRepo.insert({
      tagId: tag.id,
      snackId: snack.id
    });

    const foundTaggings = await taggingRepo.forSnack.load(snack.id);
    expect(foundTaggings.map(t => t.id)).toContain(tagging.id);
  });
});
