import * as React from "react";
import { ConnectedRouter } from "react-router-redux";
import { Route, Link } from "react-router-dom";

import { History } from "history";

function Home() {
  return (
    <div>
      <div>Home</div>
      <Link to="/game">Game</Link>
    </div>
  );
}

class App extends React.Component<{}, {}> {
  render() {
    return <div>{this.props.children}</div>;
  }
}

export default function Root(props: { history: History }) {
  return (
    <ConnectedRouter history={props.history}>
      <App>
        <Route exact path="/" component={Home} />
      </App>
    </ConnectedRouter>
  );
}
