import React, {Component} from 'react';
import axios,{setPost} from 'axios';
import ReactDOM from 'react-dom'
import {Haushalt} from './haushalt';
import { EditHaus } from './editHaus';
import '../stylesheets/personen.css';
import '../stylesheets/globalstyles.css';
import { v4 as uuidv4 } from 'uuid';


export class HausSelectList extends Component{
  
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.search = this.search.bind(this);
    this.addHaus = this.addHaus.bind(this);
    this.getLastHausId = this.getLastHausId.bind(this);
    this.state = {
      haushalte: [],
      searchedHause: [],
      nextHaus_Id:''
    };
  }


  fetchData(table){
    return (
    axios.get(`http://172.25.12.99:3000/hausList`, {
        params: {
          table: table,
        },
      }))
  }

  getLastHausId(){
    return (
    axios.get(`http://172.25.12.99:3000/lastHausId`, {
      })).then(res=>{
        this.setState({nextHaus_Id: res.data[0].id + 1})
        //console.log(this.state.nextHaus_Id)
      })
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
    }).then(this.getLastHausId());
  }

  addHaus(){
    ReactDOM.render(<EditHaus 
                        haushalt_id={this.state.nextHaus_Id}
                         />, document.getElementById('haus-data'))
  }
  

  render() {
    
    var hauseToRender = [];
    //console.log(this.props.navi)
    if(this.state.searchedHause.length >=1){
      hauseToRender = this.state.searchedHause;
    }else{
      hauseToRender = this.state.haushalte;

    }
    
    
      return (
        <div className='entity-list-scroller-cont' >
          <input
                type="text"
                className='entity-search'              
                placeholder="Haushalte Suche"
                name="s" 
                onChange={(e) => {
                  this.search(e.target.value);
                }}
            />

          <button className='add-button' onClick={this.addHaus}>+</button>  

          <div className='entity-list-scroller'>
              <ul>
              {hauseToRender.map(haus => (
                <Haushalt key={uuidv4()}
                  haushalt_id={haus.haushalt_id}
                  bezeichnung={haus.bezeichnung}
                  strasse={haus.strasse}
                  plz={haus.postleitzahl}
                  ort={haus.ort} 
                  region={haus.region}
                  ort_berlin={haus.ortsteil_berlin}
                  quart_mgmt={haus.quartiersmanagement_gebiet}
                  festnetz={haus.telefon}
                  zusatz={haus.adress_zusatz}
                  land={haus.land}
                  navi={this.props.navi}
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



