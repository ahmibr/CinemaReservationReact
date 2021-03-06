import React, { Component } from "react";
import $ from 'jquery';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

import DropdownList from 'react-widgets/lib/DropdownList'
import 'react-widgets/dist/css/react-widgets.css';


export class AdminPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            moviesIsLoading: true, moviesList: [], selectedMovie: null,
            screensIsLoading: true, screensList: [], selectedScreen: null,
            addedMovieName: "",
            isAdmin: null
        }

        this.onMovieSelect = this.onMovieSelect.bind(this);
        this.onScreenSelect = this.onScreenSelect.bind(this);
        this.onClickSubmit = this.onClickSubmit.bind(this);
        this.onSubmitMovie = this.onSubmitMovie.bind(this);
        this.handleMovieNameChange = this.handleMovieNameChange.bind(this);

        this.checkAdmin();
        this.getMovies();
        this.getScreens();

    }

    checkAdmin() {
        const url = "/cinema/isloggedin.php"
        $.ajax({
            method: "GET",
            url: url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                if (data.status == 'true') {
                    this.setState({ isAdmin: (data.type == "Admin") })
                }
                else {
                    this.setState({ isAdmin: false });
                }
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    getMovies() {
        const url = "/cinema/movies.php";
        $.ajax({
            method: "GET",
            url: url,
            cache: false,
            success: function (data) {
                this.setState({ moviesIsLoading: false, moviesList: JSON.parse(data) });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    getScreens() {
        const url = "/cinema/screens.php";
        $.ajax({
            method: "GET",
            url: url,
            cache: false,
            success: function (data) {
                console.log(data);
                this.setState({ screensIsLoading: false, screensList: JSON.parse(data) });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    onMovieSelect(e) {
        this.setState({ selectedMovie: e.ID });
    }

    onScreenSelect(e) {
        this.setState({ selectedScreen: e.ScreenNumber });
    }

    onClickSubmit() {
        if (this.state.selectedMovie == null) {
            alert("Select a movie");
            return;
        }
        if (this.state.selectedScreen == null) {
            alert("Select a screen");
            return;
        }

        const url = "/cinema/createscreening.php";
        $.ajax({
            method: "GET",
            url: url,
            cache: false,
            data: { movieID: this.state.selectedMovie, screenNumber: this.state.selectedScreen },
            dataType: 'json',
            success: function (data) {
                console.log(data);
                if (data == true) {
                    alert("Screening added successfully!")
                }
                else {
                    alert("Screening couldn't be added")
                }
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    onSubmitMovie() {
        if (this.state.addedMovieName.length == 0) {
            alert("Select a movie name");
            return;
        }

        const url = "/cinema/addmovie.php";
        $.ajax({
            method: "GET",
            url: url,
            cache: false,
            data: { movieName: this.state.addedMovieName},
            dataType: 'json',
            success: function (data) {
                console.log(data);
                if (data == true) {
                    alert("Movie added successfully!")
                    this.getMovies();
                    this.getScreens();
                }
                else {
                    alert("Movie couldn't be added")
                }
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    handleMovieNameChange(e) {
        this.setState({ addedMovieName: e.target.value });
    }



    render() {
        if (this.state.isAdmin) {
            let moviesDropDownList = null;
            if (this.state.isLoading)
                moviesDropDownList = <DropdownList busy style={{ width: '280px', marginLeft: "3px", marginTop: '20px' }} />;
            else
                moviesDropDownList = <DropdownList
                    textField='MovieName'
                    data={this.state.moviesList}
                    defaultValue={""}
                    style={{ width: '280px', marginLeft: '3px' }}
                    onSelect={(e) => this.onMovieSelect(e)}
                />;

            let screensDropDownList = null;
            if (this.state.isLoading)
                screensDropDownList = <DropdownList busy style={{ width: '280px', marginLeft: "3px", marginTop: '20px' }} />;
            else
                screensDropDownList = <DropdownList
                    textField={item => !item ? "" : 'Screen (' + item.ScreenNumber + ') (' + item.Rows + ' rows * ' + item.Columns + ' columns)'}
                    data={this.state.screensList}
                    defaultText={""}
                    style={{ width: '280px', marginLeft: '3px' }}
                    onSelect={(e) => this.onScreenSelect(e)}
                />;
            return (<div className='col-md-12'>
                <h2>Add Screening</h2>
                <b>Movie</b>
                {moviesDropDownList}
                <b>Screen</b>
                {screensDropDownList}
                {/* <b>Time</b> */}
                <br></br>
                <button className='btn btn-outline-success btn-lg' onClick={this.onClickSubmit}>Add Screening</button>
                <br></br><br></br>
                <h2>Add Movie</h2>
                <b>Movie Name</b>
                <input required type="text" onChange={this.handleMovieNameChange} className="form-control" style={{ width: "300px" }} placeholder="Movie Name"></input>
                <br></br>
                <button className='btn btn-outline-success btn-lg' onClick={this.onSubmitMovie}>Add Movie</button>
            </div>
            )
        }
        else if (this.state.isAdmin == null) {
            return null;
        }
        else { return <Redirect to='/homepage' /> }

    }

}
