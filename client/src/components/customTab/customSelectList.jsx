import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {SimpleList} from './simpleList.jsx';
import { Schullerbewegung } from './schullerbewegung.jsx';
import '../stylesheets/globalstyles.css';
import { v4 as uuidv4 } from 'uuid';


export class CustomSelectList extends Component{
  
  constructor(props) {
    super(props);
    // this.fetchData = this.fetchData.bind(this);
    this.target = document.getElementById('custom-data');
    this.handleClick = this.handleClick.bind(this);
    this.search = this.search.bind(this);
    this.state = {
      data: [],
      customQuery: '',
      searchedCustom:''
    };
  }


  search(customName){
    this.setState.searchedCustom = [];
    // console.log(this.state.searchedCustom);
    const results = [];
    this.state.data.forEach(function(x){
      const job_credentials = x.taetigkeit + x.typ;
      if(job_credentials.toLowerCase().includes(customName.toLowerCase()) && customName != '' ){
        results.push(x);
      }
    })
    this.state.searchedCustom = results;
    this.forceUpdate();
  }

  componentDidMount() {
    
    this.setState({customQuery: ''}) 
  }

  componentDidUpdate(){

    switch (this.state.customQuery) {
      case 'sl':
        console.log(this.state.customQuery);
        ReactDOM.render(<SimpleList navi={this.props.navi}/>, document.getElementById("custom-data"));
        break;
      case 'sb':
        console.log(this.state.customQuery);
        ReactDOM.render(<Schullerbewegung />, document.getElementById("custom-data"));
        break;
      default:
        ReactDOM.render(<p>Wähle einer der custom Anfragen von der List Links</p>, 
          document.getElementById("custom-data"));
    }
  }

  handleClick (query){
    this.setState({customQuery: query});
  }

  

  render() {
    var dataToRender = [];
    if(this.state.searchedCustom.length >=1){
      dataToRender = this.state.searchedCustom;
    }else{
      dataToRender = this.state.data;

    }

    
    
      return (
        <div className='entity-list-scroller-cont' >
          <div className='entity-list-scroller'>
              <ul>
                <li onClick={() => this.handleClick('sl')}>
                    Einfache Liste
                </li>
                <li onClick={() => this.handleClick('sb')}>
                    Schüllerbewegung
                </li>
              </ul>
          </div>
          <div className='entity-data-cont'  id='custom-data'>
            Custom Data Container 
          </div>
        </div>

        
     
      );
  }
}



