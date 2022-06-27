import { SERVER_IP } from '../../globalFunctions';
import React, {Component} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import {Lg} from './lg.jsx';
import { EditLg } from './editLg.jsx';
import '../../stylesheets/globalstyles.css';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'


export class LgSelectList extends Component{
  
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.search = this.search.bind(this);
    this.addLg = this.addLg.bind(this);
    this.getLastLgId = this.getLastLgId.bind(this);
    this.state = {
      lerngruppen: [],
      searchedGruppe: [],
      nextLg_Id: ''
    };
  }


  fetchData(table){
    return (
    axios.get(`http://${SERVER_IP}:3000/lerngruppenList`, {
        params: {
          table: table,
        },
      }))
  }

  getLastLgId(){
    return (
    axios.get(`http://${SERVER_IP}:3000/lastLgId`, {
      })).then(res=>{
        this.setState({nextLg_Id: res.data[0].id + 1})
        //console.log(this.state.nextHaus_Id)
      })
  }
  

  search(lgName){
    this.setState.searchedGruppe = [];
    sessionStorage.setItem("lastLocation", '');
    sessionStorage.setItem("lastId", '');
    // console.log(this.state.searchedGruppe);
    const results = [];
    this.state.lerngruppen.forEach(function(lg){
      const lg_credentials = lg.bezeichnung;
      if(lg_credentials.toLowerCase().includes(lgName.toLowerCase()) && lgName != '' ){
        results.push(lg);
      }
    })
    this.state.searchedGruppe = results;
    this.forceUpdate();
  }

  addLg(){
    ReactDOM.render(<EditLg 
                        lerngruppe_id={this.state.nextLg_Id}
                         />, document.getElementById('lg-data'))
  }

  componentDidMount() {
    this.fetchData('lerngruppen').then(res => {
      
      this.setState({
        lerngruppen: res.data
      })
      this.setState.searchedGruppe = [];
    }).then(this.getLastLgId());
  }


  render() {
    
    var lgsToRender = [];
    // console.log(this.state.haushalte)
    if(this.state.searchedGruppe.length >=1){
      lgsToRender = this.state.searchedGruppe;
    }else{
      lgsToRender = this.state.lerngruppen;

    }

      return (
        <div className='entity-list-scroller-cont' >
          <input
                type="text"
                className='entity-search'              
                // id="header-search"
                placeholder="Lerngruppen Suche"
                name="s" 
                onChange={(e) => {
                  this.search(e.target.value);
                }}
            />

          <button className='add-button' onClick={this.addLg}><FontAwesomeIcon icon={faPlus}/></button>

          <div className='entity-list-scroller'>
              <ul>
              {lgsToRender.map(lg => (
                <Lg key={uuidv4()}
                  lerngruppe_id={lg.lerngruppe_id}
                  bezeichnung={lg.bezeichnung}
                  email_eltern={lg.email_eltern}
                  email_team={lg.email_team}
                  telefon_team={lg.telefon_team}
                  navi={this.props.navi} 
                />
              ))}
              </ul>
          </div>
          <div className='entity-data-cont'  id='lg-data'>
            <p className='info-text'>Lg Data Container </p>
          </div>
        </div>

        
     
      );
  }
}



