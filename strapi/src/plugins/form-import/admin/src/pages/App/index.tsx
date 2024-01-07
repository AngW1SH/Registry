/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from "react";
import pluginId from "../../pluginId";
import HomePage from "../HomePage";
import { Route } from "react-router-dom";
import "./globals.css";

const App = () => {
  return (
    <div>
      <Route path={"/plugins/" + pluginId} exact>
        <HomePage />
      </Route>
    </div>
  );
};

export default App;
