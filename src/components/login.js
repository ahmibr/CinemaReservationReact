import React, { Component } from "react";
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import './login.css'
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
            isLoggedIn: false,
            userType: 'Guest'
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
                console.log("Hello" + data);
                if (data.status == 'true') {
                    this.setState({ isLoggedIn: true,  userType: data.type})
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
                    if (data.status == 'true') {
                        this.setState({ isLoggedIn: true,userType: data.type })
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
            if(this.state.userType == 'Customer')
                return <Redirect to='/homepage' />
            else if(this.state.userType == "Admin")
                return <Redirect to='/admin' />
        }
        else
            return (
                <form className="mycenter">
                    <div className="form-group">
                        <label className="mycenter">Username</label>
                        <input required type="text" className="form-control" value={this.state.usernameValue} onChange={this.handleUsernameChange} placeholder="Enter Username"></input>
                    </div>
                    <div className="form-group">
                        <label className="mycenter">Password</label>
                        <input required type="password" className="form-control" value={this.state.passwordValue} onChange={this.handlePasswordChange} placeholder="Password"></input>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.handleSubmit} style={{ marginLeft: "4em" }}>Login</button>
                </form>
            );
    }

}
