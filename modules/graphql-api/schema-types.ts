/* tslint:disable */

export interface Query {
  allSnacks: Array<Snack> | null;
}

export interface Snack {
  id: number;
  name: string;
  voteCount: number;
}

export interface Mutation {
  addSnack: Snack | null;
  voteFor: Vote | null;
}

export interface AddSnackMutationArgs {
  name: string;
}

export interface VoteForMutationArgs {
  snackId: number;
}

export interface Vote {
  id: number;
  createdAtIso8601: string;
  snack: Snack;
}
