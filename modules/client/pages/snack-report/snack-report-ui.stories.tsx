import { storiesOf } from "@storybook/react";
import * as React from "react";
import { SnackReportUI } from "./snack-report-ui";
import { action } from "@storybook/addon-actions";

storiesOf("Page – Snack Report", module)
  .add("Example", () => (
    <SnackReportUI
      rows={[
        { name: "Cheese snack", votes: 8, place: 1, tags: [] },
        {
          name: "Guacamole",
          place: 2,
          votes: 7,
          tags: ["Gluten-free", "Vegan"]
        }
      ]}
      onTagChange={action("onTagChange")}
      selectedTags={["Gluten-free"]}
    />
  ))
  .add("Empty", () => (
    <SnackReportUI
      rows={[]}
      onTagChange={action("onTagChange")}
      selectedTags={[]}
    />
  ))
  .add("Loading", () => (
    <SnackReportUI
      rows={null}
      onTagChange={action("onTagChange")}
      selectedTags={[]}
    />
  ));
