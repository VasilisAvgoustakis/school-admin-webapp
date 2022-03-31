import React, {useState, useEffect, setRole} from 'react';
import { PersonSelectList } from '..';
import axios from 'axios';
import '../stylesheets/globalstyles.css';
import '../stylesheets/personen.css'
import dateToDEFormat from '../../globalFunctions';
import { v4 as uuidv4 } from 'uuid';


class ListRow extends React.Component{
    constructor(props){
        super(props);
        this.clinkPerson = this.clinkPerson.bind(this);
        this.state = {
            data:[this.props.data]
        }
    }


    clinkPerson(){
        document.getElementById(this.state.data[0].person_id.toString()).click()
    }

    

    render(){
        console.log(this.state.data[0].person_id.toString())
        return(
            this.state.data.map(bezugspersonenRow => (
                <tr key={uuidv4()} onClick={this.clinkPerson} className="clickable-list-item">
                    {bezugspersonenRow.rufname &&
                     bezugspersonenRow.nachname && 
                     bezugspersonenRow.beziehung_zu_person2 && 
                     bezugspersonenRow.recht_gegenueber_person_2 ?
                      (<td>{bezugspersonenRow.rufname + " " + bezugspersonenRow.nachname + " (" + 
                        bezugspersonenRow.beziehung_zu_person2 + ") (" + bezugspersonenRow.recht_gegenueber_person_2+")"}</td>):(<td> -- </td>)}
                
                </tr>
                
            )) 
        )
    }
}



export function Bezugspersonen(props){
    
    return(
        
        <div>
        {/* {console.log(props.addresses)} */}
        {props.data.length == 0 ? (<table>
            <thead>
                <tr>
                    <th colSpan="2">Bezugspersonen</th>
                </tr>
            </thead>
            <tbody>
                <tr colSpan="2" style={{position:'absolute'}, {width:'100%'}}>
                    <td><strong>Keine Bezugspersonen gefunden!</strong></td>
                </tr>
            </tbody>
        </table>):(
        <table>
            <thead>
                <tr>
                    <th colSpan="4">Bezugspersonen</th>
                </tr>
            </thead>
            <tbody>
                {/* Hier comes the address row element */}
                
                    {props.data.map(bezugspersonen => (
                        
                        <ListRow key={uuidv4()}
                        data={bezugspersonen}
                        />
                       
                    ))}
             </tbody>
             
        </table>)}
    </div>
    )
    
                    
}



