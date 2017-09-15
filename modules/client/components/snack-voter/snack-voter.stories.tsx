import { storiesOf } from "@storybook/react";
import * as React from "react";
import { SnackVoter } from "client/components/snack-voter";
import { action } from "@storybook/addon-actions";

storiesOf("Component – SnackVoter", module)
  .add("Basic example", () => (
    <SnackVoter
      snacks={[
        {
          id: 1,
          name: "Guacamole",
          voteCount: 3
        },
        {
          id: 2,
          name: "Cheese platter",
          voteCount: 1
        }
      ]}
      onVote={action("voted")}
    />
  ))
  .add("No votes", () => (
    <SnackVoter
      snacks={[
        {
          id: 1,
          name: "Guacamole",
          voteCount: 0
        },
        {
          id: 2,
          name: "Cheese platter",
          voteCount: 0
        }
      ]}
      onVote={action("voted")}
    />
  ))
  .add("No snacks", () => <SnackVoter snacks={[]} onVote={action("voted")} />);
