import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
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
