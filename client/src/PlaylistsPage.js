import React, { useState, useEffect } from "react";
import axios from "axios";
import { accessToken } from "./accesstoken";
import "./App.css";
import { TextField, ThemeProvider } from "@material-ui/core";
import { Buttons } from "./components/Buttons";
import { theme } from "./theme";
import { Snackbars } from "./components/Snackbars";
import { displaySongs, addToPlaylist } from "./buttonshandler";

function PlaylistsPage() {
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
      <div className="header">
        <span>
          <h1>YouT</h1>
          <h1 className="green">ify</h1>
        </span>
      </div>

      {playlists.map((playlist, i) => (
        <div className="playlist" key={i}>
          <h1>Playlist: {playlist.name}</h1>
          <div className="pic">
            {playlist.images.length > 0 && (
              <img
                style={{
                  width: "100%",
                  borderRadius: "8px",
                }}
                src={playlist.images[0].url}
              />
            )}
          </div>
          <ThemeProvider theme={theme}>
            <TextField
              style={{
                background: "black",
                margin: "10px",
                borderRadius: "7px",
              }}
              InputProps={{ style: { color: "white" } }}
              label="YouTube playlist URL"
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

      <div className="footer">
        <p>Copyright ©2020 All rights reserved</p>
      </div>
    </div>
  );
}

export default PlaylistsPage;
