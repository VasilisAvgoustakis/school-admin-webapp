import React from 'react';
import '../../stylesheets/globalstyles.css';
import {dateToDEFormat} from '../../globalFunctions'


export function KindDaten(props) {
    
    
    return (
    
    <div>
        
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
                        <td><strong>Geschlecht:</strong></td>
                        <td>{props.data.geschlecht}</td>
                    </tr>) : ("") }

                {props.data.einschulungsdatum ? (
                    <tr>
                        <td><strong>Einschulungsdatum:</strong></td>
                        <td>{dateToDEFormat(new Date(props.data.einschulungsdatum))}</td>
                    </tr>) :("")}


                {props.data.zugangsdatum_zur_fsx ? (
                <tr>
                    <td><strong>Zugang zur FSX:</strong></td>
                    <td>{dateToDEFormat(new Date(props.data.zugangsdatum_zur_fsx))}</td>
                </tr>) :("")}
                
                {props.data.abgangsdatum_von_fsx? (
                    <tr>
                        <td><strong>Abgang von FSX:</strong></td>
                        <td>{dateToDEFormat(new Date(props.data.abgangsdatum_von_fsx))}</td>
                    </tr>) :("")}

                {props.data.abgangsgrund? (
                    <tr>
                        <td><strong>Abgangsgrund:</strong></td>
                        <td>{props.data.abgangsgrund}</td>
                    </tr>) :("")}

                {props.data.Jahrgangsstufe ? (
                    <tr>
                        <td><strong>aktuelle Klasse:</strong></td>
                        <td>{props.data.Jahrgangsstufe}</td>
                    </tr>) : ("") }

                {props.data.Lerngruppe ? (
                <tr>
                    <td><strong>aktuelle Lerngruppe:</strong></td>
                    <td>{props.data.Lerngruppe}</td>
                </tr>) : ("") }

                {props.data.mittag == 1 ? (
                <tr>
                    <td><strong>Mittag:</strong></td>
                    <td>JA</td>
                </tr>) : (<tr>
                            <td><strong>Mittag:</strong></td>
                            <td>Nein</td>
                    </tr>) }

                {props.data.betreuung_umfang ? (
                <tr>
                    <td><strong>Betreuungsumfang:</strong></td>
                    <td>{props.data.betreuung_umfang}</td>
                </tr>) : ("") }

                {props.data.betreuung_beginn ? (
                <tr>
                    <td><strong>Betreuungsbeginn:</strong></td>
                    <td>{dateToDEFormat(new Date(props.data.betreuung_beginn))}</td>
                </tr>) : ("") }

                {props.data.betreuung_ende ? (
                <tr>
                    <td><strong>Betreuungsende:</strong></td>
                    <td>{dateToDEFormat(new Date(props.data.betreuung_ende))}</td>
                </tr>) : ("") }

                {props.data.betreuung_ferien ? (
                <tr>
                    <td><strong>Betreuungbedarf w. Ferien?:</strong></td>
                    <td>Ja</td>
                </tr>) : (<tr>
                    <td><strong>Betreuungbedarf w. Ferien?:</strong></td>
                    <td>NEIN</td>
                </tr>) }

                {props.data.staatsangehoerigkeit ? (
                <tr>
                    <td><strong>Staatsangehörigkeit:</strong></td>
                    <td>{props.data.staatsangehoerigkeit}</td>
                </tr>) : (<tr>
                            <td><strong>Staatsangehörigkeit:</strong></td>
                            <td>--</td>
                        </tr>) }

                {props.data.geburtsort ? (
                <tr>
                    <td><strong>Geburtsort:</strong></td>
                    <td>{props.data.geburtsort}</td>
                </tr>) : (<tr>
                            <td><strong>Geburtsort:</strong></td>
                            <td>--</td>
                        </tr>) }

                {props.data.but_ende != 0 ? (
                <tr>
                    <td><strong>BuT:</strong></td>
                    <td>JA bis {dateToDEFormat(new Date(props.data.but_ende))}</td>
                </tr>) : (<tr>
                        <td><strong>aktl. BuT? :</strong></td>
                        <td>Nein</td>
                    </tr>) }

            </tbody>
        </table>) : ("") }
    </div>
        
    )
      
}



export default KindDaten;