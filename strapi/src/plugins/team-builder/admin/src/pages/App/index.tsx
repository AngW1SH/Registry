/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from "react";
import { AnErrorOccurred } from "@strapi/helper-plugin";
import "./globals.css";
import pluginId from "../../pluginId";
import HomePage from "../HomePage";
import { Route } from "react-router-dom";
import EditPage from "../EditPage";

const App = () => {
  return (
    <div>
      <Route path={"/plugins/" + pluginId} exact>
        <HomePage />
      </Route>
      <Route path={"/plugins/" + pluginId + "/:id"}>
        <EditPage pluginId={pluginId} />
      </Route>
    </div>
  );
};

export default App;
