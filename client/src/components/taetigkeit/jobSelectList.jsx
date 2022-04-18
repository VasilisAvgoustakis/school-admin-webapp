import React, {Component} from 'react';
import axios from 'axios';
import {Job} from './job.jsx';
import '../stylesheets/globalstyles.css';
import { v4 as uuidv4 } from 'uuid';


export class JobSelectList extends Component{
  
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.search = this.search.bind(this);
    this.filter = this.filter.bind(this);
    this.state = {
      filter: 'job',
      jobs: [],
      types: [],
      searchedJobs: []
    };
  }


  fetchData(table, column){
    return (
    axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/jobsList`, {
        params: {
          table: table,
          column: column
        },
      }))
  }
  

  search(jobName){
    this.setState.searchedJobs = [];
    // console.log(this.state.searchedJobs);
    const results = [];
    this.state.jobs.forEach(function(job){
      const job_credentials = job.taetigkeit + job.typ;
      if(job_credentials.toLowerCase().includes(jobName.toLowerCase()) && jobName != '' ){
        results.push(job);
      }
    })
    this.state.searchedJobs = results;
    this.forceUpdate();
  }

  filter(e) {
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
    // console.log(this.state.haushalte)
    if(this.state.searchedJobs.length >=1){
      jobsToRender = this.state.searchedJobs;
    }else if(this.state.filter === 'job'){
      jobsToRender = this.state.jobs;
    }else{
      jobsToRender = this.state.types;
    }

    console.log(jobsToRender)
    
    
    
    
      return (
        <div className='entity-list-scroller-cont' >
          <input
                type="text"
                className='entity-search'              
                // id="header-search"
                placeholder="Tätigkeit Suche"
                name="s" 
                onChange={(e) => {
                  this.search(e.target.value);
                }}
            />
          <div className='entity-list-scroller'>
              
          
          <button type='button' value='job' onClick={this.filter}>Tätigkeiten</button>
          <button type='button' value='typ' onClick={this.filter}>Typen</button>
          

              <ul>
              {jobsToRender.map(job => (
                <Job key={uuidv4()}
                  taetigkeit={job.taetigkeit}
                  typ={job.typ}
                />
              ))}
              </ul>
          </div>
          <div className='entity-data-cont'  id='job-data'>
            Job Data Container 
          </div>
        </div>

        
     
      );
  }
}



