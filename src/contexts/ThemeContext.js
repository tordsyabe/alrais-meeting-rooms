import { createMuiTheme } from "@material-ui/core";
import { blue, pink } from "@material-ui/core/colors";
import React from "react";

export const ThemeContext = React.createContext();

export default function ThemeContextProvider({ children }) {
  const [isDark, setIsDark] = React.useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const theme = createMuiTheme({
    palette: {
      primary: blue,
      secondary: pink,
      type: isDark ? "dark" : "light",
    },
  });

  const values = {
    theme,
    setIsDark,
    isDark,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
}
