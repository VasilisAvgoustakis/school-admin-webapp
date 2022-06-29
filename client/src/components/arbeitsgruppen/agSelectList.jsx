import { SERVER_IP } from '../../globalFunctions';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Ag} from './ag.jsx';
import { EditAg } from './editAg.jsx';
import '../../stylesheets/globalstyles.css';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'


/**
 * React class component containing the clickable selection list on the left,
 * for the current Entity.
 */


export class AgSelectList extends Component{
  
  constructor(props) {
    super(props);

    //this bindings
    this.fetchData = this.fetchData.bind(this);
    this.search = this.search.bind(this);
    this.addAg = this.addAg.bind(this);
    this.getLastAgId = this.getLastAgId.bind(this);

    //state vars
    this.state = {
      arbeitsgruppen: [],
      searchedGruppe: [],
      nextAg_Id: ''
    };
  }

  //fetches all existing AGs
  fetchData(table){
    return (
    axios.get(`http://${SERVER_IP}:3000/agList`, 
      {
        params: {
          table: table,
        },
      }))
  }

  //fetches the last AG id from db
  getLastAgId(){
    return (
      axios.get(`http://${SERVER_IP}:3000/lastAgId`, 
      )).then(
          res=>{
            this.setState({nextAg_Id: res.data[0].id + 1})
          })
  }
  
  //called by onChange attribute of search input
  search(agName){
    this.setState.searchedGruppe = []; //empty the list containing the searched items
    
    //empty session storage variables
    sessionStorage.setItem("lastLocation", '');
    sessionStorage.setItem("lastId", '');
    
    //results array
    const results = [];

    //loop through existing AGs to find the matching your search string
    this.state.arbeitsgruppen.forEach(function(ag){
      const ag_credentials = ag.bezeichnung;
      if(ag_credentials.toLowerCase().includes(agName.toLowerCase()) && agName != '' ){
        results.push(ag);
      }
    })
    this.state.searchedGruppe = results;
    this.forceUpdate();
  }
  
  //renders the add new AGs view
  addAg(){
    ReactDOM.render(<EditAg 
                        arbeitsgruppe_id={this.state.nextAg_Id}
                    />, document.getElementById('ag-data'))
  }

  //runs after component is mounted
  componentDidMount() {
    this.fetchData('arbeitsgruppen').then(res => {
      
      this.setState({
        arbeitsgruppen: res.data
      })
      this.setState.searchedGruppe = [];
    }).then(this.getLastAgId());
  }
  

  render() {
    //the AGs to be rendered on the left, either all or just the search matches
    var agsToRender = [];

    if(this.state.searchedGruppe.length >=1){
      agsToRender = this.state.searchedGruppe;
    }else{
      agsToRender = this.state.arbeitsgruppen;
    }
    
      return (
        <div className='entity-list-scroller-cont' >

          <button className='add-button' onClick={this.addAg}>
            <FontAwesomeIcon icon={faPlus}/>
            Neue AG hinzufügen
          </button>

          <input
                type="text"
                className='entity-search'              
                // id="header-search"
                placeholder="Arbeitsgruppen Suche"
                name="s" 
                onChange={(e) => {
                  this.search(e.target.value);
                }}
            />

          
          <div className='entity-list-scroller'>
              <ul>
              {agsToRender.map(ag => (
                <Ag key={uuidv4()}
                  arbeitsgruppe_id={ag.arbeitsgruppe_id}
                  bezeichnung={ag.bezeichnung}
                  beschreibung={ag.beschreibung}
                  email={ag.email}
                  navi={this.props.navi} 
                />
              ))}
              </ul>
          </div>

          <div className='entity-data-cont'  id='ag-data'>
            <p className='info-text'>Ag Data Container </p>
          </div>

        </div>
      );
  }
}



