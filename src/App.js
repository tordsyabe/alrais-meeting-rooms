import React, { useContext } from "react";
import "./App.css";
import { Redirect, Switch } from "react-router";
import Private from "./components/routes/Private";
import Public from "./components/routes/Public";
import Singin from "./components/pages/Singin";
import AuthContextProvider from "./contexts/AuthContext";
import Home from "./components/pages/Home";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { ThemeContext } from "./contexts/ThemeContext";
import MeetingProgress from "./components/pages/MeetingProgress";
import MeetingsContextProvider from "./contexts/MeetingsContext";

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthContextProvider>
        <MeetingsContextProvider>
          <Switch>
            <Private exact path='/' component={Home} />
            <Private path='/app' component={Home} />
            <Public restricted={true} path='/login' component={Singin} />
            <Private path='/:id' component={MeetingProgress} />
          </Switch>
        </MeetingsContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
