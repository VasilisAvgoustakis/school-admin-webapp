import React from 'react';
import axios,{setPost} from 'axios';
import ReactDOM from 'react-dom'
import '../stylesheets/globalstyles.css';
import { Mitglieder } from './mitglieder';
import {dateToDEFormat} from '../../globalFunctions'
import { v4 as uuidv4 } from 'uuid';



export class Ag extends React.Component{
    constructor(props){
        super(props);
        this.target = document.getElementById('ag-data');
        this.fetchMitglieder = this.fetchMitglieder.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.customRender = this.customRender.bind(this);
        this.state = {
            clicked: false,
            loading: false,
            core_data:{
                arbeitsgruppe_id: this.props.arbeitsgruppe_id,
                bezeichnung: this.props.bezeichnung,
                beschreibung: this.props.beschreibung,
                email: this.props.email,
            },
            mitglieder:[],
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


    customRender(loading){
        if(loading){
            ReactDOM.render(<svg className="spinner" viewBox="0 0 50 50">
                                <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                            </svg>, document.getElementById('ag-data'))
            }else{
    
            ReactDOM.render(
    
                <div>
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
                            mietglieder= {this.state.mitglieder}/>
                    </div>
                </div>
                , document.getElementById('ag-data'))}
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
            console.log(result.data)
             this.setState({
                 mitglieder: result.data,
                 })})
        },
        this.setState({loading:false}),
        this.setState({clicked: true}),
        console.log(this.state.mitglieder)
        )
    }



    render() {
        
      return (

        <li key={uuidv4()} onClick={this.handleClick} >
              
            {this.state.core_data.bezeichnung}
        </li>
        
      )
    }
  }

  