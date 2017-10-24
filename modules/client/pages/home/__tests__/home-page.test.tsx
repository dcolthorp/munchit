import { mockProvider } from "client/test-helpers/mock-apollo";
import { mount } from "enzyme";
import * as React from "react";
import { HomePage } from "client/pages/home";
import {
  SnackVoter,
  SnackVoterEntry,
  SnackVoterEntryProps
} from "client/components/snack-voter";
import { MockList } from "graphql-tools";
import { sleep } from "helpers";

describe("Home page", () => {
  it("Begins in a loading state", () => {
    const Provider = mockProvider();

    const page = mount(
      <Provider>
        <HomePage />
      </Provider>
    );

    expect(page.find(SnackVoter).text()).toContain("Loading");
  });

  it("Shows a message if there are no snacks", async () => {
    const Provider = mockProvider({
      mocks: {
        Query: () => ({
          allSnacks: () => new MockList(0)
        })
      }
    });

    const page = mount(
      <Provider>
        <HomePage />
      </Provider>
    );

    await sleep(0);

    expect(page.find(SnackVoter).text()).toContain("no snacks");
  });

  it("Shows the snacks in a list", async () => {
    const Provider = mockProvider({
      mocks: {
        Query: () => ({
          allSnacks: () => [
            { id: 1, name: "Foo", voteCount: 1 },
            { id: 2, name: "Bar", voteCount: 2 }
          ]
        })
      }
    });

    const page = mount(
      <Provider>
        <HomePage />
      </Provider>
    );

    await sleep(0);

    const fooToggle = page
      .find(SnackVoterEntry)
      .filterWhere(e => e.prop("name") === "Foo");

    console.log(fooToggle.debug());
    expect(fooToggle.prop("popularityDesc")).toMatch("50%");

    const barToggle = page
      .find(SnackVoterEntry)
      .filterWhere(e => e.prop("name") === "Bar");
    expect(barToggle.prop("popularityDesc")).toMatch("100%");
  });
});
