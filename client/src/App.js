import React, { useState, useEffect } from "react";
import axios from "axios";
import { accessToken } from "./accesstoken";
import "./App.css";
import { green } from "@material-ui/core/colors";
import {
  TextField,
  Button,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

function App() {
  useEffect(() => {
    getPlayLists();
  }, []);

  function getPlayLists() {
    axios
      .get("https://api.spotify.com/v1/me/playlists", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => setPlaylists(res.data.items));
  }

  const [playlists, setPlaylists] = useState([]);

  return (
    <div className="App">
      {playlists.map((playlist, i) => (
        <div className="playlist">
          <h1>Playlist: {playlist.name}</h1>
          <ThemeProvider theme={theme}>
            <TextField
              style={{
                background: "black",
                margin: "10px",
                borderRadius: "7px",
              }}
              label="YouTube playlist"
              variant="filled"
            />
          </ThemeProvider>

          <Button
            style={{ background: "#1db954", color: "white", margin: "10px" }}
            variant="contained"
          >
            Add to playlist
          </Button>
        </div>
      ))}
    </div>
  );
}

export default App;
