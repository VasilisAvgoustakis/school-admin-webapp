import React from 'react';
import '../stylesheets/globalstyles.css';
import dateToDEFormat from '../../globalFunctions';
import { v4 as uuidv4 } from 'uuid';


class MitgliederRow extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:[this.props.data]
        }
    }

    render(){
        //console.log(this.state.data)
        return(
            
            this.state.data.map(mitgliederRow => (
                <tr key={uuidv4()}>
                    {mitgliederRow.person_id ? (<td>{mitgliederRow.person_id}</td>):(<td> -- </td>)}
                    {mitgliederRow.rufname ? (<td>{mitgliederRow.rufname}</td>):(<td> -- </td>)}
                    {mitgliederRow.nachname ? (<td>{mitgliederRow.nachname}</td>):(<td> -- </td>)}
                </tr>
                
            )) 
        )
    }
}



export function Mitglieder(props){
    
    
    return(
        
        <div>
        {/* {console.log(props.addresses)} */}
        {props.mietglieder.length == 0 ? (<table>
            <thead>
                <tr>
                    <th colSpan="3">Mietglieder</th>
                </tr>
            </thead>
            <tbody>
                <tr colSpan="2" style={{position:'absolute'}, {width:'80%'}}>
                    <td><strong>Keine Mietglieder gefunden!</strong></td>
                </tr>
            </tbody>
        </table>):(
        <table>
            <thead>
                <tr>
                    <th colSpan="3">Mietglieder</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Id</strong></td>
                    <td><strong>Rufname</strong></td>
                    <td><strong>Nachname</strong></td>
                </tr>
                {/* Hier comes the address row element */}
                
                    {props.mietglieder.map(mietglieder => (
                        
                        <MitgliederRow key={uuidv4()}
                        data={mietglieder}
                        />
                       
                    ))}
            </tbody>
        </table>)}
    </div>
    )
    
                    
}



