import { HomePageUI, HomePageUIProps } from "client/pages/home/home-page-ui";
import graphql from "react-apollo/graphql";
import { DashboardSnacksQuery } from "client/graphql-types";
import { withApollo } from "react-apollo";
import { voteForSnackMutation } from "client/graphql-mutations/vote-for-snack-mutation";
import { ApolloClient } from "apollo-client";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import partial from "lodash-es/partial";

type SnacksQueryProps = Pick<HomePageUIProps, "snacks">;
const fetchSnacks = graphql<
  DashboardSnacksQuery,
  {},
  SnacksQueryProps
>(require("client/graphql-queries/DashboardSnacks.graphql"), {
  options(props) {
    // Always refetch this query when the page is loaded (component is mounted)
    return { fetchPolicy: "cache-and-network" };
  },
  props(result): SnacksQueryProps {
    if (result.data && result.data.allSnacks) {
      return {
        snacks: result.data.allSnacks
      };
    } else {
      return {
        snacks: null
      };
    }
  }
});

type WithApolloProps = { client: ApolloClient };

type ConnectProps = SnacksQueryProps & WithApolloProps;
type DispatchProps = Pick<HomePageUIProps, "onVote">;

function mapDispatchToProps(
  dispatch: Dispatch<any>,
  ownProps: ConnectProps
): DispatchProps {
  const { client } = ownProps;
  return {
    onVote: partial(voteForSnackMutation, client)
  };
}

const withEvents = connect(undefined, mapDispatchToProps);

export const HomePage = fetchSnacks(withApollo(withEvents(HomePageUI)));
