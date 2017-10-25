import { mount } from "enzyme";
import { mockProvider } from "client/test-helpers/mock-apollo";
import * as React from "react";
import { SnackReportPage } from "client/pages/snack-report";
import { sleep } from "helpers";
import { MockList } from "graphql-tools";

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

  it("Shows a message if there are no snacks", async () => {
    const Provider = mockProvider({
      mocks: {
        Query: () => ({
          topSnacks: () => new MockList(0)
        })
      }
    });

    const page = mount(
      <Provider>
        <SnackReportPage />
      </Provider>
    );

    await sleep(0);

    expect(page.text()).toMatch(/no snacks/i);
  });

  it("Shows snacks", async () => {
    const Provider = mockProvider({
      mocks: {
        Query: () => ({
          topSnacks: [
            {
              id: 1,
              voteCount: 19,
              name: "Pimento cheese",
              tags: ["vegan"]
            }
          ]
        })
      }
    });

    const page = mount(
      <Provider>
        <SnackReportPage />
      </Provider>
    );

    await sleep(0);

    expect(page.text()).toContain("Pimento cheese");
    expect(page.text()).toContain("1.");
    expect(page.text()).toContain("19");
    expect(page.text()).toContain("vegan");
  });
});
