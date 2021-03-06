import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import { Home } from "./components/Home";
import { Profile } from "./components/Profile";
import { University } from "./components/University";
import { EditFacade } from "./components/EditFacade";
import { Messages } from "./components/Messages";
import { Request } from "./components/Request";
import {Facade} from "./components/Facade";
import { Match } from "./components/Match";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import PrivateRoute from "./routing/PrivateRoute";
import PublicRoute from "./routing/PublicRoute";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Switch>
        <PublicRoute restricted={true} component={Register} path="/register" />
        <PrivateRoute component={Home} path="/home" />
        <PrivateRoute component={Profile} path="/profile/:userId" />
        <PrivateRoute component={University} path="/university/:universityId"/>
        <PrivateRoute component={EditFacade} path="/editFacade" />
        <PrivateRoute component={Messages} path="/messages" />
        <PrivateRoute component={Request} path="/request" />
        <PrivateRoute component={Facade} path="/facade/:userId" />
        <PrivateRoute component={Match} path="/match" />
        <PublicRoute restricted={true} component={Login} path="/" exact />
        <Route>
          <div>Not found</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
