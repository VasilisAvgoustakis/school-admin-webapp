import React from 'react';
import '../../stylesheets/globalstyles.css';
import { v4 as uuidv4 } from 'uuid';

/**
 * Instances of this component hold the data of individual members of Work groups (Arbeitsgroupen)
 */

class MitgliederRow extends React.Component{
    constructor(props){
        super(props);
        this.clickPerson = this.clickPerson.bind(this);
        this.state = {
            data:[this.props.data]
        }
    }


    // redirect to the clicked person's data view under Persons Tab
    clickPerson({ navigation }){
        this.props.navi('Personen')
        document.getElementById(this.state.data[0].person_id.toString()).click();
    }


    render(){
        return(
            this.state.data.map(mitgliederRow => (
                <tr key={uuidv4()} onClick={this.clickPerson} className="clickable-list-item">
                    {mitgliederRow.rufname ? 
                        (<td>
                            {mitgliederRow.rufname + " "}
                            {mitgliederRow.nachname ? (mitgliederRow.nachname + " "):(" ")}
                            {mitgliederRow.koordination_der_ag ? ("(Koordination)"): ("")}
                        </td>)
                        :
                        (<td> -- </td>)}
                    
                </tr>
                
            )) 
        )
    }
}



/**
 * Functional component holds the table containg the members of a Work group
 * @param {} props Data passed from parent element 
 * @returns Table containing the members
 */
export function Mitglieder(props){
       
    return(
        
        <div>
            {props.mietglieder.length == 0 ? (
                <table>
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
                </table>
        ):(
                <table>
                    <thead>
                        <tr>
                            <th colSpan="3">Mietglieder</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.mietglieder.map(mietglied => ( 
                            <MitgliederRow key={uuidv4()}
                            data={mietglied}
                            navi={props.navi}
                            />
                        ))}
                    </tbody>
                </table>
        )}
    </div>
    )
    
                    
}



