import React, {useState, useEffect, setRole} from 'react';
import { PersonSelectList } from '..';
import axios from 'axios';
import '../stylesheets/dashboard.css';
import '../stylesheets/personen.css';


export function KindDaten(props) {
    
    
    return (
    
    <div>
        {/* {console.log(props.data)} */}
        {props.data.einschulungsdatum ? (
        <table>
            <thead>
                <tr>
                    <th colSpan="2">Kind bezogene Daten</th>
                </tr>
            </thead>
            <tbody>
            {props.data.geschlecht ? (
                    <tr>
                        <td>Geschlecht:</td>
                        <td>{props.data.geschlecht}</td>
                    </tr>) : ("") }

                <tr>
                    <td>Einschulungsdatum:</td>
                    <td>{props.data.einschulungsdatum}</td>
                </tr>

                {props.data.Jahrgangsstufe ? (
                    <tr>
                        <td>aktuelle Klasse:</td>
                        <td>{props.data.Jahrgangsstufe}</td>
                    </tr>) : ("") }

                {props.data.Lerngruppe ? (
                <tr>
                    <td>aktuelle Lerngruppe:</td>
                    <td>{props.data.Lerngruppe}</td>
                </tr>) : ("") }

                {props.data.mittag == 1 ? (
                <tr>
                    <td>Mittag:</td>
                    <td>JA</td>
                </tr>) : (<td>Nein</td>) }

                {props.data.betreuung_umfang ? (
                <tr>
                    <td>Betreuungsumfang:</td>
                    <td>{props.data.betreuung_umfang}</td>
                </tr>) : ("") }

                {props.data.betreuung_beginn ? (
                <tr>
                    <td>Betreuungsbeginn:</td>
                    <td>{props.data.betreuung_beginn}</td>
                </tr>) : ("") }

                {props.data.betreuung_ende ? (
                <tr>
                    <td>Betreuungsende:</td>
                    <td>{props.data.betreuung_ende}</td>
                </tr>) : ("") }

                {props.data.betreuung_ferien ? (
                <tr>
                    <td>Betreuungbedarf w. Ferien?:</td>
                    <td>Ja</td>
                </tr>) : (<tr>
                    <td>Betreuungbedarf w. Ferien?:</td>
                    <td>NEIN</td>
                </tr>) }

                {props.data.staatsangehoerigkeit ? (
                <tr>
                    <td>Staatsangehörigkeit:</td>
                    <td>{props.data.staatsangehoerigkeit}</td>
                </tr>) : (<td>Nein</td>) }

                {props.data.but_ende != 0 ? (
                <tr>
                    <td>BuT:</td>
                    <td>JA bis {props.data.but_ende}</td>
                </tr>) : (<tr>
                        <td>aktl. BuT? :</td>
                        <td>Nein</td>
                    </tr>) }

            </tbody>
        </table>) : ("") }
    </div>
        
    )
      
}



export default KindDaten;