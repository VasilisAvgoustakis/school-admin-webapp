import React, {useState, useEffect, setRole} from 'react';
import { PersonSelectList } from '..';
import axios from 'axios';
import '../stylesheets/globalstyles.css';
import dateToDEFormat from '../../globalFunctions';
import { v4 as uuidv4 } from 'uuid';


class ListRow extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:[this.props.data]
        }
    }

    render(){
        //console.log(this.state.data)
        return(
            
            this.state.data.map(bezugspersonenRow => (
                <tr key={uuidv4()}>
                    {bezugspersonenRow.rufname ? (<td>{bezugspersonenRow.rufname}</td>):(<td> -- </td>)}
                    {bezugspersonenRow.nachname ? (<td>{bezugspersonenRow.nachname}</td>):(<td> -- </td>)}
                </tr>
                
            )) 
        )
    }
}



export function Bezugspersonen(props){
    
    
    return(
        
        <div>
        {/* {console.log(props.addresses)} */}
        {props.data.length == 0 ? (<table>
            <thead>
                <tr>
                    <th colSpan="2">Bezugspersonen</th>
                </tr>
            </thead>
            <tbody>
                <tr colSpan="2" style={{position:'absolute'}, {width:'100%'}}>
                    <td><strong>Keine Bezugspersonen gefunden!</strong></td>
                </tr>
            </tbody>
        </table>):(
        <table>
            <thead>
                <tr>
                    <th colSpan="2">Bezugspersonen</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Rufname</strong></td>
                    <td><strong>Nachname</strong></td>
                </tr>
                {/* Hier comes the address row element */}
                
                    {props.data.map(bezugspersonen => (
                        
                        <ListRow key={uuidv4()}
                        data={bezugspersonen}
                        />
                       
                    ))}
                
                

            </tbody>
        </table>)}
    </div>
    )
    
                    
}



