import { SERVER_IP } from '../../globalFunctions';
import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import {EditAg} from './editAg'
import '../../stylesheets/globalstyles.css';
import { Mitglieder } from './mitglieder';
import {CSVLink} from "react-csv";
import {dateToDEFormat, Sleep} from '../../globalFunctions'
import { v4 as uuidv4 } from 'uuid';


/**
 * 'Ag' is a Class React component. It returns instances of the Arbeitsgruppen Entity.
 * 
 */


export class Ag extends React.Component{

    //Refs provide a way to access DOM nodes or React elements created in the render method.
    //Used in the ref propperty of CSVLink in the return.
    csvLink = React.createRef()
    
    constructor(props){
        super(props);
        this.today = new Date();
        this.defaultDateValue = this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+ this.today.getDate();
        this.target = document.getElementById('ag-data');

        //this binds
        this.fetchMitglieder = this.fetchMitglieder.bind(this);
        this.fetchContactData = this.fetchContactData.bind(this);
        this.fetchContactDataCompliment = this.fetchContactDataCompliment.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.customRender = this.customRender.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.generateCSV = this.generateCSV.bind(this);
        
        //State vars
        this.state = {
            editing: false,
            clicked: false,
            loading: false,
            core_data:{
                arbeitsgruppe_id: this.props.arbeitsgruppe_id,
                bezeichnung: this.props.bezeichnung,
                beschreibung: this.props.beschreibung,
                email: this.props.email,
            },
            mitglieder:[],
            csvFilename: '',
            csvData: []
        }
    }

    //fetches all AG members
    async fetchMitglieder(arbeitsgruppe_id){
        return (
        await axios.get(`http://${SERVER_IP}:3000/ag_mitglieder`, {
            params: {
                arbeitsgruppe_id: arbeitsgruppe_id,
            },
          }))
      }
    
    //fetches contact data of AG members
    async fetchContactData(person_id){
        return (
            await axios.get(`http://${SERVER_IP}:3000/contactData`, {
                params: {
                    person_id: person_id,
                },
                }))
    }

    //fetches contact data of non AG members
    async fetchContactDataCompliment(idsArr){
        return (
            await axios.get(`http://${SERVER_IP}:3000/contactDataCompliment`, {
                params: {
                    ids: idsArr,
                },
                }))
        }

    //sets editing state var to true or false causing the edit view to show or hide
    onEdit(){
        this.state.editing ? (this.setState({editing: false})):(this.setState({editing:true}))
    }

    //Either renders the data or edit view depending on the state var 'editing'
    customRender(loading){
        if(loading){
            //if loading of data takes time render a loading icon
            ReactDOM.render(<svg className="spinner" viewBox="0 0 50 50">
                                <circle className="path" 
                                        cx="25" cy="25" 
                                        r="20" fill="none" 
                                        strokeWidth="5">
                                </circle>
                            </svg>, document.getElementById('ag-data'))
            }else{//if editing is true render the edit view
                this.state.editing ? (
                    ReactDOM.render(
                        <div>
                            <button onClick={this.onEdit}>Switch to Data view</button>
                            <EditAg 
                                //Kerndaten to edit passed as props
                                arbeitsgruppe_id= {this.state.core_data.arbeitsgruppe_id ? (this.state.core_data.arbeitsgruppe_id):('')}
                                bezeichnung={this.state.core_data.bezeichnung ? (this.state.core_data.bezeichnung):('')}
                                beschreibung={this.state.core_data.beschreibung ? (this.state.core_data.beschreibung):('')}
                                email={this.state.core_data.email ? (this.state.core_data.email):('')}

                            />
                        </div>
                    , document.getElementById('ag-data')))
                    :(//else render the normal data view
                    ReactDOM.render(
                        <div>
                            <button onClick={this.onEdit}>Switch to Edit View</button>

                            <button onClick={this.generateCSV}>Mailing Liste</button>

                            <CSVLink 
                                data={this.state.csvData} 
                                filename= {this.state.csvFilename}
                                className="hidden"
                                ref={this.csvLink}
                                target="_blank"
                                hidden
                                >
                                Download me
                            </CSVLink>

                            <div className='entity-data-left'>
                                <table>
                                    <thead>
                                        <tr>
                                            <th colSpan="2">AG's Kerndaten</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td style={{width:'30%'}}><strong>Id:</strong></td>
                                            <td>{this.state.core_data.arbeitsgruppe_id}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Bezeichnung:</strong></td>
                                            <td >{this.state.core_data.bezeichnung}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Beschreibung:</strong></td>
                                            <td >{this.state.core_data.beschreibung}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>E-Mail:</strong></td>
                                            <td>{this.state.core_data.email}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                                
                            <div className='entity-data-right'>
                                <Mitglieder
                                    mietglieder= {this.state.mitglieder}
                                    navi={this.props.navi}/>
                            </div>

                        </div>
                        , document.getElementById('ag-data')))}
    }
    

