import React, {Component} from 'react';
import axios,{setPost} from 'axios';
import {Haushalt} from './haushalt';
import '../stylesheets/personen.css';
import '../stylesheets/globalstyles.css';
import { v4 as uuidv4 } from 'uuid';


export class HausSelectList extends Component{
  
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.search = this.search.bind(this);
    this.state = {
      haushalte: [],
      searchedHause: []
    };
  }


  fetchData(table){
    return (
    axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/hausList`, {
        params: {
          table: table,
        },
      }))
  }
  

  search(hausName){
    this.setState.searchedHause = [];
    // console.log(this.state.searchedHause);
    const results = [];
    this.state.haushalte.forEach(function(haus){
      const haus_credentials = haus.strasse + ' '+ haus.postleitzahl + ' ' + haus.ort + ' '
                            + haus.region + ' ' + haus.land;

      if(haus_credentials.toLowerCase().includes(hausName.toLowerCase()) && hausName != '' ){
        results.push(haus);
      }
    })
    
    this.state.searchedHause = results;
    this.forceUpdate();
  }

  componentDidMount() {
    this.fetchData('haushalte').then(res => {
      
      this.setState({
        haushalte: res.data
      })
      this.setState.searchedHause = [];
    });
  }
  

  render() {
    var hauseToRender = [];
    // console.log(this.state.haushalte)
    if(this.state.searchedHause.length >=1){
      hauseToRender = this.state.searchedHause;
    }else{
      hauseToRender = this.state.haushalte;

    }
    console.log(hauseToRender);
    
    
      return (
        <div className='entity-list-scroller-cont' >
          <input
                type="text"
                className='entity-search'              
                // id="header-search"
                placeholder="Haushalte Suche"
                name="s" 
                onChange={(e) => {
                  this.search(e.target.value);
                }}
            />
          <div className='entity-list-scroller'>
              <ul>
              {hauseToRender.map(haus => (
                <Haushalt key={uuidv4()}
                  haushalt_id={haus.haushalt_id}
                  strasse={haus.strasse}
                  plz={haus.postleitzahl}
                  ort={haus.ort} 
                  region={haus.region}
                  ort_berlin={haus.ortsteil_berlin}
                  quart_mgmt={haus.quartiersmanagement_gebiet}
                  festnetz={haus.telefon}
                  zusatz={haus.adress_zusatz}
                  land={haus.land}
                />
              ))}
              </ul>
          </div>
          <div className='entity-data-cont'  id='haus-data'>
            Haus Data Container 
          </div>
        </div>

        
     
      );
  }
}



