import React from 'react';
import '../../stylesheets/globalstyles.css';
import {dateToDEFormat} from '../../globalFunctions'
import { v4 as uuidv4 } from 'uuid';


class Address extends React.Component{
    constructor(props){
        super(props);
        this.clickHaus = this.clickHaus.bind(this);
        this.state = {
            data:[this.props.data]
        }
    }

    clickHaus({ navigation }){
        this.props.navi('Haushalte')
        document.getElementById(this.state.data[0].haushalt_id.toString()+
        this.state.data[0].postleitzahl).click();
    }

    render(){
        //console.log(this.state.data)
        return(
            
            this.state.data.map(addrRow => (
                <tr key={uuidv4()} onClick={this.clickHaus} className="clickable-list-item">
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
                    <th colSpan="11">Haushalte</th>
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
                        
                        <Address key={uuidv4()}
                        data={address}
                        navi={props.navi}
                        />
                       
                    ))}
                
                

            </tbody>
        </table>
    </div>
    )
    
                    
}



