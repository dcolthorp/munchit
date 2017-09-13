import {
  RepositoryBase,
  associationOf,
  SavedR,
  UnsavedR
} from "./record";
import { SnackRecord, VoteRecord } from "records/types";

export type UnsavedSnack = UnsavedR<typeof SnackRecord>;
export type Snack = SavedR<typeof SnackRecord>;
export class SnackRepository extends RepositoryBase(SnackRecord) {
  forVote = associationOf(this).owning(VoteRecord, "snackId");
}
