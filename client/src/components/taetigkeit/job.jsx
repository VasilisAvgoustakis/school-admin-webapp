import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom'
import '../stylesheets/globalstyles.css';
import { Employee } from './employee';
import { EditJob } from './editJob';
import {dateToDEFormat, Sleep} from '../../globalFunctions'
import {CSVLink, CSVDownload} from "react-csv";
import { v4 as uuidv4 } from 'uuid';



export class Job extends React.Component{
    csvLink = React.createRef()
    constructor(props){
        super(props);
        this.today = new Date();
        this.defaultDateValue = this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+ this.today.getDate();
        this.target = document.getElementById('job-data');
        this.fetchEmployees = this.fetchEmployees.bind(this);
        this.fetchTeamContact = this.fetchTeamContact.bind(this);
        this.fetchTeamContactCompliment = this.fetchTeamContactCompliment.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.customRender = this.customRender.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.replaceAllChars = this.replaceAllChars.bind(this);
        this.generateCSV = this.generateCSV.bind(this);
        this.state = {
            editing: false,
            clicked: false,
            loading: false,
            filter: this.props.filter,
            core_data:{
                name: this.props.name,
                taetigkeit: this.props.taetigkeit,
                typ: this.props.typ,
                taetigkeit_beginn: this.props.taetigkeit_beginn,
                taetigkeit_ende: this.props.taetigkeit_ende,
            },
            employees:[],
            csvFilename: '',
            csvData: [],
        }
    }

