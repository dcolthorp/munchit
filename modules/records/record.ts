import { Knex } from "../db";
import * as DataLoader from "dataloader";

import keyBy from "lodash-es/keyBy";

export type RecordId = number;

/** Base type for records assumes an incrementing id */
export interface RecordBase {}

/** A Saved<Record> is a record that is from the database and therefore must have an id */
export type Saved<T extends RecordBase> = T & {
  id: RecordId;
};

abstract class TableHelpers<T extends RecordBase> {
  abstract tableName: string;
  protected abstract db: Knex;

  table() {
    return this.db.table(this.tableName);
  }

  async insert(unsaved: T): Promise<Saved<T>> {
    const ids = await this.table().insert(unsaved, "id");
    return Object.assign({}, unsaved, { id: ids[0] }) as Saved<T>;
  }

  async all(): Promise<Saved<T>[]> {
    return await this.table();
  }

  findById = new DataLoader<number, Saved<T> | undefined>(async ids => {
    const rows: Saved<T>[] = await this.table().whereIn("id", ids);
    const byId = keyBy(rows, "id");
    return ids.map(id => byId[id]);
  });
}

export interface RepositoryBase<T> extends TableHelpers<T> {
  readonly tableName: string;
}

export function RepositoryBase<T extends RecordBase>(tableName2: string) {
  return class RepositoryBase extends TableHelpers<T> {
    static readonly tableName = tableName2;
    public readonly tableName: string;
    protected db: Knex;

    constructor(db: Knex) {
      super();
      this.db = db;
    }
  };
}
