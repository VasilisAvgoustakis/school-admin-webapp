import React, {useState, useEffect, setRole} from 'react';
import { PersonSelectList } from '..';
import axios from 'axios';
import '../stylesheets/globalstyles.css';
import dateToDEFormat from '../../globalFunctions'


class Address extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:[this.props.data]
        }
    }

    render(){
        //console.log(this.state.data)
        return(
            
            this.state.data.map(addrRow => (
                <tr>
                    {addrRow.meldeanschrift == 1 ? (<td>JA</td>):(<td>NEIN</td>)}
                    {addrRow.strasse ? (<td>{addrRow.strasse}</td>):(<td> -- </td>)}
                    {addrRow.aderss_zusatz ? (<td>{addrRow.adress_zusatz}</td>):(<td> -- </td>)}
                    {addrRow.postleitzahl ? (<td>{addrRow.postleitzahl}</td>):(<td> -- </td>)}
                    {addrRow.ortsteil_berlin ? (<td>{addrRow.ortsteil_berlin}</td>):(<td> -- </td>)}
                    {addrRow.ort ? (<td>{addrRow.ort}</td>):(<td> -- </td>)}
                    {addrRow.region ? (<td>{addrRow.region}</td>):(<td> -- </td>)}
                    {addrRow.land ? (<td>{addrRow.land}</td>):(<td> -- </td>)}
                    {addrRow.telefon ? (<td>{addrRow.telefon}</td>):(<td> -- </td>)}
                    {addrRow.datum_einzug ? (<td>{dateToDEFormat(new Date(addrRow.datum_einzug))}</td>)
                    :(<td> -- </td>)}
                    {addrRow.quartiersmanagement_gebiet == 1 ? (<td>JA</td>):(<td>NEIN</td>)}
                </tr>
                
            )) 
        )
    }
}



export function AddressData(props){
    
    

    return(
        
        <div>
        {/* {console.log(props.addresses)} */}
        <table>
            <thead>
                <tr>
                    <th colSpan="11">Wohnsituation</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Meldeanschrift</strong></td>
                    <td><strong>Strasse</strong></td>
                    <td><strong>Addresszusatz</strong></td>
                    <td><strong>PLZ</strong></td>
                    <td><strong>Ortsteil in Berlin</strong></td>
                    <td><strong>Ort</strong></td>
                    <td><strong>Region</strong></td>
                    <td><strong>Land</strong></td>
                    <td><strong>Festnetz</strong></td>
                    <td><strong>Einzug</strong></td>
                    <td><strong>QM Gebiet</strong></td>

                </tr>
                {/* Hier comes the address row element */}
                
                    {props.addresses.map(address => (
                        
                        <Address key={address.person_id+address.strasse}
                        data={address}
                        />
                       
                    ))}
                
                

            </tbody>
        </table>
    </div>
    )
    
                    
}



