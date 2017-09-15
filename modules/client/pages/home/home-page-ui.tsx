import * as React from "react";
import { SnackVoter, SnackVoterProps } from "client/components/snack-voter";

export interface HomePageUIProps {
  snacks: SnackVoterProps["snacks"];
  onVote: SnackVoterProps["onVote"];
}

export class HomePageUI extends React.PureComponent<HomePageUIProps> {
  render() {
    const { snacks, onVote } = this.props;
    return (
      <div className="home-page">
        <h2>Snacks</h2>
        <SnackVoter snacks={snacks} onVote={onVote} />
      </div>
    );
  }
}
