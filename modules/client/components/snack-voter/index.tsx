import * as React from "react";
import { SnackId } from "records/snack-record";
import partial from "lodash-es/partial";
import { PopularityMode } from "client/state";

export type SnackVoteInfo = {
  id: SnackId;
  name: string;
  voteCount: number;
};
export interface SnackVoterProps {
  popularityMode: PopularityMode;
  snacks: null | SnackVoteInfo[];
  onVote: (snack: SnackVoteInfo) => void;
}

export const calcPopularityPercentage = (
  snackVotes: number,
  maxVotes: number
): string => {
  const percentage =
    maxVotes <= 0 ? 100 : Math.round(100.0 * snackVotes / maxVotes);
  return `${percentage}%`;
};

export function SnackVoter(props: SnackVoterProps) {
  const { snacks, onVote, popularityMode } = props;

  const calcPopularity =
    popularityMode === PopularityMode.PERCENTAGE
      ? calcPopularityPercentage
      : (count: number) => `${count} votes`;

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
          {snack.name}&nbsp; (popularity: {popularity})&nbsp;
          <a onClick={partial(onVote, snack)}>Vote</a>
        </li>
      );
    });
  }

  return <ul>{voteRows}</ul>;
}
