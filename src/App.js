import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Register } from "./components/Register";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/register">
          <Register/>
        </Route>
        <Route path="/home">
          <Home/>
        </Route>
        <Route path="/">
          <Login/>
        </Route>
        <Route>
          <div>Not found</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
