import React, {Component} from 'react';
import axios,{setPost} from 'axios';
import {Person} from './person';
import styles from '../stylesheets/personen.css';
import {Link, DirectLink, Element, Events, animateScroll as scroll,  scrollSpy, scroller} from 'react-scroll';
import SearchPerson from './search_person';

async function callDatabase(table){
  return (
  await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/personsList`, {
      params: {
        table: table,
      },
    }))//.then(console.log(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/personsList`) ))

}


export class PersonSelectList extends Component{
  
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.state = {
      persons: [],
      find:'',
      searchedPersons: []
    };
  }
  
  search(){
    const name = this.state.find;
    const results = [];
    this.state.persons.forEach(function(person){
      const person_name_credentials = person.rufname + person.nachname;
      if(person_name_credentials.includes(name) && name != '' ){
        results.push(person);
      }
    })
    
    this.state.searchedPersons = results;
    
    //console.log(this.state.searchedPersons);
    this.forceUpdate();
  }

  componentDidMount() {
    callDatabase('personen').then(res => {
      
      this.setState({
        persons: res.data
      })
      
      this.setState.searchedPersons = [];
      //console.log(this.state.searchedPersons);
    });
  }
  

  render() {
    
    this.setState.searchedPersons = [];
    //console.log(this.state.searchedPersons);
    var personsToRender = [];
    
    if(this.state.searchedPersons.length >=1){
      console.log("true");
      personsToRender = this.state.searchedPersons;
      //console.log(this.state.searchedPersons);
      //console.log(personsToRender);
    }else{
      personsToRender = this.state.persons;

    }
    console.log(personsToRender);
    
    
      return (
        <div  >
          <form action="/" method="get">
            <label htmlFor="header-search">
                <span className="visually-hidden"></span>
            </label>
            <input
                type="text"
                id="header-search"
                placeholder="Personen Suche"
                name="s" 
                onChange={(e) => {
                  this.setState({find: e.target.value });
                  
                }}
            />
            <button type='button' onClick={this.search}>Suchen</button>
        </form>

          <ul id='person-list' className='person-scroller' >
          {personsToRender.map(person => (
            <Person
              person_id={person.person_id}
              rufname={person.rufname}
              nachname={person.nachname} 
            />
          ))}
          </ul>
        </div>
     
      );
  }
}



