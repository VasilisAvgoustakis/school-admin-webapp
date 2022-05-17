import React from 'react';
import '../stylesheets/globalstyles.css';
import {dateToDEFormat} from '../../globalFunctions';
import { v4 as uuidv4 } from 'uuid';


class EmployeeRow extends React.Component{
    constructor(props){
        super(props);
        this.replaceAllChars=this.replaceAllChars.bind(this);
        this.clickPerson = this.clickPerson.bind(this);
        this.state = {
            data:[this.props.data]
        }
    }

    replaceAllChars(str, find, replace) {
        var escapedFind=find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
        return str.replace(new RegExp(escapedFind, 'g'), replace);
    }

    clickPerson({ navigation }){
       this.props.navi('Personen')
        //console.log(this.state.data[0].person_id.toString())
        document.getElementById(this.state.data[0].person_id.toString()).click();
    }

    render(){
        //console.log(this.state.data)
        return(
            
            this.state.data.map(employeeRow => (
                <tr key={uuidv4()} onClick={this.clickPerson} className="clickable-list-item">
                    {employeeRow.person_id ? (<td>{employeeRow.person_id}</td>):(<td> -- </td>)}
                    {employeeRow.rufname ? (<td>{employeeRow.rufname}</td>):(<td> -- </td>)}
                    {employeeRow.nachname ? (<td>{employeeRow.nachname}</td>):(<td> -- </td>)}
                    {employeeRow.taetigkeit_beginn ? (<td>{dateToDEFormat(new Date(employeeRow.taetigkeit_beginn))}</td>):(<td> -- </td>)}
                    {employeeRow.taetigkeit_ende ? (<td>{dateToDEFormat(new Date(employeeRow.taetigkeit_ende))}</td>):(<td> -- </td>)}
                    {employeeRow.taetigkeit ? (<td>{this.replaceAllChars(this.replaceAllChars(employeeRow.taetigkeit,'ae', 'ä'),'ue', 'ü')}</td>):(<td> -- </td>)}
                    {employeeRow.typ ? (<td>{employeeRow.typ}</td>):(<td> -- </td>)}
                </tr>
                
            )) 
        )
    }
}



export function Employee(props){
    
    
    return(
        
        <div>
        {/* {console.log(props.addresses)} */}
        {props.employees.length == 0 ? (<table>
            <thead>
                <tr>
                    <th colSpan="3">Mitarbeiter nach </th>
                </tr>
            </thead>
            <tbody>
                <tr colSpan="3" style={({position:'absolute', width:'80%'})}>
                    <td><strong>Keine Mitarbeiter gefunden!</strong></td>
                </tr>
            </tbody>
        </table>):(
        <table>
            <thead>
                <tr>
                    <th colSpan="7">Mitarbeiter nach {props.taetigkeit ? ("Tätigkeit"):("Typ")} </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Id</strong></td>
                    <td><strong>Rufname</strong></td>
                    <td><strong>Nachname</strong></td>
                    <td><strong>Beginn</strong></td>
                    <td><strong>Ende</strong></td>
                    <td><strong>Tätigkeit</strong></td>
                    <td><strong>Typ</strong></td>
                </tr>
                {/* Hier comes the address row element */}
                
                    {props.employees.map(employee => (
                        
                        <EmployeeRow key={uuidv4()}
                        data={employee}
                        navi={props.navi}
                        />
                       
                    ))}
            </tbody>
        </table>)}
    </div>
    )
    
                    
}



