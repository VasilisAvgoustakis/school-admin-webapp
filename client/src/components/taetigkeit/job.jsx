import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom'
import '../stylesheets/globalstyles.css';
import { Employee } from './employee';
import { EditJob } from './editJob';

import { v4 as uuidv4 } from 'uuid';



export class Job extends React.Component{
    constructor(props){
        super(props);
        this.target = document.getElementById('job-data');
        this.fetchEmployees = this.fetchEmployees.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.customRender = this.customRender.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.replaceAllChars = this.replaceAllChars.bind(this);
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
                        <Employee
                            employees={this.state.employees}
                            taetigkeit={this.props.taetigkeit}
                            typ={this.props.typ}
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
                (this.state.core_data.taetigkeit)
                :(this.state.core_data.typ)}</p> 
        </li>
        
      )
    }
  }

  