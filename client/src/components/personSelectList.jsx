import React, {useState, Redirect, Route} from 'react';
import axios,{setPost} from 'axios';


async function callDatabase(table){
  return (
  await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/test`, {
      params: {
        table: table,
      },
    }).then(console.log(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/test`) ))

}

export class Person extends React.Component{
  render() {
    let rufname = this.props.rufname; 
    return (
      <div>
        <h3>{rufname}</h3>
      </div>
    )
  }
}

export class PersonSelectList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      persons: []
    };
  }

  componentDidMount() {
    callDatabase('personen').then(async res => {
      
      this.setState({
        persons: res.data
      })
    });
  }

  render() {
    
    let persons = this.state.persons.map(person => {
      return (
      <Person
        rufname={person.rufname}
      />
      )
    })
    return (
      <div>
        {persons}
      </div>
    )
  }
}



