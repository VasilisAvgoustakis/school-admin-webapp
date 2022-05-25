import React from 'react';
import axios,{setPost} from 'axios';
import ReactDOM from 'react-dom';
import {EditAg} from './editAg'
import '../stylesheets/globalstyles.css';
import { Mitglieder } from './mitglieder';
import {CSVLink, CSVDownload} from "react-csv";
import {dateToDEFormat, Sleep} from '../../globalFunctions'
import { v4 as uuidv4 } from 'uuid';



export class Ag extends React.Component{
    csvLink = React.createRef()
    constructor(props){
        super(props);
        this.today = new Date();
        this.defaultDateValue = this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+ this.today.getDate();
        this.target = document.getElementById('ag-data');
        this.fetchMitglieder = this.fetchMitglieder.bind(this);
        this.fetchContactData = this.fetchContactData.bind(this);
        this.fetchContactDataCompliment = this.fetchContactDataCompliment.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.customRender = this.customRender.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.generateCSV = this.generateCSV.bind(this);
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

    async fetchMitglieder(arbeitsgruppe_id){
        return (
        await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/ag_mitglieder`, {
            params: {
                arbeitsgruppe_id: arbeitsgruppe_id,
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

    async fetchContactDataCompliment(idsArr){
        return (
        await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/contactDataCompliment`, {
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
                            </svg>, document.getElementById('ag-data'))
            }else{

                this.state.editing ? (ReactDOM.render(
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
                    , document.getElementById('ag-data'))):(
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
                        >Download me</CSVLink>
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
    
    handleClick = async() => {
        this.customRender();
        this.setState({loading: true}, () => {
        this.fetchMitglieder(this.state.core_data.arbeitsgruppe_id)
        .then(result => {
            //console.log(result.data)
             this.setState({
                 mitglieder: result.data,
                 })})
        },
        this.setState({loading:false}),
        this.setState({clicked: true}),
        //console.log(this.state.mitglieder)
        )
    }

    async generateCSV() {
        
        let data =[
                    ["aktuelle Mitglieder in:", this.state.core_data.bezeichnung]
                    //['"Rufname" <E-Mail Addresse>']
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
        
        //console.log(mitgliederIdArr)
        this.setState({loading: true}, () => {
            this.fetchContactDataCompliment(mitgliederIdArr)
            .then(result => {
                //console.log(result.data)
                for (let i = 0; i < result.data.length; i++) 
                {   
                    let lineArray = [];
                    //lineArray.push(result.data[i].rufname)

                    if (result.data[i].email_fsx) lineArray.push(result.data[i].email_fsx)
                    else if (result.data[i].email_1) lineArray.push(result.data[i].email_1)
                    else if (result.data[i].email_2) lineArray.push(result.data[i].email_2)
                    else lineArray.push("")

                    //console.log(lineArray)
                    data.push(lineArray)
                }
            })
    
            
            },
            this.setState({loading:false}),
        )
        



        await Sleep(1000);
        this.setState({csvData: data, csvFilename: `maillingList_${this.state.core_data.bezeichnung}_${dateToDEFormat(new Date(this.defaultDateValue))}` + ".csv"})
        
        console.log(this.state.csvData)

        this.csvLink.current.link.click()   
    }



    render() {
        
      return (

        <li key={uuidv4()} onClick={this.handleClick} >
              
            {this.state.core_data.bezeichnung}
        </li>
        
      )
    }
  }

  