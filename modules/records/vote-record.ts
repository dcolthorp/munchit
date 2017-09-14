import { RepositoryBase, loaderOf, NumberId } from "./record";
import { VoteRecord, SnackRecord } from "records/record-infos";
import { SnackId } from "records/snack-record";
import * as DataLoader from "dataloader";
import { keyBy } from "lodash-es";

export type VoteId = NumberId<SavedVote>;

export interface UnsavedVote {
  snackId: SnackId;
}
export interface SavedVote extends UnsavedVote {
  id: VoteId;
  createdAt: Date;
}

export class VoteRepository extends RepositoryBase(VoteRecord) {
  allForSnack = loaderOf(this).allBelongingTo(SnackRecord, "snackId");

  countForSnack = new DataLoader<SnackId, number>(async ids => {
    const counts: { id: SnackId; count: number }[] = await this.table()
      .select("snackId", this.db.raw("COUNT(votes.id) as count"))
      .whereIn("snackId", ids)
      .groupBy("snackId");
    const table = keyBy(counts, "snackId");
    return ids.map(id => {
      let countRec = table[id.toString()];
      return countRec ? Number(countRec.count) : 0;
    });
  });
}
