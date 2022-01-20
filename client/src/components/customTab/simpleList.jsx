import React, {Component} from 'react';
import axios from 'axios';
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
        this.state = {
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
        //console.log(e.target.value)
        this.setState({selectedDate: e.target.value})
        
    }

    showData(){
        this.fetchData(this.state.group, this.state.selectedDate).then(res => {
            this.setState({
              data: res.data
            })
          });
    }


    render(){
        
        console.log(this.state.group)
        console.log(this.state.selectedDate)
        console.log(this.state.data)
        return(
            <div className='simple-list-cont'>
                
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
        )}
}

