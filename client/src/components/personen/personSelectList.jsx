import React, {Component} from 'react';
import axios,{setPost} from 'axios';
import {Person} from './person';
import '../stylesheets/personen.css';
import '../stylesheets/globalstyles.css';
import {Link, DirectLink, Element, Events, animateScroll as scroll,  scrollSpy, scroller} from 'react-scroll';


// async function callDatabase(table){
//   return (
//   await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/personsList`, {
//       params: {
//         table: table,
//       },
//     }))

// }


export class PersonSelectList extends Component{
  
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.search = this.search.bind(this);
    this.state = {
      persons: [],
      searchedPersons: []
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
  

  search(name){
    this.setState.searchedPersons = [];
    // console.log(this.state.searchedPersons);
    const results = [];
    this.state.persons.forEach(function(person){
      const person_name_credentials = person.rufname + ' '+ person.amtlicher_vorname + person.nachname;
      if(person_name_credentials.includes(name) && name != '' ){
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
    });
  }
  

  render() {
    var personsToRender = [];
    //console.log(personsToRender)
    if(this.state.searchedPersons.length >=1){
      personsToRender = this.state.searchedPersons;
    }else{
      personsToRender = this.state.persons;

    }
    //console.log(personsToRender);
    
    
      return (
        <div className='scroller-cont' >
          <input
                type="text"
                className='person-search'              
                // id="header-search"
                placeholder="Personen Suche"
                name="s" 
                onChange={(e) => {
                  this.search(e.target.value);
                }}
            />
          <div className='person-scroller'>
              <ul id='person-list'  >
              {personsToRender.map(person => (
                <Person key={person.person_id}
                  person_id={person.person_id}
                  rufname={person.rufname}
                  amtlicher_vorname={person.amtlicher_vorname}
                  nachname={person.nachname} 
                  geburtsdatum={person.geburtsdatum}
                  einschulungsdatum={person.einschulungsdatum}
                />
              ))}
              </ul>
          </div>
          <div className='person-data-cont'  id='person-data'>
            Person Data Container in personen_parent
          </div>
        </div>

        
     
      );
  }
}



