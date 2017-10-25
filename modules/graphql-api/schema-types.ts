/* tslint:disable */

export interface Query {
  allSnacks: Array<Snack>;
  topSnacks: Array<Snack>;
}

export interface TopSnacksQueryArgs {
  tags: Array<string> | null;
}

export interface Snack {
  id: number;
  name: string;
  voteCount: number;
  tags: Array<string>;
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
  snack: Snack;
}
