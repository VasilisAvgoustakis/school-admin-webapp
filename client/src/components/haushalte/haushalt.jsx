import React from 'react';
import axios,{setPost} from 'axios';
import ReactDOM from 'react-dom'
// import KontaktDaten from './kontaktdaten';
// import '../stylesheets/personen.css'
// import '../stylesheets/globalstyles.css';
// import { KindDaten } from './kindDaten';
// import { AddressData } from './adressData';
// import {AGData} from './arbeitsgruppen_data';
// import { Bezugspersonen } from './bezugsperson_liste';
import dateToDEFormat from '../../globalFunctions'
import { v4 as uuidv4 } from 'uuid';



export class Haushalt extends React.Component{
    constructor(props){
        super(props);
        this.target = document.getElementById('haus-data');
        // this.fetchData = this.fetchData.bind(this);
        // this.fetchContactData = this.fetchContactData.bind(this);
        // this.fetchAddresses = this.fetchAddresses.bind(this);
        // this.fetchAGs = this.fetchAGs.bind(this);
        // this.fetchBezugspersonen = this.fetchBezugspersonen.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.customRender = this.customRender.bind(this);
        this.state = {
            clicked: false,
            loading: false,
            core_data:{
                haushalt_id: this.props.haushalte_id,
                strasse: this.props.strasse,
                plz: this.props.plz,
                ort: this.props.ort,
                ort_berlin: this.props.ort_berlin,
                quart_mgmt: this.props.quart_mgmt,
                festnetz: this.props.festnetz,
                zusatz: this.props.zusatz,
                land: this.props.land
            },
            // data:[],
            // contactData: [],
            // addresses: [],
            // arbeitsgruppen: [],
            // bezugspersonen: []
        }
    }


    // async fetchData(haushalt_id){
    //     return (
    //     await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/personsData`, {
    //         params: {
    //             person_id: person_id,
    //         },
    //       }))
    //   }



    customRender(loading){
        if(loading){
            ReactDOM.render(<svg className="spinner" viewBox="0 0 50 50">
                                <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                            </svg>, document.getElementById('haus-data'))
            }else{
    
            ReactDOM.render(
    
                <div>
                    <div className='entity-data-left'>
                        <table>
                            <thead>
                                <tr>
                                    <th colSpan="2">Haushalt's Kerndaten</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{width:'10%'}}><strong>Id:</strong></td>
                                    <td>{this.state.core_data.haushalt_id}</td>
                                </tr>
                                <tr>
                                    <td style={{width:'10%'}}><strong>Straße:</strong></td>
                                    <td >{this.state.core_data.strasse}</td>
                                </tr>
                                <tr>
                                    <td style={{width:'10%'}}><strong>PLZ:</strong></td>
                                    <td>{this.state.core_data.plz}</td>
                                </tr>
                                <tr>
                                    <td style={{width:'10%'}}><strong>Ort:</strong></td>
                                    <td>{this.state.core_data.ort}</td>
                                </tr>
                                <tr>
                                    <td style={{width:'10%'}}><strong>Region:</strong></td>
                                    <td>{this.state.core_data.region}</td>
                                </tr>
                                <tr>
                                    <td style={{width:'10%'}}><strong>Ort in Berlin:</strong></td>
                                    <td>{this.state.core_data.ort_berlin}</td>
                                </tr>
                                <tr>
                                    <td style={{width:'10%'}}><strong>Quart. Mgmt:</strong></td>
                                    <td>{this.state.core_data.quart_mgmt}</td>
                                </tr>
                                <tr>
                                    <td style={{width:'10%'}}><strong>Festnetz:</strong></td>
                                    <td>{this.state.core_data.festnetz}</td>
                                </tr>
                                <tr>
                                    <td style={{width:'10%'}}><strong>Adress zusatz:</strong></td>
                                    <td>{this.state.core_data.zusatz}</td>
                                </tr>
                                <tr>
                                    <td style={{width:'10%'}}><strong>Land:</strong></td>
                                    <td>{this.state.core_data.land}</td>
                                </tr>
                                
                            </tbody>
                        </table>
                    
                        {/* <KontaktDaten 
                            data= {this.state.contactData}/>
                        
                        <KindDaten 
                            data= {this.state.data}/> */}

                        

                     </div>
                        
                    <div className='entity-data-right'>
                        {/* <AddressData
                            addresses= {this.state.addresses}/> */}
                        {/* {console.log(this.state.arbeitsgruppen)} */}
                        {/* {!this.state.core_data.einschulungsdatum ? 
                            (<AGData
                                ags={this.state.arbeitsgruppen} />)
                                :
                                (<p></p>)} */}
                        
                        {/* {this.state.core_data.einschulungsdatum ?
                            (<Bezugspersonen 
                                data= {this.state.bezugspersonen}/>)
                                :(<p></p>)} */}
                        
                        
                    </div>
                </div>
                , document.getElementById('haus-data'))}
    }
    

    componentDidUpdate() {
        if(this.state.clicked){
            this.customRender();
        }
    }
    
    handleClick = async() => {
        this.customRender();
        //this.setState({loading: true}, () => {
        // this.fetchData(this.state.core_data.personId)
        // .then(result => {
        //     this.setState({
        //         data: result.data,
        //         })}).then(

        // this.fetchContactData(this.state.core_data.personId)
        // .then(result => {
        // this.setState({
        //     contactData: result.data,
        //     })})).then(

        // this.fetchAddresses(this.state.core_data.personId).then(result => {
        //     this.setState({
                
        //         addresses: result.data,
        //         })})).then(
            
        // this.fetchAGs(this.state.core_data.personId).then(result => {
        //     this.setState({
                
        //         arbeitsgruppen: result.data,
        //         })})).then(

        // this.fetchBezugspersonen(this.state.core_data.personId).then(result => {
        //     this.setState({
        //         bezugspersonen: result.data,
                
        //         })}))},
        // this.setState({loading:false}),
        // this.setState({clicked: true}),
        // //console.log(this.state.bezugspersonen)
        
        
        // // console.log(this.state.loading + ' :after fetching')
        // );

        
    }



    render() {
        
      return (

        <li key={uuidv4()} onClick={this.handleClick} >
              
            {this.state.core_data.strasse +' ' + this.state.core_data.plz}
        </li>
        
      )
    }
  }

  