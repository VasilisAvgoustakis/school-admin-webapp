import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom'
import '../stylesheets/globalstyles.css';
import { Schuller } from './schuller';
import { EditLg } from './editLg';
import {dateToDEFormat, Sleep} from '../../globalFunctions'
import { v4 as uuidv4 } from 'uuid';
import {CSVLink, CSVDownload} from "react-csv";



export class Lg extends React.Component{
    csvLink = React.createRef()
    constructor(props){
        super(props);
        this.today = new Date();
        this.defaultDateValue = this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+ this.today.getDate();
        this.target = document.getElementById('lg-data');
        this.fetchMitglieder = this.fetchMitglieder.bind(this);
        this.fetchElternContact = this.fetchElternContact.bind(this);
        this.fetchElternContactCompliment = this.fetchElternContactCompliment.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.customRender = this.customRender.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.generateCSV = this.generateCSV.bind(this);
        this.state = {
            editing: false,
            clicked: false,
            loading: false,
            core_data:{
                lerngruppe_id: this.props.lerngruppe_id,
                bezeichnung: this.props.bezeichnung,
                email_eltern_eltern: this.props.email_eltern_eltern,
                email_eltern_team: this.props.email_eltern_team,
                telefon_team: this.props.telefon_team
            },
            schuller:[],
            csvFilename: '',
            csvData: [],
        }
    }

