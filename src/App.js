import logo from "./logo.svg";
import "./App.css";
import { Route, Switch } from "react-router";
import Private from "./components/routes/Private";
import Public from "./components/routes/Public";
import Singin from "./components/pages/Singin";

function App() {
  return (
    <Switch>
      {/* <Private exact path="/" component={Home} /> */}
      {/* <Private path="/app" component={AppWrapper} /> */}
      <Route  exact path="/login" component={Singin} />

      {/* <Public component={NotFound} /> */}
    </Switch>
  );
}

export default App;
