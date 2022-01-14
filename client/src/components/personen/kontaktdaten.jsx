import React, {useState, useEffect, setRole} from 'react';
import { PersonSelectList } from '..';
import axios from 'axios';
import '../stylesheets/globalstyles.css';


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
                        <td><strong>Keine Kontaktdaten vorhanden!</strong></td>
                    </tr>) : ("") }

                {props.data.mobil_telefon_1 ? (
                    <tr>
                        <td style={{width:'31.5%'}}><strong>Mob. Tel. 1:</strong></td>
                        <td>{props.data.mobil_telefon_1}</td>
                    </tr>) : ("") }
                {props.data.mobil_telefon_2 ? (
                    <tr>
                        <td style={{width:'31.5%'}}><strong>Mob. Tel. 2:</strong></td>
                        <td>{props.data.mobil_telefon_2}</td>
                    </tr>) : ("") }
                {props.data.mobil_telefon_fsx ? (
                    <tr>
                        <td style={{width:'31.5%'}}><strong>Mob. Tel. FSX:</strong></td>
                        <td>{props.data.mobil_telefon_fsx}</td>
                    </tr>) : ("") }
                {props.data.telefon_1 ? (
                    <tr>
                        <td style={{width:'31.5%'}}><strong>Telefon 1:</strong></td>
                        <td>{props.data.telefon_1}</td>
                    </tr>) : ("") }
                {props.data.telefon_2 ? (
                    <tr>
                        <td style={{width:'31.5%'}}><strong>Telefon 2:</strong></td>
                        <td>{props.data.telefon_2}</td>
                    </tr>) : ("") }
                {props.data.telefon_fsx ? (
                    <tr>
                        <td style={{width:'31.5%'}}><strong>Telefon 2:</strong></td>
                        <td>{props.data.telefon_fsx}</td>
                    </tr>) : ("") }
                {props.data.email_1 ? (
                    <tr>
                        <td style={{width:'31.5%'}}><strong>Email 1:</strong></td>
                        <td>{props.data.email_1}</td>
                    </tr>) : ("") }
                {props.data.email_2 ? (
                    <tr>
                        <td style={{width:'31.5%'}}><strong>Email 2:</strong></td>
                        <td>{props.data.email_2}</td>
                    </tr>) : ("") }
                {props.data.email_fsx ? (
                    <tr>
                        <td style={{width:'31.5%'}}><strong>Email fsx:</strong></td>
                        <td>{props.data.email_fsx}</td>
                    </tr>) : ("") }
            </tbody>
        </table>
    </div>
        
    )
      
}



export default KontaktDaten;