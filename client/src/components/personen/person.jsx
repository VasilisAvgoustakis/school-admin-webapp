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
import dateToDEFormat from '../../globalFunctions'



export class Person extends React.Component{
    constructor(props){
        super(props);
        this.target = document.getElementById('person-data');
        this.fetchData = this.fetchData.bind(this);
        this.fetchAddresses = this.fetchAddresses.bind(this);
        this.fetchAGs = this.fetchAGs.bind(this);
        this.fetchBezugspersonen = this.fetchBezugspersonen.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.customRender = this.customRender.bind(this);
        this.state = {
            clicked: false,
            loading: false,
            core_data:{
                personId: this.props.person_id,
                rufname: this.props.rufname,
                amtlicher_vorname: this.props.amtlicher_vorname,
                nachname: this.props.nachname,
                geburtsdatum: this.props.geburtsdatum,
                einschulungsdatum: this.props.einschulungsdatum
            },
            data:[],
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


    customRender(loading){
        if(loading){
            ReactDOM.render(<svg className="spinner" viewBox="0 0 50 50">
                                <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                            </svg>, document.getElementById('person-data'))
            }else{
    
            ReactDOM.render(
    
                <div>
                    <div className='pers-data-left'>
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
                                    <td >{this.state.core_data.rufname}</td>
                                </tr>
                                <tr>
                                    <td style={{width:'10%'}}><strong>Amt. Vorname:</strong></td>
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
                                </tr>) : ("") }
                            </tbody>
                        </table>
                    
                        <KontaktDaten 
                            data= {this.state.data}/>
                        
                        <KindDaten 
                            data= {this.state.data}/>

                        {this.state.core_data.einschulungsdatum ?
                            (<Bezugspersonen 
                                data= {this.state.bezugspersonen}/>)
                                :(<p></p>)}

                     </div>
                        
                    <div className='pers-data-right'>
                        <AddressData 
                            addresses= {this.state.addresses}/>
                        {/* {console.log(this.state.arbeitsgruppen)} */}
                        {!this.state.core_data.einschulungsdatum ? 
                            (<AGData
                                ags={this.state.arbeitsgruppen} />)
                                :
                                (<p></p>)}
                        
                        
                    </div>
                </div>
                , document.getElementById('person-data'))}
    }
    
    // componentDidMount() {
    //     this.setState({loading : true })
    //     this.fetchAddresses(this.state.core_data.personId).then(result => {
    //         this.setState({
    //             loading: false,
    //             addresses: result.data,
    //             })})
            
    //     this.fetchAGs(this.state.core_data.personId).then(result => {
    //         this.setState({
    //             loading: false,
    //             arbeitsgruppen: result.data,
    //             })})

    //     this.fetchBezugspersonen(this.state.core_data.personId).then(result => {
    //         this.setState({
    //             loading: false,
    //             bezugspersonen: result.data,
    //             })})
        
    //     }
    
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
        //console.log(this.state.bezugspersonen)
        
        
        // console.log(this.state.loading + ' :after fetching')
        );

        
    }



    render() {
        
      return (

        <li key={ this.state.core_data.personId} onClick={this.handleClick} >
              
            {this.state.core_data.rufname +' ' + this.state.core_data.nachname}
        </li>
        
      )
    }
  }

  