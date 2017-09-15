// Fill in type definition for info addon
declare module "@storybook/react" {
  interface Story {
    addWithInfo(
      storyName: string,
      storyDesc: string,
      story: RenderFunction
    ): Story;
  }
}

import "./styles/main.scss";

import "./components/snack-voter/snack-voter.stories";
