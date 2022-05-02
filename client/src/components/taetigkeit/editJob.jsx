import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import '../stylesheets/globalstyles.css'
import '../stylesheets/edits.css';
import {dateToDEFormat, dateToENFormat} from '../../globalFunctions'
import { TouchableNativeFeedbackBase } from 'react-native';
import { v4 as uuidv4 } from 'uuid';



export class EditJob extends React.Component{
    constructor(props){
        super(props);
        this.today = new Date();
        this.defaultDateValue = this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+ this.today.getDate();
        this.handleChange = this.handleChange.bind(this);
        this.updateQuery = this.updateQuery.bind(this);
        this.deleteQueryJob = this.deleteQueryJob.bind(this);
        this.editData = this.editData.bind(this);
        this.deleteJobData = this.deleteJobData.bind(this);
        this.fetchProbable = this.fetchProbable.bind(this);
        // this.fetchJobDataMultitable = this.fetchJobDataMultitable.bind(this);

        
        this.state = {
            //Kerndaten
            // person_id: this.props.person_id ? (this.props.person_id):(''),
            taetigkeit_beginn: this.props.taetigkeit_beginn ? (this.props.taetigkeit_beginn):(''),
            taetigkeit_ende: this.props.taetigkeit_ende ? (this.props.taetigkeit_ende):(''),
            typ: this.props.typ ? (this.props.typ):(''),
            taetigkeit: this.props.taetigkeit ? (this.props.taetigkeit):(''),

            //Mitglieder
            mitgliedToBeAdded: '',
            probableMitglieder: [],
            eintrittsdatum: this.defaultDateValue,
            mitgliedToBeDeleted: '',
            mitglieder: this.props.mitglieder,
        
        }
    }

    handleChange(e){
        if((e.target.id).includes('datum')){
            this.setState({ [e.target.id]: e.target.value})
        }else{
            this.setState({ [e.target.id]: e.target.value })
        }
        console.log(e.target.id + ":" + e.target.value)
    }

