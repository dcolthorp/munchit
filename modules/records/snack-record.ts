import { RepositoryBase, loaderOf, NumberId } from "./record";

import { SnackRecord, VoteRecord } from "records/record-infos";

export type SnackId = NumberId<SavedSnack>;

export interface UnsavedSnack {
  name: string;
}
export interface SavedSnack extends UnsavedSnack {
  id: NumberId<SavedSnack>;
}

export class SnackRepository extends RepositoryBase(SnackRecord) {
  forVote = loaderOf(this).owning(VoteRecord, "snackId");
  byName = loaderOf(this).finderBy("name");
}