    async fetchMitglieder(lerngruppe_id){
        return (
        await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/lerngruppe_mitglieder`, {
            params: {
                lerngruppe_id: lerngruppe_id,
            },
          }))
      }

    async fetchElternContact(kind_id){
    return (
    await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/bezugsperson_kontakt`, {
        params: {
            kind_id: kind_id,
        },
        }))
    }

    async fetchElternContactCompliment(idsArr){
        return (
        await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/bezugsperson_contact_compliment`, {
            params: {
                ids: idsArr,
            },
            }))
        }


    


    onEdit(){
        //this.props.updateStateAfterEdit();
        this.state.editing ? (this.setState({editing: false})):(this.setState({editing:true}))
    }


    customRender(loading){
        if(loading){
            ReactDOM.render(<svg className="spinner" viewBox="0 0 50 50">
                                <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                            </svg>, document.getElementById('lg-data'))
            }else{

                this.state.editing ? (ReactDOM.render(
                    <div>
                        <button onClick={this.onEdit}>Switch to Data view</button>
                        <EditLg 

                            //Kerndaten to edit passed as props
                            lerngruppe_id= {this.state.core_data.lerngruppe_id ? (this.state.core_data.lerngruppe_id):('')}
                            email_eltern={this.state.core_data.email_eltern ? (this.state.core_data.email_eltern):('')}
                            email_team={this.state.core_data.email_team ? (this.state.core_data.email_team):('')}
                            telefon_team={this.props.telefon_team ? (this.props.telefon_team):('')}
                            bezeichnung={this.state.core_data.bezeichnung ? (this.state.core_data.bezeichnung):('')}

                        />
                    </div>
                    , document.getElementById('lg-data'))):(
    
            ReactDOM.render(
    
                <div>
                    <button onClick={this.onEdit}>Switch to Edit View</button>
                    <button onClick={this.generateCSV}>Mailling Liste</button>

                    <CSVLink 
                        data={this.state.csvData} 
                        filename= {this.state.csvFilename}
                        className="hidden"
                        ref={this.csvLink}
                        target="_blank"
                        hidden
                        >Download me</CSVLink>

                    <div className='entity-data-left'>
                        <table>
                            <thead>
                                <tr>
                                    <th colSpan="2">Lg's Kerndaten</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{width:'30%'}}><strong>Id:</strong></td>
                                    <td>{this.state.core_data.lerngruppe_id}</td>
                                </tr>
                                <tr>
                                    <td><strong>Bezeichnung:</strong></td>
                                    <td >{this.state.core_data.bezeichnung}</td>
                                </tr>
                                <tr>
                                    <td><strong>E-Mail Eltern:</strong></td>
                                    <td >{this.state.core_data.email_eltern_eltern}</td>
                                </tr>
                                <tr>
                                    <td><strong>E-Mail Team:</strong></td>
                                    <td>{this.state.core_data.email_eltern_team}</td>
                                </tr>
                                <tr>
                                    <td><strong>Telefon Team:</strong></td>
                                    <td>{this.state.core_data.telefon_team}</td>
                                </tr>
                            </tbody>
                        </table>
                     </div>
                        
                    <div className='entity-data-right'>
                        <Schuller
                            schuller= {this.state.schuller}
                            navi={this.props.navi}/>
                    </div>
                </div>
                , document.getElementById('lg-data')))}
    }
    

    componentDidUpdate() {
        if(this.state.clicked){
            this.customRender();
        }
    }
    
    handleClick = async() => {
        this.customRender();
        this.setState({loading: true}, () => {
        //console.log(this.state.core_data.lerngruppe_id)
        this.fetchMitglieder(this.state.core_data.lerngruppe_id)
        .then(result => {
            //console.log(result.data)
             this.setState({
                schuller: result.data,
                 })})
        },
        this.setState({loading:false}),
        this.setState({clicked: true}),
        //console.log(this.state.schuller)
        )
    }

    async generateCSV() {
        
        let data =[
                    ["aktuelle Kontakte für:", this.state.core_data.bezeichnung]
                ]
        
        this.state.schuller.forEach(kind =>{

            //einzutragende Mitglieder
            this.setState({loading: true}, () => {
                this.fetchElternContact(kind.person_id)
                .then(result => {
                    //console.log(result.data)
                    result.data.forEach(bezugsperson => {
                    let lineArray = [];
                    let email = '';

                    if (bezugsperson.email_fsx) email = bezugsperson.email_fsx;
                    else if (bezugsperson.email_1) email = bezugsperson.email_1;
                    else if (bezugsperson.email_2) email = bezugsperson.email_2;
                    else email = '';
                    
                    
                    if (email && email != " "){
                        let bezugspersonContactData = {contactMail: bezugsperson.rufname + " " 
                        + "<" + email + ">"}
                        //console.log(bezugspersonContactData)
                        lineArray.push(bezugspersonContactData.contactMail)
                        data.push(lineArray)
                    }
                    
                    })
                })
                },
                this.setState({loading:false}),
                )
        })
        //console.log(data)
        await Sleep(200)

        //auszutragende Mitglieder
        data.push([" ", " "])
        data.push(["auszutragende Mitglieder in:", this.state.core_data.bezeichnung])

        let kinderIdArr = [];
        
        this.state.schuller.forEach(kind =>{
            kinderIdArr.push(kind.person_id)
        })
        
        
        this.setState({loading: true}, () => {
            this.fetchElternContactCompliment(kinderIdArr)
            .then(result => {
                
                for (let i = 0; i < result.data.length; i++) 
                {   
                    let lineArray = [];
                    let email = '';

                    if (result.data[i].email_fsx) email = result.data[i].email_fsx;
                    else if (result.data[i].email_1) email = result.data[i].email_1
                    else if (result.data[i].email_2) email = result.data[i].email_2
                    else email = '';

                    if(email != '' && email != " "){
                        let bezugspersonContactData = {contactMail: email}
                        //console.log(bezugspersonContactData)
                        lineArray.push(bezugspersonContactData.contactMail)
                        data.push(lineArray)
                    }  
                }
            })
    
            
            },
            this.setState({loading:false}),
        )
        

        await Sleep(1000);
        this.setState({csvData: data, csvFilename: `maillingList_${this.state.core_data.bezeichnung}_${dateToDEFormat(new Date(this.defaultDateValue))}` + ".csv"})

        this.csvLink.current.link.click()   
    }



    render() {
        //console.log(this.state.schuller)
      return (

        <li id={this.state.core_data.lerngruppe_id+this.state.core_data.bezeichnung} key={uuidv4()} onClick={this.handleClick} >
              
            {this.state.core_data.bezeichnung}
        </li>
        
      )
    }
  }

  