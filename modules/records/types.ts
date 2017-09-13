import { NumberId, recordInfo, RecordInfo } from "records/record";

export interface UnsavedVote {
  snackId: NumberId<SavedSnack>;
}
export interface SavedVote extends UnsavedVote {
  id: NumberId<SavedVote>;
  createdAt: Date;
}

export const VoteRecord = recordInfo<UnsavedVote, SavedVote>("votes");

export const SnackRecord = recordInfo<UnsavedSnack, SavedSnack>("snacks");
export interface UnsavedSnack {
  name: string;
}
export interface SavedSnack extends UnsavedSnack {
  id: NumberId<SavedSnack>;
}

export const ALL_RECORDS: ReadonlyArray<RecordInfo<any, any, any>> = [
  VoteRecord,
  SnackRecord
];
