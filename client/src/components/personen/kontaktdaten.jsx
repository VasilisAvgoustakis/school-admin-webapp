import React, {useState, useEffect, setRole} from 'react';
import { PersonSelectList } from '..';
import axios from 'axios';
import '../stylesheets/dashboard.css';
import '../stylesheets/personen.css';


export function KontaktDaten(props) {
    
    
    return (
    
    <div>
        
        <table>
            <thead>
                <tr>
                    <th colSpan="2">Kontaktdaten</th>
                </tr>
            </thead>
            <tbody>
                {props.data.einschulungsdatum ? (
                    <tr>
                        <td>Keine Kontaktdaten vorhanden!</td>
                    </tr>) : ("") }

                {props.data.mobil_telefon_1 ? (
                    <tr>
                        <td>Mob. Tel. 1:</td>
                        <td>{props.data.mobil_telefon_1}</td>
                    </tr>) : ("") }
                {props.data.mobil_telefon_2 ? (
                    <tr>
                        <td>Mob. Tel. 2:</td>
                        <td>{props.data.mobil_telefon_2}</td>
                    </tr>) : ("") }
                {props.data.mobil_telefon_fsx ? (
                    <tr>
                        <td>Mob. Tel. FSX:</td>
                        <td>{props.data.mobil_telefon_fsx}</td>
                    </tr>) : ("") }
                {props.data.telefon_1 ? (
                    <tr>
                        <td>Telefon 1:</td>
                        <td>{props.data.telefon_1}</td>
                    </tr>) : ("") }
                {props.data.telefon_2 ? (
                    <tr>
                        <td>Telefon 2:</td>
                        <td>{props.data.telefon_2}</td>
                    </tr>) : ("") }
                {props.data.telefon_fsx ? (
                    <tr>
                        <td>Telefon 2:</td>
                        <td>{props.data.telefon_fsx}</td>
                    </tr>) : ("") }
                {props.data.email_1 ? (
                    <tr>
                        <td>Email 1:</td>
                        <td>{props.data.email_1}</td>
                    </tr>) : ("") }
                {props.data.email_2 ? (
                    <tr>
                        <td>Email 2:</td>
                        <td>{props.data.email_2}</td>
                    </tr>) : ("") }
                {props.data.email_fsx ? (
                    <tr>
                        <td>Email fsx:</td>
                        <td>{props.data.email_fsx}</td>
                    </tr>) : ("") }
            </tbody>
        </table>
    </div>
        
    )
      
}



export default KontaktDaten;