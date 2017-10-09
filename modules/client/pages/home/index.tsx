import { HomePageUI, HomePageUIProps } from "client/pages/home/home-page-ui";
import graphql from "react-apollo/graphql";
import { DashboardSnacksQuery } from "client/graphql-types";
import { withApollo } from "react-apollo";
import { voteForSnackMutation } from "client/graphql-mutations/vote-for-snack-mutation";
import { ApolloClient } from "apollo-client";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import partial from "lodash-es/partial";
import { RouteComponentProps } from "react-router-dom";
import * as Actions from "client/actions";
import * as State from "client/state";
import { AssertAssignable } from "helpers";

/** This page is mounted in the router, so its props are from that. */
type Props = RouteComponentProps<{}>;

/** This page uses three higher-order components to provide functionality:
 *  1. withApollo – this HOC from apollo injects a reference to our GraphQL client.
 *  2. connect(...) - this HOC from redux gets access to our redux store.
 *  3. graphql – this HOC from apollo lets us subscribe to a graphql query.
 */

/** We use Apollo's withApollo higher-order-component to dependency-inject our GraphQL client. It provides these props. */
interface WithApolloProps {
  client: ApolloClient;
}

/** This is the props `withApollo` produces, which is an input to our `connect` call. */
type PropsWithApollo = Props & WithApolloProps;

type StateProps = Pick<HomePageUIProps, "popularityMode">;
function mapStateToProps(
  state: State.Type,
  ownProps: WithApolloProps
): StateProps {
  return {
    popularityMode: State.popularityMode(state)
  };
}

type DispatchProps = Pick<HomePageUIProps, "onVote" | "onPopularityModeChange">;
function mapDispatchToProps(
  dispatch: Dispatch<any>,
  ownProps: WithApolloProps
): DispatchProps {
  const { client } = ownProps;
  return {
    onVote: partial(voteForSnackMutation, client),
    onPopularityModeChange: mode => dispatch(Actions.setPopularity(mode))
  };
}
/** Higher-order component that provides the `onVote` property to wrapped component */
const connectedToRedux = connect<{}, DispatchProps, {}>(
  mapStateToProps,
  mapDispatchToProps
);
type ReduxConnectedProps = PropsWithApollo & DispatchProps & StateProps;

/** Higher order component that fetches the snack data and provides the `snacks` prop to wrapped component. */
type SnacksQueryProps = Pick<HomePageUIProps, "snacks">;
type WithSnacksFromGraphQLResultProps = ReduxConnectedProps & SnacksQueryProps;
const withSnacksFromGraphQL = graphql<
  DashboardSnacksQuery,
  ReduxConnectedProps,
  WithSnacksFromGraphQLResultProps
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

/** Assert that our combined props type is compatible with HomePageUIProps */
type _check = AssertAssignable<
  HomePageUIProps,
  WithSnacksFromGraphQLResultProps
>;

/** The fully-wired home page, with  */
export const HomePage = withApollo(
  connectedToRedux(withSnacksFromGraphQL(HomePageUI))
);
