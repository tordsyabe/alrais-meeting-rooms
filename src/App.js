import "./App.css";
import { Route, Switch } from "react-router";
import Private from "./components/routes/Private";
import Public from "./components/routes/Public";
import Singin from "./components/pages/Singin";
import AuthContextProvider from './contexts/AuthContext'

function App() {
  return (
    <AuthContextProvider>
    <Switch>
      {/* <Private exact path="/" component={Home} /> */}
      {/* <Private path="/app" component={AppWrapper} /> */}
      <Public  exact path="/login" component={Singin} />

      {/* <Public component={NotFound} /> */}
    </Switch>
    </AuthContextProvider>
  );
}

export default App;
