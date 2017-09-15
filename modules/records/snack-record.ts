import { RepositoryBase, loaderOf, NumberId } from "./record";

import { SnackRecord, VoteRecord } from "records/record-infos";

export type SnackId = NumberId<Snack>;

export interface UnsavedSnack {
  name: string;
}
export interface Snack extends UnsavedSnack {
  id: NumberId<Snack>;
}

export class SnackRepository extends RepositoryBase(SnackRecord) {
  forVote = loaderOf(this).owning(VoteRecord, "snackId");
  byName = loaderOf(this).finderBy("name");
}
