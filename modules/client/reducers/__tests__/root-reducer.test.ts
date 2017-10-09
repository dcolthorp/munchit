import { rootReducer } from "client/reducers";
import * as State from "client/state";
import * as Actions from "client/actions";
import { PopularityMode } from "client/state";

describe("the app root reducer", () => {
  it("can set the popularity", () => {
    const percentageState = rootReducer(
      State.DEFAULT,
      Actions.setPopularity(PopularityMode.PERCENTAGE)
    );

    expect(State.popularityMode(percentageState)).toEqual(
      PopularityMode.PERCENTAGE
    );
  });
});
