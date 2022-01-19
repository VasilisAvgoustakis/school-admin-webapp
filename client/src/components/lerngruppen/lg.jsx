import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom'
import '../stylesheets/globalstyles.css';
import { Schuller } from './schuller';
import dateToDEFormat from '../../globalFunctions'
import { v4 as uuidv4 } from 'uuid';



export class Lg extends React.Component{
    constructor(props){
        super(props);
        this.target = document.getElementById('lg-data');
        this.fetchMitglieder = this.fetchMitglieder.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.customRender = this.customRender.bind(this);
        this.state = {
            clicked: false,
            loading: false,
            core_data:{
                lerngruppe_id: this.props.lerngruppe_id,
                bezeichnung: this.props.bezeichnung,
                email_eltern: this.props.email_eltern,
                email_team: this.props.email_team,
                telefon_team: this.props.telefon_team
            },
            schuller:[],
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


    customRender(loading){
        if(loading){
            ReactDOM.render(<svg className="spinner" viewBox="0 0 50 50">
                                <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                            </svg>, document.getElementById('lg-data'))
            }else{
    
            ReactDOM.render(
    
                <div>
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
                                    <td >{this.state.core_data.email_eltern}</td>
                                </tr>
                                <tr>
                                    <td><strong>E-Mail Team:</strong></td>
                                    <td>{this.state.core_data.email_team}</td>
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
                            schuller= {this.state.schuller}/>
                    </div>
                </div>
                , document.getElementById('lg-data'))}
    }
    

    componentDidUpdate() {
        if(this.state.clicked){
            this.customRender();
        }
    }
    
    handleClick = async() => {
        this.customRender();
        this.setState({loading: true}, () => {
        console.log(this.state.core_data.lerngruppe_id)
        this.fetchMitglieder(this.state.core_data.lerngruppe_id)
        .then(result => {
            console.log(result.data)
             this.setState({
                schuller: result.data,
                 })})
        },
        this.setState({loading:false}),
        this.setState({clicked: true}),
        console.log(this.state.schuller)
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

  