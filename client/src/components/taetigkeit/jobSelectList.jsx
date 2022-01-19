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
    this.state = {
      jobs: [],
      searchedJobs: []
    };
  }


  fetchData(table){
    return (
    axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/jobsList`, {
        params: {
          table: table,
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

  componentDidMount() {
    this.fetchData('taetigkeit').then(res => {
      
      this.setState({
        jobs: res.data
      })
      this.setState.searchedJobs = [];
    });
  }
  

  render() {
    var jobsToRender = [];
    // console.log(this.state.haushalte)
    if(this.state.searchedJobs.length >=1){
      jobsToRender = this.state.searchedJobs;
    }else{
      jobsToRender = this.state.jobs;

    }
    console.log(jobsToRender);
    
    
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
              <ul>
              {jobsToRender.map(job => (
                <Job key={uuidv4()}
                  taetigkeit={job.taetigkeit}
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



