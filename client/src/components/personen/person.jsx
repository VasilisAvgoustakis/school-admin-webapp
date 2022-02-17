import React from 'react';
import axios,{setPost} from 'axios';
import ReactDOM from 'react-dom'
import KontaktDaten from './kontaktdaten';
import '../stylesheets/personen.css'
import '../stylesheets/globalstyles.css';
import { KindDaten } from './kindDaten';
import { AddressData } from './adressData';
import {AGData} from './arbeitsgruppen_data';
import { Bezugspersonen } from './bezugsperson_liste';
import { EditPerson } from './editPerson';
import {dateToDEFormat, dateToENFormat} from '../../globalFunctions'
import { v4 as uuidv4 } from 'uuid';



export class Person extends React.Component{
    constructor(props){
        super(props);
        this.target = document.getElementById('person-data');
        this.fetchData = this.fetchData.bind(this);
        this.fetchContactData = this.fetchContactData.bind(this);
        this.fetchAddresses = this.fetchAddresses.bind(this);
        this.fetchAGs = this.fetchAGs.bind(this);
        this.fetchBezugspersonen = this.fetchBezugspersonen.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.customRender = this.customRender.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.onEdit = this.onEdit.bind(this);
        
        this.state = {
            forceRemount:'',
            editing: false,
            clicked: false,
            loading: false,
            core_data:{
                personId: this.props.person_id,
                rufname: this.props.rufname,
                amtlicher_vorname: this.props.amtlicher_vorname,
                nachname: this.props.nachname,
                geburtsdatum: this.props.geburtsdatum,
                einschulungsdatum: this.props.einschulungsdatum,
                nicht_auf_listen: this.props.nicht_auf_listen
            },
            data:[],
            contactData: [],
            addresses: [],
            arbeitsgruppen: [],
            bezugspersonen: []
        }
    }


