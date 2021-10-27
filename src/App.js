import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import PrivateRoute from "./routing/PrivateRoute";
import PublicRoute from "./routing/PublicRoute";

function App() {
  return (
    <Router>
      <Switch>
        <PublicRoute restricted={true} component={Register} path="/register" />
        <PrivateRoute component={Home} path="/home" />
        <PublicRoute restricted={true} component={Login} path="/" exact />
        <Route>
          <div>Not found</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
