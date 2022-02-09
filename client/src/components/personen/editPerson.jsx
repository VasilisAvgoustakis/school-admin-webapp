import React from 'react';
import axios from 'axios';


export class EditPerson extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.editData = this.editData.bind(this);
        this.state = {
            core_data:{
                personId: this.props.person_id,
                rufname: this.props.rufname
            }
        }
    }

    handleChange(e){
        this.setState({core_data:{
            rufname: e.target.value
        }})
        console.log(this.state.core_data.rufname)
    }

    editData(){
        axios.patch(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/editPerson`, {
        params: {
          core_data: this.state.core_data,
        },
      })

    }


    render(){
        return(
            <div>
                <h4>Edit Kerndaten</h4>
                <form onSubmit={this.editData}>
                    <label >Person ID:</label>
                    <input type='text' name='person_id' value={this.state.core_data.personId}readOnly></input>
                    <br></br>
                    <label >Rufname:</label>
                    <input type='text' name='rufname' value={this.state.core_data.rufname} 
                    onChange= {this.handleChange} ></input>
                    <button type="submit">Submit Changes</button>
                </form>
            </div>
        )
    }
}