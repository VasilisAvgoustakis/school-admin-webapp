import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom'
import '../stylesheets/globalstyles.css';
import { Employee } from './employee';

import { v4 as uuidv4 } from 'uuid';



export class Job extends React.Component{
    constructor(props){
        super(props);
        this.target = document.getElementById('job-data');
        this.fetchEmployees = this.fetchEmployees.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.customRender = this.customRender.bind(this);
        this.state = {
            clicked: false,
            loading: false,
            core_data:{
                taetigkeit: this.props.taetigkeit,
                // typ: this.props.typ,
                // taetigkeit_beginn: this.props.taetigkeit_beginn,
                // taetigkeit_ende: this.props.taetigkeit_ende,
            },
            employees:[],
        }
    }

    async fetchEmployees(taetigkeit){
        return (
        await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/job_roles`, {
            params: {
                taetigkeit: taetigkeit,
            },
          }))
      }


    customRender(loading){
        if(loading){
            ReactDOM.render(<svg className="spinner" viewBox="0 0 50 50">
                                <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                            </svg>, document.getElementById('job-data'))
            }else{
    
            ReactDOM.render(
                <div>
                        <Employee
                            employees={this.state.employees}
                        />
                </div>
                , document.getElementById('job-data'))}
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
        this.fetchEmployees(this.state.core_data.taetigkeit)
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



    render() {
        
      return (

        <li key={uuidv4()} onClick={this.handleClick} >
              
            <p style={{textSizeAdjust:'auto'}}>
                {this.state.core_data.taetigkeit}</p> 
        </li>
        
      )
    }
  }

  