import { RouterState } from "react-router-redux";
import { Store as ApolloStore } from "apollo-client/store";

export interface Type {
  router: RouterState;
  apollo: ApolloStore;
}
