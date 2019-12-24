import React, { Component } from "react";
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { CinemaSeats } from './components/cinemaSeats';
import { HomePage } from './components/homepage';
import { LoginPage } from './components/login';
import { Screenings } from './components/screenings';
import { NavBar } from './components/navbar';
import { AdminPage } from "./components/admin";

// ReactDOM.render(
//     <CinemaSeats/>,
//     document.getElementById('root')
//   );
class App extends Component {

  constructor(props) {
    super(props);
  }

  Home() {
    return <HomePage />
  }

  Login() {
    return <LoginPage />;
  }

  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Switch>
            <Route path="/reserve/:screeningID" component={CinemaSeats} />
            <Route path="/movie/:movieID" component={Screenings} />
            <Route path="/homepage">
              {this.Home()}
            </Route>
            <Route path="/admin" component={AdminPage} />
            <Route path="/">
              {this.Login()}
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
);

