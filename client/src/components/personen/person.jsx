import React from 'react';
import ReactDOM from 'react-dom'
import '../stylesheets/personen.css'


export class Person extends React.Component{
    constructor(props){
        super(props);
        this.target = document.getElementById('person-data');
        this.handleClick = this.handleClick.bind(this)
        this.state = {
            core_data:{
                personId: this.props.person_id,
                rufname: this.props.rufname,
                nachname: this.props.nachname
            },
            data:{
                test: "test"
            }
        }
    }


    handleClick(){
        console.log(this.state.core_data);
        
        
        ReactDOM.render(
        <div>
            <p>Id: {this.state.core_data.personId}</p>
            <p>Rufname: {this.state.core_data.rufname}</p>
            <p>Nachname: {this.state.core_data.nachname}</p>    
        </div>  
        , document.getElementById('person-data'))
    
    }



    render() {
      return (

        <li key={ this.state.core_data.personId} onClick={this.handleClick} >
             {this.state.core_data.rufname +', ' + this.state.core_data.nachname}
        </li>
        
      )
    }
  }

  