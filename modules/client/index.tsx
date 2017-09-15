import * as React from "react";
import { ConnectedRouter } from "react-router-redux";
import { Route } from "react-router-dom";

import { History } from "history";
import { App } from "client/components/app";
import { HomePage } from "client/pages/home";

export default function Root(props: { history: History }) {
  return (
    <ConnectedRouter history={props.history}>
      <App>
        <Route exact path="/" component={HomePage} />
      </App>
    </ConnectedRouter>
  );
}
