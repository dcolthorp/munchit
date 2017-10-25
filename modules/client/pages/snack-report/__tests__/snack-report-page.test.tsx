import { mount } from "enzyme";
import { mockProvider } from "client/test-helpers/mock-apollo";
import * as React from "react";
import { SnackReportPage } from "client/pages/snack-report";

describe("Snack Report", () => {
  it("Begins in a loading state", () => {
    const Provider = mockProvider();

    const page = mount(
      <Provider>
        <SnackReportPage />
      </Provider>
    );

    expect(page.text()).toContain("Loading");
  });
});
