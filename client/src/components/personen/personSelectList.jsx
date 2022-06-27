import { SERVER_IP } from '../../globalFunctions';
import React, {Component} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom'
import {Person} from './person';
import { Sleep } from '../../globalFunctions';
import '../../stylesheets/personen.css';
import '../../stylesheets/globalstyles.css';
import { v4 as uuidv4 } from 'uuid';
import { EditPerson } from './editPerson';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'


export class PersonSelectList extends Component{
  
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.getLastPersonsId = this.getLastPersonsId.bind(this);
    this.search = this.search.bind(this);
    // this.updateStateAfterEdit = this.updateStateAfterEdit.bind(this);
    this.addPerson = this.addPerson.bind(this);
    this.state = {
      forceRemount:'',
      persons: [],
      searchedPersons: [],
      nextPerson_Id:''
    };
  }


  fetchData(table){
    return (
    axios.get(`http://${SERVER_IP}:3000/personsList`, {
        params: {
          table: table,
        },
      }))
  }

  getLastPersonsId(){
    return (
    axios.get(`http://${SERVER_IP}:3000/lastPersonsId`, {
      })).then(res=>{
        this.setState({nextPerson_Id: res.data[0].id + 1})
        //console.log(this.state.nextPerson_Id)
      })
  }

  addPerson(){
    ReactDOM.render(<EditPerson 
                        person_id={this.state.nextPerson_Id}
                         />, document.getElementById('person-data'))
  }

  search(name){
    this.setState.searchedPersons = [];
    sessionStorage.setItem("lastLocation", '');
    sessionStorage.setItem("lastId", '');

    const results = [];
    this.state.persons.forEach(function(person){
      const person_name_credentials = person.person_id + person.rufname + ' '+ person.amtlicher_vorname + person.nachname;
    
      if(person_name_credentials.toLowerCase().includes(name.toLowerCase()) && name != '' ){
        results.push(person);
      }
    })
    
    this.state.searchedPersons = results;
    
  
    this.forceUpdate();
  }

  componentDidMount() {
    

    this.fetchData('personen').then(res => {
      
      this.setState({
        persons: res.data
      })

      this.setState.searchedPersons = [];
    }).then(this.getLastPersonsId())

  }

  componentDidUpdate() {
    Sleep(500).then(()=>{
      var lastLoc = sessionStorage.getItem("lastLocation");
      var lastId = sessionStorage.getItem("lastId");
      var filter = sessionStorage.getItem("filter");

      if (filter == "typ" && lastLoc){
        this.props.navi(lastLoc);
        if(document.getElementById("job_typ_btn"))document.getElementById("job_typ_btn").click()
        
      }
    

      if(lastLoc && lastId){
        
        this.props.navi(lastLoc);
        
        var toClick = document.getElementById(lastId);
        console.log(toClick)
        
      if(toClick) {
        console.log("I am about to click!")
        // Sleep(250).then((resolve)=>{
          toClick.click()
          console.log("Clicked")
        
        
      }
        
        else console.log(toClick);
    }
      })
    

  }


  render() {
    var personsToRender = [];
    //console.log(personsToRender)
    if(this.state.searchedPersons.length >=1){
      personsToRender = this.state.searchedPersons;
    }else{
      personsToRender = this.state.persons;

    }
    
    
    
      return (
        <div className='entity-list-scroller-cont' >
        {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>           */}
        <input
                type="text"
                className='entity-search'              
                // id="header-search"
                placeholder="Personen Suche"
                name="s" 
                onChange={(e) => {
                  this.search(e.target.value);
                }}
            />

          <button className='add-button' onClick={this.addPerson}><FontAwesomeIcon icon={faPlus}/></button>

          <div className='entity-list-scroller'>
              <ul id='person-list'  >
              {personsToRender.map(person => (
                <Person key={uuidv4()}
                  handler= {this.updateStateAfterEdit}
                  person_id={person.person_id}
                  rufname={person.rufname}
                  amtlicher_vorname={person.amtlicher_vorname}
                  nachname={person.nachname} 
                  geburtsdatum={person.geburtsdatum}
                  einschulungsdatum={person.einschulungsdatum}
                  nicht_auf_listen={person.nicht_auf_listen}
                  navi={this.props.navi}
                />
              ))}
              </ul>
          </div>
          <div className='entity-data-cont'  id='person-data'>
            <p className='info-text' >
              Klicke auf eine Person aus der Liste links um ihre Daten anzusehen!
            </p>
          </div>
        </div>

        
     
      );
  }
}



