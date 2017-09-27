import { storiesOf } from "@storybook/react";
import * as React from "react";
import { action } from "@storybook/addon-actions";
import { HomePageUI } from "./home-page-ui";

storiesOf("Page – Home", module).add("Simple example", () => (
  <HomePageUI
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
));
