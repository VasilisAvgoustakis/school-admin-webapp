import React, {Component} from 'react';
import axios,{setPost} from 'axios';
import {Person} from './person';
import styles from '../stylesheets/personen.css';
import {Link, DirectLink, Element, Events, animateScroll as scroll,  scrollSpy, scroller} from 'react-scroll';


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
    //this.clickedPerson = this.clickedPerson.bind(this,);
    this.scrollToTop = this.scrollToTop.bind(this);
    this.state = {
      persons: []
    };
  }

  componentDidMount() {
    callDatabase('personen').then(res => {
      
      this.setState({
        persons: res.data
      })
      console.log(this.state.persons);
    });
  }

  // clickedPerson(data){
    
  //   //console.log(data);
  // }

  scrollToTop() {
    scroll.scrollToTop();
  }
  scrollTo() {
    scroller.scrollTo('scroll-to-element', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    })
  }
  scrollToWithContainer() {

    let goToContainer = new Promise((resolve, reject) => {

      Events.scrollEvent.register('end', () => {
        resolve();
        Events.scrollEvent.remove('end');
      });

      scroller.scrollTo('scroll-container', {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart'
      });

    });

    goToContainer.then(() =>
      scroller.scrollTo('scroll-container-second-element', {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart',
        containerId: 'scroll-container'
      }));
  }
  componentWillUnmount() {
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }

  render() {
    
    
      return (
        <div  >
          <input></input>
          <button>Suchen</button>
          <ul className='person-scroller' >
          {this.state.persons.map(person => (
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



