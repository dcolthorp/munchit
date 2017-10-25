import { RepositoryBase, loaderOf, NumberId } from "./record";

import { TaggingRecord, SnackRecord } from "records/record-infos";
import { SnackId } from "records/snack-record";
import { TagId } from "records/tag-record";

export type TaggingId = NumberId<"taggings">;

export interface UnsavedTagging {
  snackId: SnackId;
  tagId: TagId;
}
export interface SavedTagging extends UnsavedTagging {
  id: TaggingId;
}

export class TaggingRepository extends RepositoryBase(TaggingRecord) {
  forSnack = loaderOf(this).allBelongingTo(SnackRecord, "snackId");
}
