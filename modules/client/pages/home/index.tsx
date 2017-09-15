import { HomePageUI, HomePageUIProps } from "client/pages/home/home-page-ui";
import graphql from "react-apollo/graphql";
import {
  DashboardSnacksQuery,
  VoteForSnackMutation,
  VoteForSnackMutationVariables
} from "client/graphql-types";

type SnacksQueryProps = Pick<HomePageUIProps, "snacks">;
const fetchSnacks = graphql<
  DashboardSnacksQuery,
  {},
  SnacksQueryProps
>(require("client/graphql-queries/DashboardSnacks.graphql"), {
  options(props) {
    // Always refetch this query when the page is loaded
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

const withVoteMutation = graphql<
  VoteForSnackMutation,
  SnacksQueryProps,
  HomePageUIProps
>(require("client/graphql-mutations/VoteForSnack.graphql"), {
  props(result): HomePageUIProps {
    const { snacks } = result.ownProps;
    return {
      snacks,
      onVote: snack => {
        if (result.mutate) {
          result.mutate({
            variables: {
              snackId: snack.id
            } as VoteForSnackMutationVariables,

            optimisticResponse: {
              voteFor: {
                __typename: "Vote",
                id: -1,
                snack: {
                  __typename: "Snack",
                  id: snack.id,
                  voteCount: snack.voteCount + 1
                }
              }
            } as VoteForSnackMutation
          });
        }
      }
    };
  }
});

export const HomePage = fetchSnacks(withVoteMutation(HomePageUI));
