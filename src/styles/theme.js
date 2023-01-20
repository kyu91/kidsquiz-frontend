import {createTheme} from "@mui/material/styles";

//global theme
const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
        contained: {
          color: "white"
        }
      },
    },
  },

  palette: {
    primary: {
      main: "#00D282",
    },
  },

  typography: {
    fontFamily: [
      'Noto Sans KR',
      '-apple-system',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },

  props: {
    MuiButton: {
      size: 'small',
    },
    MuiButtonGroup: {
      size: 'small',
    },
    MuiCheckbox: {
      size: 'small',
    },
    MuiFab: {
      size: 'small',
    },
    MuiFormControl: {
      margin: 'dense',
      size: 'small',
    },
    MuiFormHelperText: {
      margin: 'dense',
    },
    MuiIconButton: {
      size: 'small',
    },
    MuiInputBase: {
      margin: 'dense',
    },
    MuiInputLabel: {
      margin: 'dense',
    },
    MuiRadio: {
      size: 'small',
    },
    MuiSwitch: {
      size: 'small',
    },
    MuiTextField: {
      margin: 'dense',
      size: 'small',
    },
  },
});

export default theme;