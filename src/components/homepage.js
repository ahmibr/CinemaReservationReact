import React, { Component } from "react";
import $ from 'jquery';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

export class HomePage extends Component {

    moviesList = [{id:1,name:"Inception1"}, {id:2,name:"Inception2"}, {id:3,name:"Inception3"}]

    constructor(props) {
        super(props);   
        this.state = {moviesList: []}; 
        this.getMovies(); 
    }

    getMovies(){
        const url = "/cinema/movies.php";
        $.ajax({
            method: "GET",
            url: url,
            cache: false,
            success: function (data) {
                console.log(data);
                this.setState({moviesList:JSON.parse(data)});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }
    
    render() {
        return (<table className="table">
            <tbody>
                {this.state.moviesList.map((movie, movieIndex) => {
                    return (<tr key={movieIndex}>
                        <td><a href={"/movie/"+movie.ID} className="list-group-item list-group-item-action list-group-item-primary">{movie.MovieName}</a></td>
                    </tr>);
                }
                )}
            </tbody>
        </table>)
    }

}
