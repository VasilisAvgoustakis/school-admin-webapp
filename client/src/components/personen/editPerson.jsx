import React from 'react';
import axios from 'axios';


export class EditPerson extends React.Component{
    constructor(props){
        super(props);
        this.updateQuery = this.updateQuery.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.editData = this.editData.bind(this);
        
        this.state = {
            personId: this.props.person_id,
            rufname: this.props.rufname
        }
    }

    handleChange(e){
        this.setState({
            rufname: e.target.value
        })
        console.log(this.state.rufname)
    }

    async updateQuery(){
        var stateObj = this.state;
        var dataArr = Object.values(stateObj);
        console.log(dataArr)
        return(
        await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/editPerson`, {
           params: {
               state: dataArr
           } 
      })
       )
    }

    editData(){
        var confirm = window.confirm('Diese Aktion wird die Daten direkt in der Datenbank bearbeiten!!! Bist du sicher dass diese Korrekt sind?')
        if(confirm){
        this.updateQuery().then(result=>{
            console.log(result)
        }).catch(err =>{console.error(err)})
    }
    }

   


    render(){
        //console.log(this.state)
        return(
            <div>
                <h4>Edit Kerndaten</h4>
                <form >
                    <label >Person ID:</label>
                    <input type='text' name='person_id' value={this.state.personId}readOnly></input>
                    <br></br>
                    <label >Rufname:</label>
                    <input type='text' name='rufname' value={this.state.rufname} 
                    onChange= {this.handleChange} ></input>
                    <br></br>
                    <button type='button' onClick={this.editData}>Speichern</button>
                </form>
            </div>
        )
    }
}