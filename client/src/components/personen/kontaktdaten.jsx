import React from 'react';
import '../../stylesheets/globalstyles.css';


export function KontaktDaten(props) {
    
    //console.log(props.data[0].mobil_telefon_1)
    return (
    
    <div>
        {props.data.length == 0 ?  (
        <div>
        <table>
            <thead>
                <tr>
                    <th colSpan="2">Kontaktdaten</th>
                </tr>
            </thead>
            <tbody>
                <tr colSpan="5" style={({position:'absolute', width:'100%'})}>
                    <td><strong>Keine Kontaktdaten vorhanden!</strong></td>
                </tr>
            </tbody>
           
        </table>
        <br></br>
        </div>):(
        <table>
            <thead>
                <tr>
                    <th colSpan="2">Kontaktdaten</th>
                </tr>
            </thead>
            <tbody>
                

                {props.data[0].mobil_telefon_1 ? (
                    <tr>
                        <td style={{width:'31.5%'}}><strong>Mob. Tel. 1:</strong></td>
                        <td>{props.data[0].mobil_telefon_1}</td>
                    </tr>) : (<tr></tr>) }
                {props.data[0].mobil_telefon_2 ? (
                    <tr>
                        <td style={{width:'31.5%'}}><strong>Mob. Tel. 2:</strong></td>
                        <td>{props.data[0].mobil_telefon_2}</td>
                    </tr>) : (<tr></tr>) }
                {props.data[0].mobil_telefon_fsx ? (
                    <tr>
                        <td style={{width:'31.5%'}}><strong>Mob. Tel. FSX:</strong></td>
                        <td>{props.data[0].mobil_telefon_fsx}</td>
                    </tr>) : (<tr></tr>) }
                {props.data[0].telefon_1 ? (
                    <tr>
                        <td style={{width:'31.5%'}}><strong>Telefon 1:</strong></td>
                        <td>{props.data[0].telefon_1}</td>
                    </tr>) : (<tr></tr>) }
                {props.data[0].telefon_2 ? (
                    <tr>
                        <td style={{width:'31.5%'}}><strong>Telefon 2:</strong></td>
                        <td>{props.data[0].telefon_2}</td>
                    </tr>) : (<tr></tr>) }
                {props.data[0].telefon_fsx ? (
                    <tr>
                        <td style={{width:'31.5%'}}><strong>Telefon 2:</strong></td>
                        <td>{props.data[0].telefon_fsx}</td>
                    </tr>) : (<tr></tr>) }
                {props.data[0].email_1 ? (
                    <tr>
                        <td style={{width:'31.5%'}}><strong>Email 1:</strong></td>
                        <td>{props.data[0].email_1}</td>
                    </tr>) : (<tr></tr>) }
                {props.data[0].email_2 ? (
                    <tr>
                        <td style={{width:'31.5%'}}><strong>Email 2:</strong></td>
                        <td>{props.data[0].email_2}</td>
                    </tr>) : (<tr></tr>) }
                {props.data[0].email_fsx ? (
                    <tr>
                        <td style={{width:'31.5%'}}><strong>Email fsx:</strong></td>
                        <td>{props.data[0].email_fsx}</td>
                    </tr>) : (<tr></tr>) }
            </tbody>
        </table>)}
    </div>
        
    )
      
}



export default KontaktDaten;