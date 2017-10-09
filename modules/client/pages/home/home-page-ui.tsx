import * as React from "react";
import { SnackVoter, SnackVoterProps } from "client/components/snack-voter";
import { PopularityMode } from "client/state";

require("./styles.scss");

export interface HomePageUIProps {
  snacks: SnackVoterProps["snacks"];
  onVote: SnackVoterProps["onVote"];
  popularityMode: PopularityMode;
  onPopularityModeChange: (mode: PopularityMode) => void;
}

export class HomePageUI extends React.PureComponent<HomePageUIProps> {
  render() {
    const {
      snacks,
      onVote,
      popularityMode,
      onPopularityModeChange
    } = this.props;
    return (
      <div className="home-page">
        <h2>Snacks</h2>
        <SnackVoter
          snacks={snacks}
          onVote={onVote}
          popularityMode={popularityMode}
        />

        <div className="home-page-pop-mode-toggle">
          <h4>Show popularity as:</h4>
          <div>
            <label htmlFor="home-page-percentage">
              <input
                id="home-page-percentage"
                type="radio"
                checked={popularityMode === PopularityMode.PERCENTAGE}
                onChange={() =>
                  onPopularityModeChange(PopularityMode.PERCENTAGE)}
              />{" "}
              Percentage
            </label>
          </div>
          <div>
            <label htmlFor="home-page-vote-count">
              <input
                id="home-page-vote-count"
                type="radio"
                checked={popularityMode === PopularityMode.VOTE_COUNT}
                onChange={() =>
                  onPopularityModeChange(PopularityMode.VOTE_COUNT)}
              />{" "}
              Vote Count
            </label>
          </div>
        </div>
      </div>
    );
  }
}
