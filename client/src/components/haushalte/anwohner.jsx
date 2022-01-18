import React from 'react';
import '../stylesheets/globalstyles.css';
import dateToDEFormat from '../../globalFunctions';
import { v4 as uuidv4 } from 'uuid';


class AnwohnerRow extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:[this.props.data]
        }
    }

    render(){
        //console.log(this.state.data)
        return(
            
            this.state.data.map(anwohnerRow => (
                <tr key={uuidv4()}>
                    {anwohnerRow.person_id ? (<td>{anwohnerRow.person_id}</td>):(<td> -- </td>)}
                    {anwohnerRow.rufname ? (<td>{anwohnerRow.rufname}</td>):(<td> -- </td>)}
                    {anwohnerRow.nachname ? (<td>{anwohnerRow.nachname}</td>):(<td> -- </td>)}
                </tr>
                
            )) 
        )
    }
}



export function Anwohner(props){
    
    
    return(
        
        <div>
        {/* {console.log(props.addresses)} */}
        {props.anwohner.length == 0 ? (<table>
            <thead>
                <tr>
                    <th colSpan="3">Anwohner</th>
                </tr>
            </thead>
            <tbody>
                <tr colSpan="3" style={{position:'absolute'}, {width:'100%'}}>
                    <td><strong>Keine Anwohner gefunden!</strong></td>
                </tr>
            </tbody>
        </table>):(
        <table>
            <thead>
                <tr>
                    <th colSpan="3">Anwohner</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Id</strong></td>
                    <td><strong>Rufname</strong></td>
                    <td><strong>Nachname</strong></td>
                </tr>
                {/* Hier comes the address row element */}
                
                    {props.anwohner.map(anwohner => (
                        
                        <AnwohnerRow key={uuidv4()}
                        data={anwohner}
                        />
                       
                    ))}
                
                

            </tbody>
        </table>)}
    </div>
    )
    
                    
}



