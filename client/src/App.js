import React, { useState, useEffect } from "react";
import axios from "axios";
import { accessToken } from "./accesstoken";
import "./App.css";
import {
  TextField,
  Button,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core";
import { displaySongs, addToPlaylist } from "./buttonshandler";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1db954",
    },
  },
  overrides: {
    MuiOutlinedInput: {
      root: {
        position: "relative",
        "& $notchedOutline": {
          borderColor: "#1db954",
        },
        "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
          borderColor: "#1db954",
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            borderColor: "#1db954",
          },
        },
        "&$focused $notchedOutline": {
          borderColor: "#1db954",
          borderWidth: 1,
        },
      },
    },
    MuiFormLabel: {
      root: {
        color: "#1db954",
      },
    },
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
        <div className="playlist" key={i}>
          <h1>Playlist: {playlist.name}</h1>
          <ThemeProvider theme={theme}>
            <TextField
              style={{
                background: "black",
                margin: "10px",
                borderRadius: "7px",
              }}
              InputProps={{ style: { color: "white" } }}
              label="YouTube playlist"
              variant="outlined"
              id={playlist.name}
            />
          </ThemeProvider>

          <div className={playlist.name.replaceAll(" ", "_").replace(/[^\w\s]/gi, "")}></div>

          <Button
            style={{ background: "#1db954", color: "white", margin: "10px" }}
            variant="contained"
            onClick={() => displaySongs(playlist)}
          >
            Show songs
          </Button>

          <Button
            style={{ background: "#1db954", color: "white", margin: "10px" }}
            variant="contained"
            onClick={() => addToPlaylist(playlist)}
          >
            Add to {playlist.name}
          </Button>
        </div>
      ))}
    </div>
  );
}

export default App;
