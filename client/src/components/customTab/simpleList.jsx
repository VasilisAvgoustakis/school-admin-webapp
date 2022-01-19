import React, {Component} from 'react';
import axios from 'axios';
import '../stylesheets/globalstyles.css';
import dateToDEFormat from '../../globalFunctions'
import { v4 as uuidv4 } from 'uuid';


export class SimpleList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            settings:[]
        }

    }


    render(){
        var today = new Date();
        var defaultDateValue = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        console.log(defaultDateValue)
        return(
            <div className='simple-list-cont'>
                
                <label htmlFor="gruppe">Selektiere eine Gruppe:</label>
                <select name='gruppe' id='gruppe'>
                    <option value='Alle Gruppen'>Alle Schüller</option>
                    <option value='Lerngruppe'>Lerngruppe</option>
                    <option value='Jahrgangsstuffe'>Jahrgangsstufe</option>
                </select>
                <label htmlFor="sl-date">Selektiere eine Zeitpunkt:</label>
                <input type="date" id="sl-date" name="sl-date"
                    defaultValue={defaultDateValue}
                    min="2016-01-01"></input>
                <button>Abrufen</button>
                
            </div>
        )}
}

