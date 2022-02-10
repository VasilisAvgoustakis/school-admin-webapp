import React, {useState, useEffect, setRole} from 'react';
import { PersonSelectList } from '..';
import axios from 'axios';
import '../stylesheets/globalstyles.css';
import {dateToDEFormat} from '../../globalFunctions';
import { v4 as uuidv4 } from 'uuid';


class AG extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:[this.props.data]
        }
    }

    render(){
        //console.log(this.state.data)
        return(
            
            this.state.data.map(arbGrpRow => (
                <tr key={arbGrpRow.person_id+arbGrpRow.bezeichnung}>
                    {arbGrpRow.koordination_der_ag == 1 ? (<td>JA</td>):(<td>NEIN</td>)}
                    {arbGrpRow.bezeichnung ? (<td>{arbGrpRow.bezeichnung}</td>):(<td> -- </td>)}
                    {arbGrpRow.email ? (<td>{arbGrpRow.email}</td>):(<td> -- </td>)}
                    {arbGrpRow.datum_mitgliedschaftsbeginn ? (
                        <td>{dateToDEFormat(new Date(arbGrpRow.datum_mitgliedschaftsbeginn))}</td>)
                        :(<td> -- </td>)}
                    {arbGrpRow.datum_mitgliedschaftsende ? (
                        <td>{dateToDEFormat(new Date(arbGrpRow.datum_mitgliedschaftsende))}</td>)
                        :(<td> -- </td>)}
                    
                </tr>
                
            )) 
        )
    }
}



export function AGData(props){
    
    
    return(
        
        <div>
        {/* {console.log(props.addresses)} */}
        {props.ags.length == 0 ? (<table>
            <thead>
                <tr>
                    <th colSpan="5">AG Mitgliedschaft</th>
                </tr>
            </thead>
            <tbody>
                <tr colSpan="5" style={{position:'absolute'}, {width:'100%'}}>
                    <td><strong>Keine aktuelle AG Mitgliedschaft!</strong></td>
                </tr>
            </tbody>
        </table>):(
        <table>
            <thead>
                <tr>
                    <th colSpan="5">AG Mitgliedschaft</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>AG Koordinator</strong></td>
                    <td><strong>Bezeichnung</strong></td>
                    <td><strong>AG Email</strong></td>
                    <td><strong>Beginn Datum</strong></td>
                    <td><strong>Ende Datum</strong></td>
                </tr>
                {/* Hier comes the address row element */}
                
                    {props.ags.map(ag => (
                        
                        <AG key={uuidv4()}
                        data={ag}
                        />
                       
                    ))}
                
                

            </tbody>
        </table>)}
    </div>
    )
    
                    
}