    async updateQuery(){
        var stateObj = this.state;
        var dataArr = Object.values(stateObj);
        //console.log(dataArr)
        return(
        await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/editJob`, {
           params: {
               state: dataArr
           } 
      })
       )
    }

    async fetchProbable(queryName){
        return (
        await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/${queryName}`, {
            
            }))
    }

    //general query to fetch mitglieds of given table to populate options in selects
    // async fetchJobDataMultitable(){
    //     return (
    //     await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/dataMultitableJob`, {
    //         params: {
    //             person_id: this.state.person_id,
    //             },
    //         }))
    // }

    //deletes all mitglieds from a table with the given id
    async deleteQueryJob(table){
        //console.log(table)
        return(
        await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/deleteJobData`, {
           params: {
               table: table,
               person_id: this.state.person_id
           } 
      })
       )
    }

    // edits DB for changed data in the form
    editData(){
        // console.log(this.state)
        //input validation
        let validationSuccess = false;
        //get all invalid inputs
        let invalidInputFields = document.querySelectorAll(':invalid');
        

        if(invalidInputFields.length > 0){
            window.alert('Bitte kontrollieren Sie alle rot gekennzeichnete Input Felder und versuchen Sie es erneut!')
        }else if(invalidInputFields.length === 0) validationSuccess = true;

        if(validationSuccess){
            var confirm = window.confirm('Diese Aktion wird die Daten direkt in der Datenbank bearbeiten!!! Bist du sicher dass diese Korrekt sind?')
            if(confirm){
            this.updateQuery().then(res =>{
                if(typeof(res.data) == 'string'){
                    console.log(res.data)
                    window.alert(res.data);
                }else{
                    confirm = false;
                    if(!confirm)window.location.reload();
                }
            }).catch(err =>{console.log(err)})
            }
        }
    }

    // delete general Job Data by given table
    deleteJobData(e){
        //console.log(e.target.id)
        let table = e.target.id;
        console.log(table);

        var confirm = window.confirm(
                    `ACHTUNG!!! Diese Aktion wird ${table === 'taetigkeit' ? 
                    ('dieser Tätigkeit und alle seine Daten von allen Tabellen komplett vom DB')
                    :("alle " + table + " Einträge dieser Tätigkeit")} löschen!`
            )
        
        if(confirm){
            this.deleteQueryJob(table)
            .then(result=>{
                console.log("confirm")
                confirm = false;
                //last delete query refreshes the page
                if(!confirm)window.location.reload()
                console.log(result)
            });
    }
    }

    componentDidMount() {
        this.fetchProbable('personsList').then(res => {
          
            let probMitglieder = [];
            res.data.forEach(person => {
                //console.log(person.rufname)
                probMitglieder.push(
                    Object.create({person_id:person.person_id, rufname:person.rufname, nachname:person.nachname})) 
            });
            this.setState({
              probableMitglieder: probMitglieder
            })
          });

    //     this.fetchJobDataMultitable().then(res => {
    
    //     let mitglieder = [];
    //     res.data.forEach(person => {
    //         mitglieder.push(
    //             Object.create({ 
    //                         person_id: person.person_id,
    //                         rufname: person.rufname,
    //                         nachname: person.nachname
    //                         }))
            
    //     });
    //     this.setState({
    //         mitglieder: mitglieder
    //     })
    // }
    // );
    }


    render(){
        console.log(this.state)
        return(
     <div>
        <div>
            <button type='button' onClick={this.editData}>Speichern</button>
            <div className='edit-person-cont'>
                {/* allgemeine LG Daten */}
                <div className='bg-cont' style={({backgroundColor: "#74a3ed"})}>
                    <h3 style={({textAlign: "center"})}>Daten</h3>
                    {/* Tätigkeit */}
                    <div className='edit-person-data-cont'>
                            <h4>{this.props.taetigkeit ? ("Tätigkeit"):("Typ")}</h4>
                                <label>Neue Person für diese Tätigkeit hinzufügen: </label>
                                <select id='mitgliedToBeAdded' onChange= {this.handleChange} value={this.state.mitgliedToBeAdded}>
                                    <option defaultValue value=''>-</option>

                                    {this.state.probableMitglieder.map((mitglied) => 
                                    <option key={uuidv4()} value={mitglied.person_id}>{mitglied.rufname +  " " + mitglied.nachname}</option>)}  
                                </select>

                                <label>Beginn: </label>
                                <input type="date" id="taetigkeit_beginn" name="sl-date"
                                    defaultValue={this.defaultDateValue}
                                    min={
                                        this.state.einschulungsdatum ? 
                                        (dateToENFormat(new Date(this.state.einschulungsdatum))):('')    
                                    } 
                                    onChange={this.handleChange}></input>
                                <br></br>

                                <label>Ende: </label>
                                <input type="date" id="taetigkeit_ende" name="sl-date"
                                    defaultValue={this.defaultDateValue}
                                    min={
                                        this.state.but_beginn ? 
                                        (dateToENFormat(new Date(this.state.but_beginn))):('')    
                                    } 
                                    onChange={this.handleChange}></input>
                                <br></br>

                                
                                <label>Typ: </label>
                                <select id='typ' 
                                onChange= {this.handleChange}
                                defaultValue= {this.state.typ}
                                disabled={this.state.typ ? (true):(false)} >
                                    <option defaultValue value=''>-</option> {/*default option when no data from database for selected person*/}
                                    <option value='Freiwilligendienst'>Freiwilligendienst</option>
                                    <option value='Ehrenamt'>Ehrenamt</option>
                                    <option value='Praktikum'>Praktikum</option>
                                    <option value='Honorartaetigkeit'>Honorartaetigkeit</option>
                                    <option value='extern'>extern</option>
                                    <option value='Kollektiv'>Kollektiv</option>
                                    <option value='Arbeitsverhaeltniss'>Arbeitsverhaeltniss</option>
                                </select>
                                <br></br>
                                
                                <label>Tätigkeit: </label>
                                <select id='taetigkeit' 
                                onChange= {this.handleChange}
                                defaultValue={this.state.taetigkeit}
                                disabled={this.state.taetigkeit ? (true):(false)} >
                                    <option defaultValue value=''>-</option> 
                                    <option value='Lehrkraefte mit Unterrichtsbefaehigung'>Lehrkräfte mit Unterrichtsbefähigung</option>
                                    <option value='Lehrkraefte ohne Unterrichtsbefaehigung'>Lehrkräfte ohne Unterrichtsbefähigung</option>
                                    <option value='Sonstige Lehrkraft'>Sonstige Lehrkraft</option>
                                    <option value='Paedagogische Fachkraefte eFoeB'>Pädagogische Fachkräfte eFoeB</option>
                                    <option value='Sonstige paedagogische Kraft Ganztag'>Sonstige pädagogische Kraft Ganztag</option>
                                    <option value='Verwaltungskraft'>Verwaltungskraft</option>
                                    <option value='Kuechenkraft'>Küchenkraft</option>
                                    <option value='Kuechenhilfe'>Küchenhilfe</option>
                                    <option value='Reinigungskraft'>Reinigungskraft</option>
                                    <option value='Hausmeister*in'>Hausmeister*in</option>
                                    <option value='Schulhilfe'>Schulhilfe</option>
                                </select>
                                <br></br>

                                <div className='delete-section'>      
                                    <label>Existierende Person entfernen: </label>
                                    <select id='mitgliedToBeDeleted' onChange= {this.handleChange} value={this.state.mitgliedToBeDeleted}>
                                        <option defaultValue >-</option>

                                        {this.state.mitglieder.map((mitglied) => 
                                        <option key={uuidv4()} value={mitglied.person_id}>
                                            {mitglied.rufname + ' ' + mitglied.nachname + ' ' + 
                                            "Beginn: "+ dateToDEFormat(new Date(mitglied.taetigkeit_beginn)) 
                                            + " Ende: " + dateToDEFormat(new Date(mitglied.taetigkeit_ende))
                                            }
                                             </option>)}
                                        
                                    </select>
                                    <br></br>

                                    <label>Oder: </label>                                                   
                                    <button 
                                        className='delete-buttons' 
                                        id='kind_but' type='button'
                                        onClick={this.deleteJobData}
                                    >Alle Mitglieder löschen</button>
                                </div>  
                    </div>
                </div>


            </div>
           
        </div>
     </div>
        )
    }
}


