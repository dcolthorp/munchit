import * as React from "react";
import { SnackId } from "records/snack-record";
import partial from "lodash-es/partial";

export type SnackVoteInfo = {
  id: SnackId;
  name: string;
  voteCount: number;
};
export interface SnackVoterProps {
  snacks: null | SnackVoteInfo[];
  onVote: (snack: SnackVoteInfo) => void;
}

export const calcPopularity = (snackVotes: number, maxVotes: number): number =>
  maxVotes <= 0 ? 100 : Math.round(100.0 * snackVotes / maxVotes);

export function SnackVoter(props: SnackVoterProps) {
  const { snacks, onVote } = props;

  let voteRows: JSX.Element | JSX.Element[];
  if (snacks === null) {
    voteRows = <li>Loading</li>;
  } else if (snacks.length === 0) {
    voteRows = <li>There are no snacks in the system</li>;
  } else {
    const maxVotes = Math.max(...snacks.map(x => x.voteCount));
    voteRows = snacks.map((snack, idx) => {
      const popularity = calcPopularity(snack.voteCount, maxVotes);
      return (
        <li key={idx}>
          {snack.name}&nbsp; (popularity: {popularity}%)&nbsp;
          <a onClick={partial(onVote, snack)}>Vote</a>
        </li>
      );
    });
  }

  return <ul>{voteRows}</ul>;
}
