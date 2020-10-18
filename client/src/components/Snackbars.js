import { Snackbar } from "@material-ui/core";
import MultiAlert from "@material-ui/lab/Alert";
import React from "react";

export const Snackbars = (props) => {
  let { open_success, open_error, handleClose } = props;
  return (
    <React.Fragment>
      <Snackbar
        open={open_success}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <MultiAlert variant="filled" onClose={handleClose} severity="success">
          Successfully added playlist!
        </MultiAlert>
      </Snackbar>

      <Snackbar open={open_error} autoHideDuration={6000} onClose={handleClose}>
        <MultiAlert variant="filled" onClose={handleClose} severity="error">
          There was an error when trying to add the playlist. Note: make sure
          you display the songs first.
        </MultiAlert>
      </Snackbar>
    </React.Fragment>
  );
};
