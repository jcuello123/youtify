import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import PlaylistsPage from "./PlaylistsPage";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/playlists" component={PlaylistsPage} />
        </Switch>
      </div>
    </Router>
  );
}
