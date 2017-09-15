/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type VoteForSnackMutationVariables = {
  snackId: number;
};

export type VoteForSnackMutation = {
  voteFor: {
    __typename: "Vote";
    id: number;
    snack: {
      __typename: string;
      id: number;
      voteCount: number;
    };
  } | null;
};

export type DashboardSnacksQuery = {
  allSnacks: Array<{
    id: number;
    name: string;
    voteCount: number;
  }> | null;
};
/* tslint:enable */
