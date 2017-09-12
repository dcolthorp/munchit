import { RepositoryBase, NumberId, recordInfo, associationOf } from "./record";

interface UnsavedSnack {
  name: string;
}
interface SavedSnack extends UnsavedSnack {
  id: NumberId<SavedSnack>;
  createdAt: Date;
}

interface UnsavedVote {
  snackId: NumberId<SavedSnack>;
}
interface SavedVote extends UnsavedVote {
  id: NumberId<SavedVote>;
  createdAt: Date;
}

const SnackRecord = recordInfo<UnsavedSnack, SavedSnack>("snacks");
const VoteRecord = recordInfo<UnsavedVote, SavedVote>("votes");

export class SnackRepository extends RepositoryBase(SnackRecord) {
  forVote = associationOf(this).owning(VoteRecord, "snackId");
}

export class VoteRepository extends RepositoryBase(VoteRecord) {
  allForSnack = associationOf(this).allBelongingTo(SnackRecord, "snackId");
}

// const x: VoteRepository = null as any;
// x.allForSnack.load(2);
