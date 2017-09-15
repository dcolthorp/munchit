import { recordInfo, RecordInfo } from "records/record";
import { UnsavedVote, Vote } from "records/vote-record";
import { UnsavedSnack, Snack } from "records/snack-record";

export const VoteRecord = recordInfo<UnsavedVote, Vote>("votes");
export const SnackRecord = recordInfo<UnsavedSnack, Snack>("snacks");

export const ALL_RECORDS: ReadonlyArray<RecordInfo<any, any, any>> = [
  VoteRecord,
  SnackRecord
];
