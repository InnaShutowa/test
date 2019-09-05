import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const newTheme = createMuiTheme({
    palette: {
      primary: {
        main: "#B31728"
      },
      secondary: {
        main: "#202833"
      },
      success: {
        main: "#202833",
        contrastText: "#fff"
      }
    }
  });

  export default newTheme;