import React, {Component} from 'react';
import axios from 'axios';
import {Lg} from './lg.jsx';
import '../stylesheets/globalstyles.css';
import { v4 as uuidv4 } from 'uuid';


export class LgSelectList extends Component{
  
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.search = this.search.bind(this);
    this.state = {
      lerngruppen: [],
      searchedGruppe: []
    };
  }


  fetchData(table){
    return (
    axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/lerngruppenList`, {
        params: {
          table: table,
        },
      }))
  }
  

  search(lgName){
    this.setState.searchedGruppe = [];
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

  componentDidMount() {
    this.fetchData('lerngruppen').then(res => {
      
      this.setState({
        lerngruppen: res.data
      })
      this.setState.searchedGruppe = [];
    });
  }
  

  render() {
    var lgsToRender = [];
    // console.log(this.state.haushalte)
    if(this.state.searchedGruppe.length >=1){
      lgsToRender = this.state.searchedGruppe;
    }else{
      lgsToRender = this.state.lerngruppen;

    }
    //console.log(lgsToRender);
    
    
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
          <div className='entity-list-scroller'>
              <ul>
              {lgsToRender.map(lg => (
                <Lg key={uuidv4()}
                  lerngruppe_id={lg.lerngruppe_id}
                  bezeichnung={lg.bezeichnung}
                  email_eltern={lg.email_eltern}
                  email_team={lg.email_team}
                  telefon_team={lg.telefon_team} 
                />
              ))}
              </ul>
          </div>
          <div className='entity-data-cont'  id='lg-data'>
            Lg Data Container 
          </div>
        </div>

        
     
      );
  }
}



