import { SERVER_IP } from '../../globalFunctions';
import React, {Component} from 'react';
import axios from 'axios';
import {Job} from './job.jsx';
import '../../stylesheets/globalstyles.css';
import { v4 as uuidv4 } from 'uuid';


export class JobSelectList extends Component{
  
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.search = this.search.bind(this);
    this.filter = this.filter.bind(this);
    this.state = {
      filter: 'job',
      jobsToList: ['Lehrkraefte mit Unterrichtsbefaehigung',
            'Lehrkraefte ohne Unterrichtsbefaehigung',
            'Sonstige Lehrkraft',
            'Paedagogische Fachkraefte eFoeB',
            'Sonstige paedagogische Kraft Ganztag',
            'Verwaltungskraft',
            'Kuechenkraft',
            'Kuechenhilfe',
            'Reinigungskraft',
            'Hausmeister*in',
            'Schulhilfe'],
      typesToList: [
        'Freiwilligendienst',
        'Ehrenamt',
        'Praktikum',
        'Honorartaetigkeit',
        'extern',
        'Kollektiv',
        'Arbeitsverhaeltniss'
      ],
      jobs: [],
      types: [],
      searchedJobs: []
    };
  }


  fetchData(table, column){
    return (
    axios.get(`http://${SERVER_IP}:3000/jobsList`, {
        params: {
          table: table,
          column: column
        },
      }))
  }
  

  search(jobName){
    this.setState.searchedJobs = [];
    
    const results = [];
    this.state.jobsToList.forEach(function(job){
      const job_credentials = job.taetigkeit + job.typ;
      if(job_credentials.toLowerCase().includes(jobName.toLowerCase()) && jobName != '' ){
        results.push(job);
      }
    })
    this.state.searchedJobs = results;
    this.forceUpdate();
  }

  filter(e) {
    sessionStorage.setItem("filter", e.target.value)
    
    this.setState({filter: e.target.value})
  }

  componentDidMount() {
    this.fetchData('taetigkeit', 'taetigkeit' ).then(res => {
      
      this.setState({
        jobs: res.data
      })
      this.setState.searchedJobs = [];
    });

    this.fetchData('taetigkeit', 'typ' ).then(res => {
      
      this.setState({
        types: res.data
      })
      this.setState.searchedJobs = [];
    });


  }
  

  render() {
    var jobsToRender = [];
    //console.log(this.state.haushalte)
    if(this.state.searchedJobs.length >=1){
      jobsToRender = this.state.searchedJobs;
    }else if(this.state.filter === 'job'){
      jobsToRender = this.state.jobs;
    }else{
      jobsToRender = this.state.types;
    }


    //console.log(jobsToRender)
    
    
    
    
      return (
        <div className='entity-list-scroller-cont' >
          {/* <input
                type="text"
                className='entity-search'              
                // id="header-search"
                placeholder="Tätigkeit Suche"
                name="s" 
                onChange={(e) => {
                  this.search(e.target.value);
                }}
            /> */}
          <div className='entity-list-scroller'>
              
          
          <button type='button' value='job' onClick={this.filter}>Tätigkeiten</button>
          <button type='button' value='typ' id="job_typ_btn" onClick={this.filter}>Typen</button>
          

              <ul>

              {this.state.filter == 'job' ? (this.state.jobsToList.map(job => (
                <Job key={uuidv4()}
                  name={job}
                  taetigkeit={this.state.filter == 'job' ?  (job):(null)}
                  typ={this.state.filter == 'typ' ? (job):(null)}
                  filter={this.state.filter}
                  navi={this.props.navi}
                />
              ))):
              (this.state.typesToList.map(job => (
                <Job key={uuidv4()}
                  name={job}
                  taetigkeit={this.state.filter == 'job' ?  (job):(null)}
                  typ={this.state.filter == 'typ' ? (job):(null)}
                  filter={this.state.filter}
                  navi={this.props.navi}
                />
              )))
              
              
              }
              </ul>
          </div>
          <div className='entity-data-cont'  id='job-data'>
            <p className='info-text'>Job Data Container </p>
          </div>
        </div>
      );
  }
}



