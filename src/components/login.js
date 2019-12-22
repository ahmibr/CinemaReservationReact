import React, { Component } from "react";
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

export class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameValue: "",
            passwordValue: "",
            isLoggedIn: false
        };

        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.checkLogin();
    }

    checkLogin() {
        const url = "/cinema/isloggedin.php"
        $.ajax({
            method: "GET",
            url: url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                console.log(data);
                if (data == true) {
                    this.setState({ isLoggedIn: true })
                }
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }
    handleUsernameChange(e) {
        this.setState({ usernameValue: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ passwordValue: e.target.value });
    }

    handleSubmit(e) {
        if (this.state.passwordValue.length < 1)
            alert("password should be more than 8 characters");
        else if (this.state.usernameValue.length == 0)
            alert("Enter valid username");
        else {
            const url = "/cinema/login.php"
            $.ajax({
                method: "POST",
                url: url,
                data: { username: this.state.usernameValue, password: this.state.passwordValue },
                dataType: 'json',
                cache: false,
                success: function (data) {
                    console.log(data);
                    if (data == true)
                        {
                            alert("login successfully");
                            this.setState({ isLoggedIn: true })
                        }
                    else
                        alert("Invalid username or password");
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        }
        e.preventDefault()
    }

    render() {
        if (this.state.isLoggedIn) {
            return <Redirect to='/homepage' />
        }
        else
            return (
                <form>
                    <div className="form-group">
                        <label>Username</label>
                        <input required type="text" className="form-control" value={this.state.usernameValue} onChange={this.handleUsernameChange} placeholder="Enter Username"></input>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input required type="password" className="form-control" value={this.state.passwordValue} onChange={this.handlePasswordChange} placeholder="Password"></input>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Login</button>
                </form>
            );
    }

}
