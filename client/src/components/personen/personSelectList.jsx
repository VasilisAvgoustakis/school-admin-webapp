import React, {Component} from 'react';
import axios,{setPost} from 'axios';
import styles from '../stylesheets/listItems.css';


async function callDatabase(table){
  return (
  await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/personsList`, {
      params: {
        table: table,
      },
    }).then(console.log(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/personsList`) ))

}

export class Person extends React.Component{
  render() {
    let rufname = this.props.rufname;
    let nachname = this.props.nachname; 
    return (
      <div>
        <h3>{rufname +', ' + nachname}</h3>
      </div>
    )
  }
}

export class PersonSelectList extends Component{
  constructor(props) {
    super(props);
    this.state = {
      persons: []
    };
  }

  componentDidMount() {
    callDatabase('personen').then(async res => {
      console.log(res);
      this.setState({
        persons: res.data
      })
    });
  }

  render() {
    
    
      return (
      
        <ul className='personenSelect'>
        {this.state.persons.map(person => (
          <li key={ person.rufname + person.nachname }>
            <Person
            rufname={person.rufname}
            nachname={person.nachname}
            />
          </li>
        ))}
        </ul>
     
      );
    // return (
    //   <div>
    //     {persons}
    //   </div>
    // )
  }
}



