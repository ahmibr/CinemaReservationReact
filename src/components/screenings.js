import React, { Component } from "react";
import $ from 'jquery';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

export class Screenings extends Component {
    movieID = 0;

    constructor(props) {
        super(props);   
        if (props.match && props.match.params && props.match.params.movieID){
            this.movieID = props.match.params.movieID;
        }
        this.state = {screeningList: []};
        this.getScreenings();
    }

    getScreenings(){
        const url = "/cinema/screenings.php";
        $.ajax({
            method: "GET",
            url: url,
            data: {movieID:this.movieID},
            cache: false,
            success: function (data) {
                console.log(data);
                this.setState({screeningList:JSON.parse(data)});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    render() {
        return (<table className="table">
            <tbody>
                {this.state.screeningList.map((screen, screenIndex) => {
                    return (<tr key={screenIndex}>
                        <td><a href={"/reserve/"+screen.ID} className="list-group-item list-group-item-action list-group-item-primary">Screen {screen.ScreenNumber} Date {screen.ScreenTime}</a></td>
                    </tr>);
                }
                )}
            </tbody>
        </table>)
    }

}
