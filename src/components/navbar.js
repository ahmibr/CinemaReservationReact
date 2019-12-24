import React, { Component } from "react";
import $ from 'jquery';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

export class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoggedIn: true, signedOut: false };
        this.onPressLogout = this.onPressLogout.bind(this);
    }

    checkLogIn() {
        const url = "/cinema/isloggedin.php";
        $.ajax({
            method: "GET",
            url: url,
            cache: false,
            dataType: 'json',
            success: function (data) {
                if (data.status == 'true') {
                    
                    this.setState({ isLoggedIn: true })
                }
                else
                    this.setState({ isLoggedIn: false })
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    onPressLogout() {
        const url = "/cinema/logout.php";
        $.ajax({
            method: "GET",
            url: url,
            cache: false,
            success: function (data) {
                this.setState({ isLoggedIn: false, signedOut: true });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    render() {
        this.checkLogIn();
        if (this.state.signedOut) {
            this.setState({ signedOut: false });
            return <Redirect to='/' />;
        }

        let button = null;
        if (this.state.isLoggedIn) {
            button = <button className="btn btn-light my-2 my-sm-0" onClick={(e) =>
                this.onPressLogout()}>Logout</button>
        }

        return (<nav className="navbar navbar-dark bg-primary">
            <a class="navbar-brand" href="/">Homepage</a>
            {button}
        </nav>)
    }

}
