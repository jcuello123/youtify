import React, { useState, useEffect } from "react";
import axios from "axios";
import { accessToken } from "./accesstoken";
import "./App.css";
import { TextField, ThemeProvider } from "@material-ui/core";
import { Buttons } from "./components/Buttons";
import { theme } from "./theme";
import { Snackbars } from "./components/Snackbars";
import { displaySongs, addToPlaylist } from "./buttonshandler";

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

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    if (open_success) {
      setOpenSuccess(false);
    }
    if (open_error) {
      setOpenError(false);
    }
  };

  const [playlists, setPlaylists] = useState([]);
  const [open_success, setOpenSuccess] = useState(false);
  const [open_error, setOpenError] = useState(false);

  return (
    <div className="App">
      {playlists.map((playlist, i) => (
        <div className="playlist" key={i}>
          <h1>Playlist: {playlist.name}</h1>
          {playlist.images.length > 0 && (
            <img
              style={{ width: "25%", borderRadius: "8px" }}
              src={playlist.images[0].url}
            />
          )}
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

          <div
            className={playlist.name
              .replaceAll(" ", "_")
              .replace(/[^\w\s]/gi, "")}
          ></div>

          <Buttons
            displaySongs={displaySongs}
            playlist={playlist}
            addToPlaylist={addToPlaylist}
            setOpenSuccess={setOpenSuccess}
            setOpenError={setOpenError}
          />
        </div>
      ))}

      <Snackbars
        open_success={open_success}
        open_error={open_error}
        handleClose={handleClose}
      />
    </div>
  );
}

export default App;
