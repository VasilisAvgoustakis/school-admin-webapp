import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import '../stylesheets/globalstyles.css';
import dateToDEFormat from '../../globalFunctions'
import { v4 as uuidv4 } from 'uuid';


export class Schullerbewegung extends React.Component{
    constructor(props){
        super(props);
        this.updateYear = this.updateYear.bind(this);
        this.getAllData = this.getAllData.bind(this);
        this.state = {
            currentYear: new Date().getFullYear(),
            selectedYear: new Date().getFullYear(),
            jumped3to4Male: 0,
            jumped3to4Female: 0,
            jumped3to4nichtDE: 0,
        }

    }

    async fetchData(year, thirdVar, genderVal, yearSum, ){
        return (
        await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/schullerBewegung`, {
            params: {
                date: year.toString() + '-3' + '-1' ,
                thirdVar: thirdVar,
                genderVal: genderVal,
                yearSum: yearSum
            },
          }))
      }


    getAllData() {
        this.fetchData(this.state.selectedYear, 'geschlecht', 'm', 4 )
        .then(result => {
           
            this.setState({
                jumped3to4Male: result.data[0].Count,
                })
        }
        )
        .then(
        this.fetchData(this.state.selectedYear, 'geschlecht', 'f', 4)
        .then(result => {
        this.setState({
            jumped3to4Female: result.data[0].Count,
            })
            })
        )
        .then(
        this.fetchData(this.state.selectedYear, 'herkunftssprache', '', 4).then(result => {
            this.setState({
                jumped3to4nichtDE: result.data[0].Count,
                })}))
                
        //         .then(
            
        // this.fetchAGs(this.state.core_data.personId).then(result => {
        //     this.setState({
                
        //         arbeitsgruppen: result.data,
        //         })})).then(

        // this.fetchBezugspersonen(this.state.core_data.personId).then(result => {
        //     this.setState({
        //         bezugspersonen: result.data,
                
        //         })
        //                                                         }
        //                                                         )
        //             )
    }
    
    
    updateYear(e){
        //console.log(e.target.value)
        this.setState({selectedYear: e.target.value})
        
    }

    render(){
        //populate lis of available years
        var availableYears = [];
        for(var i = 2010; i <= this.state.currentYear; i++ ){
            availableYears.push(i);
        }
        console.log(availableYears)
        console.log(this.state.selectedYear)
        return(
            <div className='simple-list-cont'>
                <div>
                    <label htmlFor='year_bewegung'>Selektiere ein Jahr für die Auswertung:</label>
                    <select name='year_bewegung' id='year' onChange={this.updateYear} defaultValue={this.state.currentYear}>
                        {
                        availableYears.map(year => {
                            return(
                                <option key={uuidv4()} value={year}>
                                    {year}
                                </option>
                            )
                        })}
                    </select>
                    <button onClick={this.getAllData}>Abrufen</button>    
                </div>
                <div>
                    <p>1.1 Vorzeitig Aufgerückte aus der Jahrgangsstufe 3 in die Jahrgangsstufe 4</p>
                    <label htmlFor='jumped3to4Male'>Männlich:</label>
                    <input name='jumped3to4Male' type= 'text' value={this.state.jumped3to4Male} readOnly></input>
                    <label htmlFor='jumped3to4Female'>Weiblich:</label>
                    <input name='jumped3to4Female' type= 'text' value={this.state.jumped3to4Female} readOnly></input> 
                    <label htmlFor='jumped3to4nichtDE'>ndH insgesamt:</label>
                    <input name='jumped3to4nichtDE' type= 'text' value={this.state.jumped3to4nichtDE} readOnly></input>
                </div>
            </div>
        )}
}

