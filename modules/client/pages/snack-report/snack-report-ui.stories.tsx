import { storiesOf } from "@storybook/react";
import * as React from "react";
import { SnackReportUI } from "./snack-report-ui";

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
    />
  ))
  .add("Empty", () => <SnackReportUI rows={[]} />)
  .add("Loading", () => <SnackReportUI rows={null} />);
