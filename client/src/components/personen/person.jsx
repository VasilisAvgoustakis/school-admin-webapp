import React from 'react';
import axios,{setPost} from 'axios';
import ReactDOM from 'react-dom'
import KontaktDaten from './kontaktdaten';
import '../stylesheets/personen.css'
import { KindDaten } from './kindDaten';


export class Person extends React.Component{
    constructor(props){
        super(props);
        this.target = document.getElementById('person-data');
        this.fetchData = this.fetchData.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            loading: false,
            core_data:{
                personId: this.props.person_id,
                rufname: this.props.rufname,
                amtlicher_vorname: this.props.amtlicher_vorname,
                nachname: this.props.nachname,
                geburtsdatum: this.props.geburtsdatum,
                einschulungsdatum: this.props.einschulungsdatum
            },
            data:''
        }
    }


    async fetchData(person_id){
        this.setState({loading: true})
        return (
        await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/personsData`, {
            params: {
                person_id: person_id,
            },
          }))
      }


    handleClick = () => {
        this.setState({loading : true }, () => {;
        //console.log(this.state.loading)
        this.fetchData(this.state.core_data.personId)
        .then(result => {
            this.setState({
                loading: false,
                data: result.data,
                })
        //console.log(this.state.loading);
        //console.log(this.state.data)


        ReactDOM.render(
            <div>
                {/* {this.state.loading ? (<svg className="spinner" viewBox="0 0 50 50">
                                            <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                                          </svg>) : ("Fetch Data")} */}
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th colSpan="2">Kerndaten</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Id:</td>
                                <td>{this.state.core_data.personId}</td>
                            </tr>
                            <tr>
                                <td>Rufname:</td>
                                <td>{this.state.core_data.rufname}</td>
                            </tr>
                            <tr>
                                <td>Amt. Vorname:</td>
                                <td>{this.state.core_data.amtlicher_vorname}</td>
                            </tr>
                            <tr>
                                <td>Nachname:</td>
                                <td>{this.state.core_data.nachname}</td>
                            </tr>
                            <tr>
                                <td>Geburtsdatum:</td>
                                <td>{this.state.core_data.geburtsdatum}</td>
                            </tr>
                            {this.state.core_data.einschulungsdatum ? (<tr>
                                <td>Einschulungsdatum:</td>
                                <td>{this.state.core_data.einschulungsdatum}</td>
                            </tr>) : ("") }
                        </tbody>
                    </table>
                </div>
                <br></br>
                
                <KontaktDaten 
                    data= {this.state.data}/>

                <KindDaten 
                    data= {this.state.data}/>
            </div>  
            , document.getElementById('person-data'))


    })})
        
        
        // ReactDOM.render(
        // <div>
        //     {this.state.loading ? (<svg className="spinner" viewBox="0 0 50 50">
        //                                 <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
        //                               </svg>) : ("Fetch Data")}
        //     <p>Id: {this.state.core_data.personId}</p>
        //     <p>Rufname: {this.state.core_data.rufname}</p>
        //     <p>Nachname: {this.state.core_data.nachname}</p> 
        //     <div>Data: {this.state.loading ? (<p>Spinner</p>) : (this.state.data.geburtsdatum)}</div>
            
        // </div>  
        // , document.getElementById('person-data'))
    
    }



    render() {
      return (

        <li key={ this.state.core_data.personId} onClick={this.handleClick} >
              
            {this.state.core_data.rufname +' ' + this.state.core_data.nachname}
        </li>
        
      )
    }
  }

  