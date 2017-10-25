import { recordInfo } from "records/record";
import { UnsavedVote, SavedVote } from "records/vote-record";
import { UnsavedSnack, SavedSnack } from "records/snack-record";
import { UnsavedTag, SavedTag } from "records/tag-record";
import { UnsavedTagging, SavedTagging } from "records/tagging-record";

export const VoteRecord = recordInfo<UnsavedVote, SavedVote>("votes");
export const SnackRecord = recordInfo<UnsavedSnack, SavedSnack>("snacks");

export const TagRecord = recordInfo<UnsavedTag, SavedTag>("tags");
export const TaggingRecord = recordInfo<UnsavedTagging, SavedTagging>(
  "taggings"
);
