import React, { Component } from "react";
import './cinemaSeats.css';
import $ from 'jquery';

export class CinemaSeats extends Component {

    seatsGrid = [];
    numberOfRows = 6;
    numberOfColumns = 7;

    UNRESERVED_BUTTON = 'btn-primary';
    RESERVED_BUTTON = 'btn-secondary';
    MY_RESERVED_BUTTON = 'btn-warning';
    CURRENT_SELECTED_BUTTON = 'btn-success'

    screenNumber = 0;
    screeningID = 0;

    reservedSeats = [];
    myReservedSeats = []
    selectedSeats = []

    

    constructor(props) {
        super(props);

        if (props.match && props.match.params && props.match.params.screeningID){
            this.screeningID = props.match.params.screeningID;
        }
        

        this.state = {
            seatsGrid: this.seatsGrid,
            reservingState: false
        };

        this.screenNumber = 1;
        this.getScreenInfo();   
    }

    getScreenInfo() {
        const url = "/cinema/screen.php"
        $.ajax({
            method: "GET",
            url: url,
            data: { screeningID: this.screeningID, screenNumber: this.screenNumber },
            dataType: 'json',
            cache: false,
            success: function (data) {
                console.log(data);
                this.screenNumber = data.screenNumber;
                this.reservedSeats = data.reservedSeats;
                this.myReservedSeats = data.myReservedSeats;
                this.numberOfRows = parseInt(data.numberOfRows);
                this.numberOfColumns = parseInt(data.numberOfColumns);
                this.initialize();
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    initialize(){
        this.seatsGrid = [];
        for (let i = 0; i < this.numberOfRows; i++) {
            this.seatsGrid.push(new Array(this.numberOfColumns).fill(this.UNRESERVED_BUTTON));
        }
        this.updateSeats();
    }

    updateSeats() {
        for (let i = 0; i < this.reservedSeats.length; i++) {
            let index = this.reservedSeats[i] - 1;
            let reservedRow = Math.floor(index/this.numberOfColumns);
            let reservedCol = index%this.numberOfColumns;
            console.log(reservedRow,reservedCol);
            this.seatsGrid[reservedRow][reservedCol] = this.RESERVED_BUTTON;
        }

        for (let i = 0; i < this.myReservedSeats.length; i++) {
            let index = this.myReservedSeats[i] - 1;
            let reservedRow = Math.floor(index/this.numberOfColumns);
            let reservedCol = index%this.numberOfColumns;

            this.seatsGrid[reservedRow][reservedCol] = this.MY_RESERVED_BUTTON;
        }

        this.setState({
            seatsGrid: this.seatsGrid,
        });
    }

    onSelect(row, column) {
        let index = row*this.numberOfColumns + column + 1;
        if (this.reservedSeats.find(seat => seat == index)) {
            return true;
        }

        if (this.selectedSeats.find(seat => seat == index)){
            this.seatsGrid[row][column] = this.UNRESERVED_BUTTON;
            let indexOfSeat = this.selectedSeats.indexOf(this.selectedSeats.find(seat => seat == index));

            this.selectedSeats.splice(indexOfSeat, 1);

            this.setState({
                seatsGrid: this.seatsGrid
            });
            return true;
        } else {
            this.selectedSeats.push(index);
            this.seatsGrid[row][column] = this.CURRENT_SELECTED_BUTTON;

            this.setState({
                seatsGrid: this.seatsGrid,
            });
            return true;
        }

    }

    onSubmitReservation() {
        if (this.selectedSeats.length === 0) {
            alert("Select seats to reserve");
            return;
        }

        this.setState({reservingState: true});
        const url = "/cinema/reserve.php";
        $.ajax({
            method: "GET",
            url: url,
            data: { screeningID: this.screeningID,selectedSeats: this.selectedSeats },
            cache: false,
            success: function (data) {
                this.setState({ reservingState: false});
                console.log(data);
                if(data === 'true'){
                    alert("Reserved successfully!")
                    this.selectedSeats = []
                }
                else{
                    alert("Couldn't reserve, maybe seats were reserved by someone else")
                    this.selectedSeats = []
                }
                this.getScreenInfo();
            }.bind(this),
            error: function (xhr, status, err) {
                this.setState({ reservingState: false});
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }


    render() {
        let index = 1;

        let reserveButton;

        if (this.state.reservingState === true) {
            reserveButton = <button className='btn btn-outline-success btn-lg'
                disabled>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Loading
           </button>
        }
        else {
            reserveButton = <button className='btn btn-outline-success btn-lg' onClick={(e) => this.onSubmitReservation()}>Reserve Seats</button>
        }

        var getSeatButton = function(rowIndex,column) {
            if (this.state.seatsGrid[rowIndex][column] === this.RESERVED_BUTTON || this.state.seatsGrid[rowIndex][column] === this.MY_RESERVED_BUTTON){
                return <button 
                    disabled 
                    className={"btn  btn-block " + this.state.seatsGrid[rowIndex][column]}
                    value={index}>
                    {index++}</button>
            }
            else{
                return <button onClick={(e) =>
                    this.onSelect(rowIndex, column)}
                    className={"btn  btn-block " + this.state.seatsGrid[rowIndex][column]}
                    value={index}>
                    {index++}</button>
            }
        }.bind(this);


        return (

            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-md-12'>
                        <h1>Screen {this.screenNumber}</h1>
                        <table className="table">
                            <tbody>
                                {this.state.seatsGrid.map((row, rowIndex) => {
                                    return (<tr key={rowIndex}>
                                        {row.map((col, column) =>
                                            <td key={column}>
                                             {getSeatButton(rowIndex,column)}
                                            </td>
                                        )}
                                    </tr>);
                                }
                                )}
                            </tbody>

                        </table>
                        <div className='text-center mb-5'>
                            {reserveButton}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
