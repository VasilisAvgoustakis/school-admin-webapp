import React from 'react';
import '../stylesheets/globalstyles.css';
import {dateToDEFormat} from '../../globalFunctions';
import { v4 as uuidv4 } from 'uuid';


class SchullerRow extends React.Component{
    constructor(props){
        super(props);
        this.clickPerson = this.clickPerson.bind(this);
        this.state = {
            data:[this.props.data]
        }
    }

    clickPerson({ navigation }){
        this.props.navi('Personen')
        document.getElementById(this.state.data[0].person_id.toString()).click();
    }

    render(){
        //console.log(this.state.data)
        return(
            
            this.state.data.map(schullerRow => (
                <tr key={uuidv4()} onClick={this.clickPerson} className="clickable-list-item">
                    {schullerRow.person_id ? (<td>{schullerRow.person_id}</td>):(<td> -- </td>)}
                    {schullerRow.rufname ? (<td>{schullerRow.rufname}</td>):(<td> -- </td>)}
                    {schullerRow.nachname ? (<td>{schullerRow.nachname}</td>):(<td> -- </td>)}
                    {schullerRow.eintrittsdatum ? (<td>{dateToDEFormat(new Date(schullerRow.eintrittsdatum))}</td>):(<td> -- </td>)}
                </tr>
                
            )) 
        )
    }
}



export function Schuller(props){
    
    
    return(
        
        <div>
        {/* {console.log(props.addresses)} */}
        {props.schuller.length == 0 ? (<table>
            <thead>
                <tr>
                    <th colSpan="3">Mietglieder</th>
                </tr>
            </thead>
            <tbody>
                <tr colSpan="2" style={({position:'absolute', width:'80%'})}>
                    <td><strong>Keine Mietglieder gefunden!</strong></td>
                </tr>
            </tbody>
        </table>):(
        <table>
            <thead>
                <tr>
                    <th colSpan="4">Mietglieder</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Id</strong></td>
                    <td><strong>Rufname</strong></td>
                    <td><strong>Nachname</strong></td>
                    <td><strong>Eintrittsdatum</strong></td>
                </tr>
                {/* Hier comes the address row element */}
                
                    {props.schuller.map(schull_kind => (
                        
                        <SchullerRow key={uuidv4()}
                        data={schull_kind}
                        navi={props.navi}
                        />
                       
                    ))}
            </tbody>
        </table>)}
    </div>
    )
    
                    
}



