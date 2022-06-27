import { SERVER_IP } from '../../globalFunctions';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import '../../stylesheets/globalstyles.css';
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
            jumped4to5Male: 0,
            jumped4to5Female: 0,
            jumped4to5nichtDE: 0,
            jumped5to6Male: 0,
            jumped5to6Female: 0,
            jumped5to6nichtDE: 0,
            jumped1to3MaleYearEnd: 0,
            jumped1to3FemaleYearEnd: 0,
            jumped1to3nichtDEYearEnd:0,
            jumped2to4MaleYearEnd: 0,
            jumped2to4FemaleYearEnd: 0,
            jumped2to4nichtDEYearEnd: 0,
            jumped3to5MaleYearEnd: 0,
            jumped3to5FemaleYearEnd: 0,
            jumped3to5nichtDEYearEnd: 0,
            jumped4to6MaleYearEnd: 0,
            jumped4to6FemaleYearEnd: 0,
            jumped4to6nichtDEYearEnd: 0,
            jumped5to7MaleYearEnd: 0,
            jumped5to7FemaleYearEnd: 0,
            jumped5to7nichtDEYearEnd: 0,
            jumped4toGymMaleYearEnd: 0,
            jumped4toGymFemaleYearEnd: 0,
            jumped4toGymnichtDEYearEnd: 0,
            absolventenMale: 0,
            absolventenFemale: 0,
            absolventenNichtDE: 0


        }

    }

    async fetchData(year, month, day, thirdVar, genderVal, yearSum, ){
        return (
        await axios.get(`http://${SERVER_IP}:3000/schullerBewegung`, {
            params: {
                date: year.toString() + '-' + month + '-' + day ,
                thirdVar: thirdVar,
                genderVal: genderVal,
                yearSum: yearSum
            },
          }))
      }

    async fetchData2(year, month, day, thirdVar, genderVal, yearSum, ){
    return (
    await axios.get(`http://${SERVER_IP}:3000/schullerBewegung2`, {
        params: {
            date: year.toString() + '-' + month + '-' + day ,
            thirdVar: thirdVar,
            genderVal: genderVal,
            yearSum: yearSum
        },
        }))
    }

    async fetchData3(year, month, day, thirdVar, genderVal ){
        return (
        await axios.get(`http://${SERVER_IP}:3000/sekundarvon4`, {
            params: {
                date: year.toString() + '-' + month + '-' + day ,
                thirdVar: thirdVar,
                genderVal: genderVal,
                //yearSum: yearSum
            },
            }))
        }

    async fetchData4(year, month, day, thirdVar, genderVal ){
        return (
        await axios.get(`http://${SERVER_IP}:3000/absolventen`, {
            params: {
                date: year.toString() + '-' + month + '-' + day ,
                thirdVar: thirdVar,
                genderVal: genderVal,
                //yearSum: yearSum
            },
            }))
        }


    getAllData() {

        this.fetchData(this.state.selectedYear, 3, 1, 'geschlecht', 'm', 4 )
        .then(result => {
            this.setState({
                jumped3to4Male: result.data[0].Count,
                })})
        .then(
        this.fetchData(this.state.selectedYear, 3, 1, 'geschlecht', 'f', 4)
        .then(result => {
        this.setState({
            jumped3to4Female: result.data[0].Count,
            })})
        )
        .then(
        this.fetchData(this.state.selectedYear, 3, 1, 'herkunftssprache', '', 4).then(result => {
            this.setState({
                jumped3to4nichtDE: result.data[0].Count,
                })}))
        .then(
            this.fetchData(this.state.selectedYear, 3, 1, 'geschlecht', 'm', 5).then(result => {
                this.setState({
                    jumped4to5Male: result.data[0].Count,
                    })}))
        .then(
            this.fetchData(this.state.selectedYear, 3, 1, 'geschlecht', 'f', 5).then(result => {
                this.setState({
                    jumped4to5Female: result.data[0].Count,
                    })}))
        .then(
            this.fetchData(this.state.selectedYear, 3, 1, 'herkunftssprache', '', 5).then(result => {
                this.setState({
                    jumped4to5nichtDE: result.data[0].Count,
                    })}))
        .then(
            this.fetchData(this.state.selectedYear, 3, 1, 'geschlecht', 'm', 6).then(result => {
                this.setState({
                    jumped5to6Male: result.data[0].Count,
                    })}))
        .then(
            this.fetchData(this.state.selectedYear, 3, 1, 'geschlecht', 'f', 6).then(result => {
                this.setState({
                    jumped5to6Female: result.data[0].Count,
                    })}))
        .then(
            this.fetchData(this.state.selectedYear, 3, 1, 'herkunftssprache', '', 6).then(result => {
                this.setState({
                    jumped5to6nichtDE: result.data[0].Count,
                    })}))
        .then(
            this.fetchData2(this.state.selectedYear, 7, 31, 'geschlecht', 'm', 3).then(result => {
                this.setState({
                    jumped1to3MaleYearEnd: result.data[0].Count,
                    })}))
        .then(
            this.fetchData2(this.state.selectedYear, 7, 31, 'geschlecht', 'f', 3).then(result => {
                this.setState({
                    jumped1to3FemaleYearEnd: result.data[0].Count,
                    })}))
        .then(
            this.fetchData2(this.state.selectedYear, 7, 31, 'herkunftssprache', '', 3).then(result => {
                this.setState({
                    jumped1to3nichtDEYearEnd: result.data[0].Count,
                    })}))
        .then(
            this.fetchData2(this.state.selectedYear, 7, 31, 'geschlecht', 'm', 4).then(result => {
                this.setState({
                    jumped2to4MaleYearEnd: result.data[0].Count,
                    })}))
        .then(
            this.fetchData2(this.state.selectedYear, 7, 31, 'geschlecht', 'f', 4).then(result => {
                this.setState({
                    jumped2to4FemaleYearEnd: result.data[0].Count,
                    })}))
        .then(
            this.fetchData2(this.state.selectedYear, 7, 31, 'herkunftssprache', '', 4).then(result => {
                this.setState({
                    jumped2to4nichtDEYearEnd: result.data[0].Count,
                    })}))
        .then(
            this.fetchData2(this.state.selectedYear, 7, 31, 'geschlecht', 'm', 5).then(result => {
                this.setState({
                    jumped3to5MaleYearEnd: result.data[0].Count,
                    })}))
        .then(
            this.fetchData2(this.state.selectedYear, 7, 31, 'geschlecht', 'f', 5).then(result => {
                this.setState({
                    jumped3to5FemaleYearEnd: result.data[0].Count,
                    })}))
        .then(
            this.fetchData2(this.state.selectedYear, 7, 31, 'herkunftssprache', '', 5).then(result => {
                this.setState({
                    jumped3to5nichtDEYearEnd: result.data[0].Count,
                    })}))
        .then(
            this.fetchData2(this.state.selectedYear, 7, 31, 'geschlecht', 'm', 6).then(result => {
                this.setState({
                    jumped4to6MaleYearEnd: result.data[0].Count,
                    })}))
        .then(
            this.fetchData2(this.state.selectedYear, 7, 31, 'geschlecht', 'f', 6).then(result => {
                this.setState({
                    jumped4to6FemaleYearEnd: result.data[0].Count,
                    })}))
        .then(
            this.fetchData2(this.state.selectedYear, 7, 31, 'herkunftssprache', '', 6).then(result => {
                this.setState({
                    jumped4to6nichtDEYearEnd: result.data[0].Count,
                    })}))
        .then(
            this.fetchData2(this.state.selectedYear, 7, 31, 'geschlecht', 'm', 7).then(result => {
                this.setState({
                    jumped5to7MaleYearEnd: result.data[0].Count,
                    })}))
        .then(
            this.fetchData2(this.state.selectedYear, 7, 31, 'geschlecht', 'f', 7).then(result => {
                this.setState({
                    jumped5to7FemaleYearEnd: result.data[0].Count,
                    })}))
        .then(
            this.fetchData2(this.state.selectedYear, 7, 31, 'herkunftssprache', '', 7).then(result => {
                this.setState({
                    jumped5to7nichtDEYearEnd: result.data[0].Count,
                    })}))
        .then(
            this.fetchData3(this.state.selectedYear, 7, 31, 'geschlecht', 'm').then(result => {
                this.setState({
                    jumped4toGymMaleYearEnd: result.data[0].Count,
                    })}))
        .then(
            this.fetchData3(this.state.selectedYear, 7, 31, 'geschlecht', 'f').then(result => {
                this.setState({
                    jumped4toGymFemaleYearEnd: result.data[0].Count,
                    })}))
        .then(
            this.fetchData3(this.state.selectedYear, 7, 31, 'herkunftssprache', '').then(result => {
                this.setState({
                    jumped4toGymnichtDEYearEnd: result.data[0].Count,
                    })}))
        .then(
            this.fetchData4(this.state.selectedYear, 7, 31, 'geschlecht', 'm').then(result => {
                this.setState({
                    absolventenMale: result.data[0].Count,
                    })}))
        .then(
            this.fetchData4(this.state.selectedYear, 7, 31, 'geschlecht', 'f').then(result => {
                this.setState({
                    absolventenFemale: result.data[0].Count,
                    })}))
        .then(
            this.fetchData4(this.state.selectedYear, 7, 31, 'herkunftssprache', '').then(result => {
                this.setState({
                    absolventenNichtDE: result.data[0].Count,
                    })}))
                
        
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
        // console.log(availableYears)
        // console.log(this.state.selectedYear)
        return(
            <div className='simple-list-cont'>
                <div>
                    <label htmlFor='year_bewegung'>Selektiere ein Jahr für die Auswertung:</label>
                    <select name='year_bewegung' id='year' onChange={this.updateYear} defaultValue={this.state.selectedYear}
                    >
                    <option key={uuidv4()} value={this.state.currentYear}>
                                    YYYY
                    </option>
                    
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
                    <p>Aktuell selektiertes Jahr: {this.state.selectedYear}</p>
                    <h3>1. Schülerinnen und Schüler, die im Laufe desSchuljahres (bis zum 1. März) vorzeitig in die nächsthöhere Jahrgangsstufe aufgerückt sind</h3>
                    <p>1.1 Vorzeitig Aufgerückte aus der Jahrgangsstufe 3 in die Jahrgangsstufe 4</p>
                    <label htmlFor='jumped3to4Male'>Männlich:</label>
                    <input name='jumped3to4Male' type= 'text' value={this.state.jumped3to4Male} readOnly></input>
                    <label htmlFor='jumped3to4Female'>Weiblich:</label>
                    <input name='jumped3to4Female' type= 'text' value={this.state.jumped3to4Female} readOnly></input> 
                    <label htmlFor='jumped3to4nichtDE'>ndH insgesamt:</label>
                    <input name='jumped3to4nichtDE' type= 'text' value={this.state.jumped3to4nichtDE} readOnly></input>
                
                    <p>1.2 Vorzeitig Aufgerückte aus der Jahrgangsstufe 4 in die Jahrgangsstufe 5</p>
                    <label htmlFor='jumped4to5Male'>Männlich:</label>
                    <input name='jumped4to5Male' type= 'text' value={this.state.jumped4to5Male} readOnly></input>
                    <label htmlFor='jumped4to5Female'>Weiblich:</label>
                    <input name='jumped4to5Female' type= 'text' value={this.state.jumped4to5Female} readOnly></input> 
                    <label htmlFor='jumped4to5nichtDE'>ndH insgesamt:</label>
                    <input name='jumped4to5nichtDE' type= 'text' value={this.state.jumped4to5nichtDE} readOnly></input>

                    <p>1.3 Vorzeitig Aufgerückte aus der Jahrgangsstufe 5in die Jahrgangsstufe 6</p>
                    <label htmlFor='jumped5to6Male'>Männlich:</label>
                    <input name='jumped5to6Male' type= 'text' value={this.state.jumped5to6Male} readOnly></input>
                    <label htmlFor='jumped5to6Female'>Weiblich:</label>
                    <input name='jumped5to6Female' type= 'text' value={this.state.jumped5to6Female} readOnly></input> 
                    <label htmlFor='jumped5to6nichtDE'>ndH insgesamt:</label>
                    <input name='jumped5to6nichtDE' type= 'text' value={this.state.jumped5to6nichtDE} readOnly></input>

                    <h3>2. Am Ende des Schuljahres aufrückendeSchülerinnen und Schüler, die eine Jahrgangstufeüberspringen</h3>
                    <p>2.1 Aufrückende aus der Jahrgangsstufe 1 in die Jahrgangsstufe 3</p>
                    <label htmlFor='jumped1to3MaleYearEnd'>Männlich:</label>
                    <input name='jumped1to3MaleYearEnd' type= 'text' value={this.state.jumped1to3MaleYearEnd} readOnly></input>
                    <label htmlFor='jumped1to3FemaleYearEnd'>Weiblich:</label>
                    <input name='jumped1to3FemaleYearEnd' type= 'text' value={this.state.jumped1to3FemaleYearEnd} readOnly></input> 
                    <label htmlFor='jumped1to3nichtDEYearEnd'>ndH insgesamt:</label>
                    <input name='jumped1to3nichtDEYearEnd' type= 'text' value={this.state.jumped1to3nichtDEYearEnd} readOnly></input>

                    <p>2.2 Aufrückende aus der Jahrgangsstufe 2 in die Jahrgangsstufe 4</p>
                    <label htmlFor='jumped2to4MaleYearEnd'>Männlich:</label>
                    <input name='jumped2to4MaleYearEnd' type= 'text' value={this.state.jumped2to4MaleYearEnd} readOnly></input>
                    <label htmlFor='jumped2to4FemaleYearEnd'>Weiblich:</label>
                    <input name='jumped2to4FemaleYearEnd' type= 'text' value={this.state.jumped2to4FemaleYearEnd} readOnly></input> 
                    <label htmlFor='jumped2to4nichtDEYearEnd'>ndH insgesamt:</label>
                    <input name='jumped2to4nichtDEYearEnd' type= 'text' value={this.state.jumped2to4nichtDEYearEnd} readOnly></input>

                    <p>2.3 Aufrückende aus der Jahrgangsstufe 3 in die Jahrgangsstufe 5</p>
                    <label htmlFor='jumped3to5MaleYearEnd'>Männlich:</label>
                    <input name='jumped3to5MaleYearEnd' type= 'text' value={this.state.jumped3to5MaleYearEnd} readOnly></input>
                    <label htmlFor='jumped3to5FemaleYearEnd'>Weiblich:</label>
                    <input name='jumped3to5FemaleYearEnd' type= 'text' value={this.state.jumped3to5FemaleYearEnd} readOnly></input> 
                    <label htmlFor='jumped2to4nichtDEYearEnd'>ndH insgesamt:</label>
                    <input name='jumped3to5nichtDEYearEnd' type= 'text' value={this.state.jumped3to5nichtDEYearEnd} readOnly></input>

                    <p>2.4 Aufrückende aus der Jahrgangsstufe 4 in die Jahrgangsstufe 6</p>
                    <label htmlFor='jumped4to6MaleYearEnd'>Männlich:</label>
                    <input name='jumped4to6MaleYearEnd' type= 'text' value={this.state.jumped4to6MaleYearEnd} readOnly></input>
                    <label htmlFor='jumped4to6FemaleYearEnd'>Weiblich:</label>
                    <input name='jumped4to6FemaleYearEnd' type= 'text' value={this.state.jumped4to6FemaleYearEnd} readOnly></input> 
                    <label htmlFor='jumped4to6nichtDEYearEnd'>ndH insgesamt:</label>
                    <input name='jumped4to6nichtDEYearEnd' type= 'text' value={this.state.jumped4to6nichtDEYearEnd} readOnly></input>

                    <p>2.5 Aufrückende aus der Jahrgangsstufe 5 in die Jahrgangsstufe 7</p>
                    <label htmlFor='jumped5to7MaleYearEnd'>Männlich:</label>
                    <input name='jumped5to7MaleYearEnd' type= 'text' value={this.state.jumped5to7MaleYearEnd} readOnly></input>
                    <label htmlFor='jumped5to7FemaleYearEnd'>Weiblich:</label>
                    <input name='jumped5to7FemaleYearEnd' type= 'text' value={this.state.jumped5to7FemaleYearEnd} readOnly></input> 
                    <label htmlFor='jumped5to7nichtDEYearEnd'>ndH insgesamt:</label>
                    <input name='jumped5to7nichtDEYearEnd' type= 'text' value={this.state.jumped5to7nichtDEYearEnd} readOnly></input>

                    <h3>4. Schülerinnen und Schüler der Jahrgangsstufe 4,die in einen mit Jahrgangsstufe 5beginnenden Zug eines Gymnasiums oder einerintegrierten Sekundarschule übergehen</h3>
                    <label htmlFor='jumped4toGymMaleYearEnd'>Männlich:</label>
                    <input name='jumped4togymMaleYearEnd' type= 'text' value={this.state.jumped4toGymMaleYearEnd} readOnly></input>
                    <label htmlFor='jumped4toGymFemaleYearEnd'>Weiblich:</label>
                    <input name='jumped4toGymFemaleYearEnd' type= 'text' value={this.state.jumped4toGymFemaleYearEnd} readOnly></input> 
                    <label htmlFor='jumped4toGymnichtDEYearEnd'>ndH insgesamt:</label>
                    <input name='jumped4toGymnichtDEYearEnd' type= 'text' value={this.state.jumped4toGymnichtDEYearEnd} readOnly></input>

                    <h3>5 Von den in die Jahrgangsstufe 7 aufrückendenSchülerinnen und Schülernerhielten eine Förderprognose mit dem Ergebnis:</h3>
                    <p>5.3 keine oder sonstige Förderprognose</p>
                    <label htmlFor='absolventenMale'>Männlich:</label>
                    <input name='absolventenMale' type= 'text' value={this.state.absolventenMale} readOnly></input>
                    <label htmlFor='absolventenFemale'>Weiblich:</label>
                    <input name='absolventenFemale' type= 'text' value={this.state.absolventenFemale} readOnly></input> 
                    <label htmlFor='absolventenNichtDe'>ndH insgesamt:</label>
                    <input name='absolventenNichtDe' type= 'text' value={this.state.absolventenNichtDE} readOnly></input>
                </div>
            </div>
        )}
}