    componentDidUpdate() {
        if(this.state.clicked){
            this.customRender();
        }
    }
    
    //handles clicking of the AG instances on the left side
    handleClick = async() => {
        this.customRender();
        this.setState({loading: true}, () => {
            this.fetchMitglieder(this.state.core_data.arbeitsgruppe_id)
            .then(result => {
                this.setState({
                    mitglieder: result.data,
                    })})
        },
        this.setState({loading:false}),
        this.setState({clicked: true}),
        )
    }

    //generates a CSV file containing all relevant email addresses to be added or removed from the AG mailling list
    async generateCSV() {
        
        let data =[
                    ["aktuelle Mitglieder in:", this.state.core_data.bezeichnung]
        ]
        
        this.state.mitglieder.forEach(mitglied =>{

            let lineArray = [];
            var resultObject = {};
            
            //einzutragende Mitglieder
            this.setState({loading: true}, () => {
                this.fetchContactData(mitglied.person_id)
                .then(result => {
                    
                    Object.assign(resultObject, result.data[0])

                    let email = '';

                    if (resultObject.email_fsx) email = resultObject.email_fsx;
                    else if (resultObject.email_1) email = resultObject.email_1;
                    else if (resultObject.email_2) email = resultObject.email_2;
                    else email = '';

                    lineArray.push(mitglied.rufname + " " + "<" + email + ">")
                })
                },
                this.setState({loading:false}),
                )
                data.push(lineArray)
        })

        //auszutragende Mitglieder
        data.push([" ", " "])
        data.push(["auszutragende Mitglieder in:", this.state.core_data.bezeichnung])

        let mitgliederIdArr = [];
        
        this.state.mitglieder.forEach(mitglied =>{
            mitgliederIdArr.push(mitglied.person_id)
        })
        
        this.setState({loading: true}, () => {
            this.fetchContactDataCompliment(mitgliederIdArr)
            .then(result => {

                for (let i = 0; i < result.data.length; i++) 
                {   
                    let lineArray = [];

                    if (result.data[i].email_fsx) lineArray.push(result.data[i].email_fsx)
                    else if (result.data[i].email_1) lineArray.push(result.data[i].email_1)
                    else if (result.data[i].email_2) lineArray.push(result.data[i].email_2)
                    else lineArray.push("")

                    data.push(lineArray)
                }
            })
            },
            this.setState({loading:false}),
        )
        
        await Sleep(1000);// wait a second
        this.setState({csvData: data, csvFilename: 
            `maillingList_${this.state.core_data.bezeichnung}_${dateToDEFormat(new Date(this.defaultDateValue))}` + ".csv"})
        
        //click on the hidden link to download the file automatically
        this.csvLink.current.link.click()   
    }


    render() {
      return (
        <li id={this.state.core_data.arbeitsgruppe_id+this.state.core_data.bezeichnung} 
            key={uuidv4()} 
            onClick={this.handleClick} 
        > 
            {this.state.core_data.bezeichnung}
        </li>
      )
    }
  }

  