import React from 'react';
import axios,{setPost} from 'axios';
import ReactDOM from 'react-dom'
import '../stylesheets/globalstyles.css';
import { Anwohner } from './anwohner';
import dateToDEFormat from '../../globalFunctions'
import { v4 as uuidv4 } from 'uuid';



export class Haushalt extends React.Component{
    constructor(props){
        super(props);
        this.target = document.getElementById('haus-data');
        this.fetchAnwohner = this.fetchAnwohner.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.customRender = this.customRender.bind(this);
        this.state = {
            clicked: false,
            loading: false,
            core_data:{
                haushalt_id: this.props.haushalt_id,
                strasse: this.props.strasse,
                plz: this.props.plz,
                ort: this.props.ort,
                ort_berlin: this.props.ort_berlin,
                quart_mgmt: this.props.quart_mgmt,
                festnetz: this.props.festnetz,
                zusatz: this.props.zusatz,
                land: this.props.land
            },
            anwohner:[],
        }
    }

    async fetchAnwohner(haushalt_id){
        return (
        await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/anwohner`, {
            params: {
                haushalt_id: haushalt_id,
            },
          }))
      }


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
                                    <td style={{width:'30%'}}><strong>Id:</strong></td>
                                    <td>{this.state.core_data.haushalt_id}</td>
                                </tr>
                                <tr>
                                    <td><strong>Straße:</strong></td>
                                    <td >{this.state.core_data.strasse}</td>
                                </tr>
                                <tr>
                                    <td><strong>PLZ:</strong></td>
                                    <td>{this.state.core_data.plz}</td>
                                </tr>
                                <tr>
                                    <td><strong>Ort:</strong></td>
                                    <td>{this.state.core_data.ort}</td>
                                </tr>
                                <tr>
                                    <td><strong>Region:</strong></td>
                                    <td>{this.state.core_data.region}</td>
                                </tr>
                                <tr>
                                    <td><strong>Ort in Berlin:</strong></td>
                                    <td>{this.state.core_data.ort_berlin}</td>
                                </tr>
                                <tr>
                                    <td><strong>Quart. Mgmt:</strong></td>
                                    <td>{this.state.core_data.quart_mgmt}</td>
                                </tr>
                                <tr>
                                    <td><strong>Festnetz:</strong></td>
                                    <td>{this.state.core_data.festnetz}</td>
                                </tr>
                                <tr>
                                    <td><strong>Adress zusatz:</strong></td>
                                    <td>{this.state.core_data.zusatz}</td>
                                </tr>
                                <tr>
                                    <td><strong>Land:</strong></td>
                                    <td>{this.state.core_data.land}</td>
                                </tr>
                                
                            </tbody>
                        </table>
                     </div>
                        
                    <div className='entity-data-right'>
                        <Anwohner
                            anwohner= {this.state.anwohner}
                            navi={this.props.navi}/>
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
        this.setState({loading: true}, () => {
        this.fetchAnwohner(this.state.core_data.haushalt_id)
        .then(result => {
             this.setState({
                 anwohner: result.data,
                 })})
        },
        this.setState({loading:false}),
        this.setState({clicked: true}),
        console.log(this.state.anwohner)
        )
    }



    render() {
        
      return (

        <li key={uuidv4()}
        id={this.state.core_data.haushalt_id + this.state.core_data.plz}
        onClick={this.handleClick} >
              
            {this.state.core_data.strasse +' ' + this.state.core_data.plz}
        </li>
        
      )
    }
  }

  