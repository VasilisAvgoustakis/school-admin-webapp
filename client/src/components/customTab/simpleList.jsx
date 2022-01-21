import React, {Component} from 'react';
import axios from 'axios';

import { Anwesenheitsliste } from './anwesenheitsPdf';
import '../stylesheets/globalstyles.css';
import dateToDEFormat from '../../globalFunctions'
import { v4 as uuidv4 } from 'uuid';


export class SimpleList extends React.Component{
    constructor(props){
        super(props);
        this.today = new Date();
        this.defaultDateValue = this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+ this.today.getDate();
        this.updateGroup = this.updateGroup.bind(this);
        this.updateDate = this.updateDate.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.showData = this.showData.bind(this);
        this.generatePDF = this.generatePDF.bind(this);
        this.state = {
            showData: false,
            group:'alle',
            selectedDate: this.defaultDateValue,
            data:[]
        }

    }

    async fetchData(group, date){
        return (
        await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/simpleList`, {
            params: {
                group: group,
                date: date,
            },
          }))
      }

    updateGroup(e){
        //console.log(e.target.value)
        this.setState({group: e.target.value})
        
    }

    updateDate(e){
        e.target.value ? (
        this.setState({selectedDate: e.target.value}))
        :
        (this.setState({selectedDate: this.defaultDateValue}))
        
    }

    showData(){
        this.fetchData(this.state.group, this.state.selectedDate).then(res => {
            this.setState({
              data: res.data
            })
          }).then(this.setState({showData: true}));
    }

    generatePDF() {
        console.log("test")
       return( <Anwesenheitsliste />)
    }


    render(){
        console.log(this.state.group)
        console.log(this.state.selectedDate)
        console.log(this.state.data)
        return(
            <div className='simple-list-cont'>
                <div>
                    <label htmlFor="group">Selektiere eine group:</label>
                    <select name='group' id='group' onChange={this.updateGroup}>
                        <option value='alle'>Alle Schüller</option>
                        <optgroup label= 'Lerngruppen'>
                            <option value='unten'>Unten</option>
                            <option value='oben'>Oben</option>
                            <option value='1/2'>1/2</option>
                            <option value='3/4'>3/4</option>
                            <option value='5/6'>5/6</option>
                        </optgroup>
                        <optgroup label='Klassen'>
                            <option value='1'>1. Klasse</option>
                            <option value='2'>2. Klasse</option>
                            <option value='3'>3. Klasse</option>
                            <option value='4'>4. Klasse</option>
                            <option value='5'>5. Klasse</option>
                            <option value='6'>6. Klasse</option>
                        </optgroup>
                    </select>
                    <label htmlFor="sl-date">Selektiere eine Zeitpunkt:</label>
                    <input type="date" id="sl-date" name="sl-date"
                        defaultValue={this.defaultDateValue}
                        min="2016-01-01" onChange={this.updateDate}></input>
                    <button onClick={this.showData}>Abrufen</button>    
                </div>
                <div>
                    {this.state.showData ? (
                    <div>
                    <button onClick={this.generatePDF}>Anwesenheitsliste Generieren</button>
                    <table>
                        <thead>
                            <tr>
                                <th colSpan="4">Liste nach Ausgewählte Kriterien</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((student, index) => {
                                const { Rufname, Jahrgangsstufe, Lerngruppe, Etage} = student
                                return (
                                    <tr key={uuidv4+Rufname}>
                                        <td>{Rufname}</td>
                                        <td>{Jahrgangsstufe}</td>
                                        <td>{Lerngruppe}</td>
                                        <td>{Etage}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    </div>
                    ) :
                    (<p>Selektiere eine Gruppe und/oder eine Zeitpunkt!</p>)}
                </div>
            </div>
        )}
}

