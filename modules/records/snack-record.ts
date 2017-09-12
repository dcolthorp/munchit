import { Knex } from "../db";
import { RecordBase, RepositoryBase, Saved, RecordId } from "./record";
import { AssertAssignable } from "helpers";
import { Snack } from "core";
import * as Dataloader from "dataloader";
import keyBy from "lodash-es/keyBy";
import groupBy from "lodash-es/groupBy";

interface UnsavedSnack {
  name: string;
}
interface SavedSnack extends UnsavedSnack {
  id: RecordId;
  createdAt: Date;
}

interface RecordInfo<Unsaved, Saved, Id extends keyof Saved> {
  _saved: Saved;
  _unsaved: Unsaved;
  _id: Id;
}

function recordInfo<Unsaved, Saved, Id extends keyof Saved>(
  id: Id
): RecordInfo<Unsaved, Saved, Id> {
  return { _id: id } as any;
}

const SnackT = recordInfo<UnsavedSnack, SavedSnack, "id">("id");

type SavedR<T extends { _saved: any }> = T["_saved"];
type UnsavedR<T extends { _unsaved: any }> = T["_unsaved"];
type IdR<K extends { _id: string }> = K["_id"];
function idOf<Id extends string>(recordInfo: { _id: Id }) {
  return recordInfo._id;
}

export interface SnackRecord extends RecordBase {
  name: string;
}

export interface VoteRecord extends RecordBase {
  snackId: number;
  date: string;
}
type _check = AssertAssignable<Snack, SavedR<typeof SnackT>>;

function associationOf<U, S, I extends keyof S>(record: RecordInfo<U, S, I>) {
  type SourceRecord = SavedR<typeof record>;
  type Id = IdR<typeof record>;
  type IdType = SourceRecord[Id];
  return {
    hasMany<DestType, K extends keyof DestType>(
      repo: RepositoryBase<DestType>,
      foreignKey: K
    ): Dataloader<SourceRecord | IdType, DestType[]> {
      type FkType = DestType[K];
      return new Dataloader<SourceRecord | IdType, DestType[]>(async args => {
        const ids: IdType[] = args.map(
          arg =>
            typeof arg === "object"
              ? (arg as SourceRecord)[record._id] as IdType
              : arg
        );
        const records = await repo.table().whereIn(foreignKey, ids as any[]);
        const table = groupBy<DestType>(records, foreignKey);
        const ordered = ids.map(id => table[(id as any).toString()]);
        return ordered;
      });
    },

    hasOne<DestType, K extends keyof DestType>(
      repo: RepositoryBase<DestType>,
      foreignKey: K
    ): Dataloader<SourceRecord | IdType, DestType | null> {
      const manyLoader = this.hasMany(repo, foreignKey);
      return new Dataloader(async ids => {
        const sets = await manyLoader.loadMany(ids);
        return sets.map(e => (e.length > 0 ? e[0] : null));
      });
    }
  };
}

// function association<SourceRecord>() {
//   return {
//     hasMany<DestType extends RecordBase, S extends keyof DestType>(
//       repo: RepositoryBase<DestType>,
//       columnName: S
//     ): Dataloader<SourceRecord | Saved<SourceRecord>["id"], Saved<DestType>[]> {
//       return new Dataloader<
//         Saved<SourceRecord> | Saved<SourceRecord>["id"],
//         Saved<DestType>[]
//       >(async args => {
//         const ids = args.map(arg => (typeof arg === "object" ? arg.id : arg));
//         const records = await repo.table().whereIn("id", ids);
//         const table = keyBy<any>(records, "id");
//         return ids.map(id => table[id]);
//       });
//     }
//   };
// }

export class SnackRepository extends RepositoryBase<SnackRecord>("snacks") {}

export class VoteRepository extends RepositoryBase<VoteRecord>("votes") {
  forSnack = associationOf(SnackT).hasMany(this, "snackId");
}