    async fetchData(person_id){
        return (
        await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/personsData`, {
            params: {
                person_id: person_id,
            },
          }))
      }

    async fetchContactData(person_id){
    return (
    await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/contactData`, {
        params: {
            person_id: person_id,
        },
        }))
    }
    


    async fetchAddresses(person_id){
        return (
        await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/addresses`, {
            params: {
                person_id: person_id,
            },
            }))
        }
    async fetchAGs(person_id){
        return (
        await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/arb_grp`, {
            params: {
                person_id: person_id,
            },
            }))
        }

    async fetchBezugspersonen(person_id){
        return (
        await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/bezugspersonen`, {
            params: {
                person_id: person_id,
            },
            }))
        }

    handleEdit(e){
        this.state.core_data.rufname = ''
        this.state.core_data.rufname += e.target.value
        
    }
    

    onEdit(){
        //this.props.updateStateAfterEdit();
        this.state.editing ? (this.setState({editing: false})):(this.setState({editing:true}))
    }

    

    

    customRender(loading){
        if(loading){
            ReactDOM.render(<svg className="spinner" viewBox="0 0 50 50">
                                <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                            </svg>, document.getElementById('person-data'))
            }else{
            this.state.editing ? (ReactDOM.render(
                    <div>
                        <button onClick={this.onEdit}>Switch to Data view</button>
                        <EditPerson 
                            //Kerndaten to edit passed as props
                            person_id={this.state.core_data.personId} 
                            rufname={this.state.core_data.rufname}
                            amtlicher_vorname={this.state.core_data.amtlicher_vorname}
                            nachname={this.state.core_data.nachname}
                            geburtsdatum={
                                this.state.core_data.geburtsdatum ?
                                (dateToENFormat(new Date(this.state.core_data.geburtsdatum)))
                                :
                                ('')}
                            einschulungsdatum={
                                this.state.core_data.einschulungsdatum ?
                                (dateToENFormat(new Date(this.state.core_data.einschulungsdatum)))
                                    :
                                ('')}
                            nicht_auf_listen={this.state.core_data.nicht_auf_listen}

                            //KontaktDaten to edit passed as props
                            email_1={this.state.contactData[0].email_1}
                            email_2={this.state.contactData[0].email_2}
                            email_fsx={this.state.contactData[0].email_fsx}
                            mobil_telefon_1={this.state.contactData[0].mobil_telefon_1}
                            mobil_telefon_2={this.state.contactData[0].mobil_telefon_2}
                            mobil_telefon_fsx={this.state.contactData[0].mobil_telefon_fsx}
                            telefon_1={this.state.contactData[0].telefon_1}
                            telefon_2={this.state.contactData[0].telefon_2}
                            telefon_fsx={this.state.contactData[0].telefon_fsx}



                                    />
                    </div>
                , document.getElementById('person-data'))):(
            ReactDOM.render(
    
                <div>
                    <button onClick={this.onEdit}>Switch to Edit View</button>
                    <div className='entity-data-left'>
                        <table>
                            <thead>
                                <tr>
                                    <th colSpan="2">Kerndaten</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{width:'10%'}}><strong>Id:</strong></td>
                                    <td>{this.state.core_data.personId}</td>
                                </tr>
                                <tr>
                                    <td style={{width:'10%'}}><strong>Rufname:</strong></td>
                                    <td>{this.state.core_data.rufname}</td>
                                </tr>
                                <tr>
                                    <td style={{width:'10%'}}><strong>Amt.Vorname:</strong></td>
                                    <td>{this.state.core_data.amtlicher_vorname}</td>
                                </tr>
                                <tr>
                                    <td style={{width:'10%'}}><strong>Nachname:</strong></td>
                                    <td>{this.state.core_data.nachname}</td>
                                </tr>
                                <tr>
                                    <td style={{width:'10%'}}><strong>Geburtsdatum:</strong></td>
                                    <td>{dateToDEFormat(new Date(this.state.core_data.geburtsdatum))}</td>
                                </tr>
                                {this.state.core_data.einschulungsdatum ? (<tr>
                                    <td style={{width:'10%'}}><strong>Einschulungsdatum:</strong></td>
                                    <td>{dateToDEFormat(new Date(this.state.core_data.einschulungsdatum))}</td>
                                </tr>) : (<tr></tr>) }
                                {this.state.data.taetigkeit ?(<tr>
                                    <td style={{width:'10%'}}><strong>Tätigkeit:</strong></td>
                                    <td>{this.state.data.taetigkeit}</td>
                                </tr>):(<tr></tr>)}
                            </tbody>
                        </table>
    
                        <KontaktDaten 
                            data= {this.state.contactData}/>
                        
                        <KindDaten 
                            data= {this.state.data}/>
                     </div>
                        
                    <div className='entity-data-right'>
                        <AddressData
                            addresses= {this.state.addresses}/>
                        
                        {(!this.state.core_data.einschulungsdatum 
                            || 
                          this.state.data.abgangsdatum_von_fsx) ? 
                            (<AGData
                                ags={this.state.arbeitsgruppen} />)
                                :
                                (<p></p>)}
                        
                        {this.state.core_data.einschulungsdatum ?
                            (<Bezugspersonen 
                                data= {this.state.bezugspersonen}/>)
                                :(<p></p>)}
                        
                        
                    </div>
                </div>
                , document.getElementById('person-data')))}
    }
    
    
    componentDidUpdate() {
        if(this.state.clicked){
            this.customRender();
        }
        
    }
    
    handleClick = async() => {
        
        this.setState({loading: true}, () => {
        this.fetchData(this.state.core_data.personId)
        .then(result => {
            this.setState({
                data: result.data,
                })}).then(

        this.fetchContactData(this.state.core_data.personId)
        .then(result => {
        this.setState({
            contactData: result.data,
            })})).then(

        this.fetchAddresses(this.state.core_data.personId).then(result => {
            this.setState({
                
                addresses: result.data,
                })})).then(
            
        this.fetchAGs(this.state.core_data.personId).then(result => {
            this.setState({
                
                arbeitsgruppen: result.data,
                })})).then(

        this.fetchBezugspersonen(this.state.core_data.personId).then(result => {
            this.setState({
                bezugspersonen: result.data,
                
                })}))},
        this.setState({loading:false}),
        this.setState({clicked: true}),
        ////console.log(this.state.bezugspersonen)
        
        
        // //console.log(this.state.loading + ' :after fetching')
        );

        
    }



    render() {
        
      return (

        <li key={uuidv4()} onClick={this.handleClick} >
              
            {this.state.core_data.rufname +' ' + this.state.core_data.nachname}
        </li>
        
      )
    }
  }

  