    async fetchEmployees(column){
        return (
        await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/job_roles`, {
            params: {
                column: column,
            },
          }))
      }

    async fetchTeamContact(teamJobs, kollektiv){
    return (
    await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/teamContacts`, {
        params: {
            teamJobs: teamJobs,
            kollektiv: kollektiv
        },
        }))
    }

    async fetchTeamContactCompliment(teamJobs, kollektiv){
        return (
        await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/teamContactsCompliment`, {
            params: {
                teamJobs: teamJobs,
                kollektiv: kollektiv
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
                            </svg>, document.getElementById('job-data'))
            }else{

                this.state.editing ? (ReactDOM.render(
                    <div>
                        <button onClick={this.onEdit}>Switch to Data view</button>
                        <EditJob 

                            //Kerndaten to edit passed as props
                            typ= {this.state.core_data.typ ? (this.state.core_data.typ):('')}
                            taetigkeit={this.state.core_data.taetigkeit ? (this.state.core_data.taetigkeit):('')}
                            mitglieder = {this.state.employees ? (this.state.employees):('')}
                            filter= {this.state.filter}
                        />
                    </div>
                    , document.getElementById('job-data'))):(
    
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

                        <Employee
                            employees={this.state.employees}
                            taetigkeit={this.props.taetigkeit}
                            typ={this.props.typ}
                            navi={this.props.navi}
                        />
                </div>
                , document.getElementById('job-data')))}
    }
    

    componentDidUpdate() {
        if(this.state.clicked){
            this.customRender();
        }
    }
    
    handleClick = async() => {
        this.customRender();
        this.setState({loading: true}, () => {
        //console.log(this.state.core_data.taetigkeit)
        this.fetchEmployees(this.state.core_data.taetigkeit ? (this.state.core_data.taetigkeit):(this.state.core_data.typ))
        .then(result => {
           // console.log(result.data)
             this.setState({
                employees: result.data,
                 })})
        },
        this.setState({loading:false}),
        this.setState({clicked: true}),
        //console.log(this.state.employees)
        )
    }


    async generateCSV() {
        
        let data =[
                    ["aktuelle E-Mail Addressen für: ", "Team"]
                ]
        
        let teamJobs = [
            'Lehrkraefte mit Unterrichtsbefaehigung',
            'Lehrkraefte ohne Unterrichtsbefaehigung',
            'Paedagogische Fachkraefte eFoeB'
        ]
        
        //team members: Lehrkräfte mit/ohne + päd. Fachkräfte
        // this.state.team.forEach(teamMember =>{ })

        //einzutragende Mitglieder Team
        this.setState({loading: true}, () => {
            this.fetchTeamContact(teamJobs, false) //fasle returns lehrkräfte and true kollektiv
            .then(result => {
                //console.log(result.data)
                result.data.forEach(person => {
                let lineArray = [];
                let email = '';

                if (person.email_fsx) email = person.email_fsx;
                else if (person.email_1) email = person.email_1;
                else if (person.email_2) email = person.email_2;
                else email = '';
                
                
                if (email && email != " "){
                    let bezugspersonContactData = {contactMail: person.rufname + " " 
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
       
        //console.log(data)
        await Sleep(200)

        //einzutragende Mitglieder Kollektiv
        data.push([" ", " "])
        data.push(["aktuelle E-mail Addressen für:", "Kollektiv"])

        this.setState({loading: true}, () => {
            this.fetchTeamContact(teamJobs, true) //fasle returns lehrkräfte and true kollektiv
            .then(result => {
                //console.log(result.data)
                result.data.forEach(person => {
                let lineArray = [];
                let email = '';

                if (person.email_fsx) email = person.email_fsx;
                else if (person.email_1) email = person.email_1;
                else if (person.email_2) email = person.email_2;
                else email = '';
                
                
                if (email && email != " "){
                    let bezugspersonContactData = {contactMail: person.rufname + " " 
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
        
        //console.log(data)
        await Sleep(200)

        data.push([" ", " "])
        data.push(["auszutragende E-mail Addressen für:", "Team"])
        
        //auszutragende Mitglieder Team
        this.setState({loading: true}, () => {
            this.fetchTeamContactCompliment(teamJobs, false) //fasle returns lehrkräfte and true kollektiv
            .then(result => {
                //console.log(result.data)
                result.data.forEach(person => {
                let lineArray = [];
                let email = '';

                if (person.email_fsx) email = person.email_fsx;
                else if (person.email_1) email = person.email_1;
                else if (person.email_2) email = person.email_2;
                else email = '';
                
                
                if (email && email != " "){
                    let bezugspersonContactData = {contactMail: email }
                    lineArray.push(bezugspersonContactData.contactMail)
                    data.push(lineArray)
                }
                
                })
            })
            },
            this.setState({loading:false}),
        )


        await Sleep(200)

        data.push([" ", " "])
        data.push(["auszutragende E-mail Addressen für:", "Kollektiv"])
        
        //auszutragende Mitglieder Kollektiv
        this.setState({loading: true}, () => {
            this.fetchTeamContactCompliment(teamJobs, true) //fasle returns lehrkräfte and true kollektiv
            .then(result => {
                //console.log(result.data)
                result.data.forEach(person => {
                let lineArray = [];
                let email = '';

                if (person.email_fsx) email = person.email_fsx;
                else if (person.email_1) email = person.email_1;
                else if (person.email_2) email = person.email_2;
                else email = '';
                
                
                if (email && email != " "){
                    let bezugspersonContactData = {contactMail: email }
                    lineArray.push(bezugspersonContactData.contactMail)
                    data.push(lineArray)
                }
                
                })
            })
            },
            this.setState({loading:false}),
        )

        //console.log(data)

        await Sleep(1000);
        this.setState({csvData: data, csvFilename: `maillingList_taetikeiten_${dateToDEFormat(new Date(this.defaultDateValue))}` + ".csv"})

        this.csvLink.current.link.click()   
    }




    replaceAllChars(str, find, replace) {
        var escapedFind=find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
        return str.replace(new RegExp(escapedFind, 'g'), replace);
    }



    render() {
        //console.log(this.state.core_data.taetigkeit)
      return (

        <li key={uuidv4()} onClick={this.handleClick} >
              
            <p style={{textSizeAdjust:'auto'}}>
                {this.state.core_data.taetigkeit ? 
                (this.replaceAllChars(this.replaceAllChars(this.state.core_data.taetigkeit,'ae', 'ä'),'ue', 'ü'))
                :(this.replaceAllChars(this.state.core_data.typ,'ae','ä'))}</p> 
        </li>
        
      )
    }
  }

  