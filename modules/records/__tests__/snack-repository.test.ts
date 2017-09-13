import { SnackRepository } from "records/snack-record";
import { getConnection, destroyConnection, Knex } from "db";
import { VoteRepository } from "records/vote-record";

async function truncateAll(knex: Knex) {
  const result = await knex.raw(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema='public'
      AND table_type='BASE TABLE';
   `);
  const tables: string[] = result.rows.map((r: any) => r.table_name);
  const recordTables = tables.filter(t => !t.includes("knex"));

  const promises = recordTables.map(tableName => {
    try {
      return knex.raw(`TRUNCATE ${tableName} CASCADE`);
    } catch (e) {
      console.error(e);
    }
  });
  await Promise.all(promises);
}

describe("SnackRepository", () => {
  const knex = getConnection();
  let snackRepo = new SnackRepository(knex);
  let voteRepo = new VoteRepository(knex);

  beforeAll(async () => truncateAll(knex));
  afterAll(destroyConnection);

  it("Can insert and find records", async () => {
    const snack = await snackRepo.insert({ name: "Foo" });
    expect(snack.id).not.toBeFalsy();

    const lookedUpSnack = await snackRepo.findById.load(snack.id);

    if (!lookedUpSnack) throw "couldn't find snack";
    expect(lookedUpSnack.id).toEqual(snack.id);
  });

  it("Can find the votes for a snack", async () => {
    const snack = await snackRepo.insert({ name: "Bar" });
    const vote = await voteRepo.insert({ snackId: snack.id });

    const votesOfSnack = await voteRepo.allForSnack.load(snack);
    expect(votesOfSnack.length).toEqual(1);
  });

  it("Can find the snack for a vote", async () => {
    const snack = await snackRepo.insert({ name: "Baz" });
    const vote = await voteRepo.insert({ snackId: snack.id });

    const voteSnack = await snackRepo.forVote.load(vote);
    expect(voteSnack.id).toEqual(snack.id);
  });
});
