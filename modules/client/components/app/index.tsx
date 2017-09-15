import * as React from "react";
import { Link } from "react-router-dom";

require("./styles.scss");
export function AppHeader() {
  return (
    <div className="munchit-app-header">
      <h1>Munchit</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
    </div>
  );
}

export function App(props: { children: JSX.Element }) {
  const { children } = props;
  return (
    <div className="munchit-app">
      <AppHeader />
      {children}
    </div>
  );
}
