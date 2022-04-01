import React, {Component} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom'
import {Person} from './person';
import { Sleep } from '../../globalFunctions';
import '../stylesheets/personen.css';
import '../stylesheets/globalstyles.css';
import { v4 as uuidv4 } from 'uuid';
import { EditPerson } from './editPerson';


export class PersonSelectList extends Component{
  
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.getLastPersonsId = this.getLastPersonsId.bind(this);
    this.search = this.search.bind(this);
    this.updateStateAfterEdit = this.updateStateAfterEdit.bind(this);
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
    axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/personsList`, {
        params: {
          table: table,
        },
      }))
  }

  getLastPersonsId(){
    return (
    axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/lastPersonsId`, {
      })).then(res=>{
        this.setState({nextPerson_Id: res.data[0].id + 1})
        console.log(this.state.nextPerson_Id)
      })
  }

  addPerson(){
    ReactDOM.render(<EditPerson 
                        person_id={this.state.nextPerson_Id}
                         />, document.getElementById('person-data'))
  }

  search(name){
    this.setState.searchedPersons = [];
    // console.log(this.state.searchedPersons);
    const results = [];
    this.state.persons.forEach(function(person){
      const person_name_credentials = person.person_id + person.rufname + ' '+ person.amtlicher_vorname + person.nachname;
      // if(person_name_credentials.includes(name) && name != '' ){
      //   results.push(person);
      // }
      if(person_name_credentials.toLowerCase().includes(name.toLowerCase()) && name != '' ){
        results.push(person);
      }
    })
    
    this.state.searchedPersons = results;
    
    // console.log(this.state.searchedPersons);
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

  updateStateAfterEdit(){
    this.setState({forceRemount: ''})
    this.setState({forceRemount: 'remount now'})
    //console.log("forcing")
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

          <button className='add-button' onClick={this.addPerson}>+</button>

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
              Klicke auf eine Person von der Liste links um seine/ihre Daten anzusehen!</p>
          </div>
        </div>

        
     
      );
  }
}



