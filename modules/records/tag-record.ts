import { RepositoryBase, loaderOf, NumberId } from "./record";

import { TagRecord, TaggingRecord } from "records/record-infos";

export type TagId = NumberId<"tag">;

export interface UnsavedTag {
  name: string;
}
export interface SavedTag extends UnsavedTag {
  id: TagId;
}

export class TagRepository extends RepositoryBase(TagRecord) {
  forTagging = loaderOf(this).owning(TaggingRecord, "tagId");
}
