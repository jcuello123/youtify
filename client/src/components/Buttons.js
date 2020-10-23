import React from "react";
import { Button } from "@material-ui/core";

export const Buttons = (props) => {
  let {
    displaySongs,
    playlist,
    addToPlaylist,
    setOpenSuccess,
    setOpenError,
  } = props;
  return (
    <React.Fragment>
      <Button
        style={{
          background: "#1db954",
          color: "white",
          margin: "10px",
          fontWeight: "550",
        }}
        variant="contained"
        onClick={() => displaySongs(playlist)}
      >
        Load playlist
      </Button>

      <Button
        style={{
          background: "#1db954",
          color: "white",
          margin: "10px",
          fontWeight: "550",
        }}
        variant="contained"
        onClick={() => addToPlaylist(playlist, setOpenSuccess, setOpenError)}
      >
        Add to {playlist.name}
      </Button>
    </React.Fragment>
  );
};
