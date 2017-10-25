import * as React from "react";
import { storiesOf } from "@storybook/react";

import { TagPicker } from "client/components/tag-picker";
import { action } from "@storybook/addon-actions";

storiesOf("Component - TagPicker", module)
  .add("can show some tags selected", () => (
    <TagPicker
      tags={["Foo", "Bar"]}
      selected={["Foo"]}
      onTagChange={action("Tag changed")}
    />
  ))
  .add("renders nothing when there are no tags", () => (
    <TagPicker
      tags={[]}
      selected={["Foo"]}
      onTagChange={action("Tag changed")}
    />
  ));
