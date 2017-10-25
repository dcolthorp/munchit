import { mount } from "enzyme";
import { mockProvider } from "client/test-helpers/mock-apollo";
import * as React from "react";
import { SnackReportPage } from "client/pages/snack-report";
import { sleep } from "helpers";
import { MockList } from "graphql-tools";
import * as State from "client/state";
import * as TagSet from "core/tag-set";

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

  it("Shows and let's the user update selected tags", async () => {
    const Provider = mockProvider({
      initState: State.selectedTags.comp(TagSet.tagValue("Vegan")).set(true)
    });

    const page = mount(
      <Provider>
        <SnackReportPage />
      </Provider>
    );

    const findSelected = () =>
      page
        .find("input[checked=true]")
        .map(n => n.closest("label").text())
        .sort();

    const checkboxFor = (tag: string) =>
      page
        .find("label")
        .filterWhere(l => l.text().includes(tag))
        .find("input");

    await sleep(0);

    expect(findSelected()).toEqual(["Vegan"]);

    checkboxFor("Go-to").simulate("change");
    await sleep(0);
    expect(findSelected()).toEqual(["Go-to", "Vegan"]);

    checkboxFor("Go-to").simulate("change");
    await sleep(0);
    expect(findSelected()).toEqual(["Vegan"]);
  });
});
