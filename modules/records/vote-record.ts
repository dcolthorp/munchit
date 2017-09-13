import { RepositoryBase, associationOf } from "./record";
import { VoteRecord, SnackRecord } from "records/types";

export class VoteRepository extends RepositoryBase(VoteRecord) {
  allForSnack = associationOf(this).allBelongingTo(SnackRecord, "snackId");
}
