import { SERVER_IP } from '../../globalFunctions';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Anwesenheitsliste } from './anwesenheitsPdf';
import {CSVLink, CSVDownload} from "react-csv";
import '../../stylesheets/globalstyles.css';
import {dateToDEFormat, Sleep} from '../../globalFunctions'
import { v4 as uuidv4 } from 'uuid';
import { useWindowDimensions } from 'react-native';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

//Since the edits that allow the Lerngruppen to be dynamically fetched from the kind_lerngruppe table depending 
// on the selected date, the form only works for dates in 2022 since no other records exist in the kind_lerngruppe table
// inside the current db
export class SimpleList extends React.Component{
    csvLink = React.createRef()

    constructor(props){
        super(props);
        this.today = new Date();
        this.defaultDateValue = this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+ this.today.getDate();
        this.updateGroup = this.updateGroup.bind(this);
        this.updateDate = this.updateDate.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.showData = this.showData.bind(this);
        this.generatePDF = this.generatePDF.bind(this);
        this.generateCSV = this.generateCSV.bind(this);
        this.clickPerson = this.clickPerson.bind(this);
        
        
        this.state = {
            showData: false,
            group:'alle',
            selectedDate: this.defaultDateValue,
            data:[],
            statistik:[],
            csvFilename: '',
            csvData: []
        }

    }

    async fetchData(group, date){
        return (
        await axios.get(`http://${SERVER_IP}:3000/simpleList`, {
            params: {
                group: group,
                date: date,
            },
          }))
      }

    updateGroup(e){
        this.setState({group: e.target.value})
        
    }

    updateDate(e){
        e.target.value ? (
        this.setState({selectedDate: e.target.value}))
        :
        (this.setState({selectedDate: this.defaultDateValue}))
        
    }

    async showData(){
        await this.fetchData(this.state.group, this.state.selectedDate).then(res => {
            this.setState({
              data: res.data
            })
          })

          .then(this.setState({showData: true})).then( () => 
            ReactDOM.render(
            <Anwesenheitsliste 
                id= {'anwesenheitsTable'} 
                selectedDate= {this.state.selectedDate} 
                data= {this.state.data} 
                navi={this.props.navi}
                />, document.getElementById('hiddenTable')


            ))

          
    }

       
    resolveAfter2Seconds() {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve('resolved');
          }, 2000);
        });
      }

    componentDidUpdate(){
        ReactDOM.render(
            '', document.getElementById('hiddenTable')
            );
    }

    async generateCSV() {
        
        let data =[["Rufname", "Jahrgangsstufe", "Lerngruppe"],]

         this.state.data.forEach(line =>{
            let lineArray = []
            lineArray.push(line.Rufname);
            lineArray.push(line.Jahrgangsstufe);
            lineArray.push(line.Lerngruppe);
            data.push(lineArray)
                       
        })
        
        this.setState({csvData: data, csvFilename: `anwesenheitsliste_${this.state.group}_${dateToDEFormat(new Date(this.defaultDateValue))}` + ".csv"})
        await Sleep(1000);
        this.csvLink.current.link.click()   
    }

    generatePDF() {
        
        const doc = new jsPDF('l', 'mm', [297, 210], false);
    
       
        doc.autoTable(
            {html: '#anwesenheitsPDF' ,
            theme: 'grid',
            styles: {
                    margi: 0,
                    horizontalPageBreak: false,
                    pageBrake: 'avoid',
                    border: '1px solid black',
                    borderCollapse: 'collapse',
                    cellPadding: 0.1,
                    valign: 'top',
                    halign: 'center', 
                    fontStyle: 'bold',
                    fontSize: 6,
                    cellWidth: 'auto',
                    overflowColumns: 'visible',
                    overflow: 'visible',
                    
                    },
            columnStyles: {
                 0: { halign: 'center', fontStyle: 'bold'  }
            },

            // createdCell: function(data) {
            //     data.cell.styles.cellPadding = 50;
            //   },


            didParseCell: function (data) {

                if(parseInt(data.cell.raw.abbr, 10) % 2 == 0 ){
                    //console.log(data.cell.raw)
                    data.cell.styles.fillColor = [220, 220, 220];
                } 
                
                if( data.cell.raw.accessKey == 0 || data.cell.raw.accessKey == 6 ){
                     data.cell.styles.fillColor = [20, 20, 20];
                 }
             }

            }
        )

        var string = doc.output('datauristring');
        var embed = "<embed width='100%' height='100%' src='" + string + "'/>"
        var x = window.open();
        x.document.open();
        x.document.write(embed);
        x.document.close();
    }

    clickPerson(e){
        this.props.navi('Personen')
        let target = e.target.id
        //console.log(this.state.data[target])
        document.getElementById(this.state.data[target].person_id).click();
    }

    render(){
        //console.log(this.state.data)
        return(
            <div className='simple-list-cont'>
                <div>
                    <label htmlFor="group">Selektiere eine group:</label>
                    <select name='group' id='group' onChange={this.updateGroup}>
                        <option value='alle'>Alle Schüller</option>
                        <optgroup label= 'Lerngruppen'>
                            <option value='unten'>Unten</option>
                            <option value='oben'>Oben</option>
                            <option value='1/2'>1/2</option>
                            <option value='3/4'>3/4</option>
                            <option value='5/6'>5/6</option>
                        </optgroup>
                        <optgroup label='Klassen'>
                            <option value='1'>1. Klasse</option>
                            <option value='2'>2. Klasse</option>
                            <option value='3'>3. Klasse</option>
                            <option value='4'>4. Klasse</option>
                            <option value='5'>5. Klasse</option>
                            <option value='6'>6. Klasse</option>
                        </optgroup>
                    </select>
                    <label htmlFor="sl-date">Selektiere eine Zeitpunkt:</label>
                    <input type="date" id="sl-date" name="sl-date"
                        defaultValue={this.defaultDateValue}
                        min="2012-01-01" onChange={this.updateDate}></input>
                    <button onClick={this.showData}>Abrufen</button>    
                </div>
                <div>
                    {this.state.showData ? (
                    <div>
                    <button onClick={this.generatePDF}>Anwesenheitsliste Generieren</button>
                    <button onClick={this.generateCSV}>Generierte Liste als CSV exportieren</button>
                    <CSVLink 
                        data={this.state.csvData} 
                        filename= {this.state.csvFilename}
                        className="hidden"
                        ref={this.csvLink}
                        target="_blank"
                        hidden
                        >Download me</CSVLink>
                    <table >
                        <thead>
                            <tr>
                                <th colSpan="4">Liste nach Ausgewählte Kriterien</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((student) => {
                                const { Rufname, Jahrgangsstufe, Lerngruppe} = student
                                let studentIndex = this.state.data.indexOf(student).toString()
                                //console.log(studentIndex)
                                return (
                                    <tr key={uuidv4+Rufname} 
                                    id = {studentIndex}
                                    className="clickable-list-item"
                                    onClick={this.clickPerson} 
                                    >
                                        <td style={{width:'05%'}} id = {studentIndex}>{Number(studentIndex) + 1}</td>
                                        <td style={{width:'10%'}} id = {studentIndex}>{Rufname}</td>
                                        <td id = {studentIndex}>{Jahrgangsstufe}</td>
                                        <td id = {studentIndex}>{Lerngruppe}</td>
                            
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    
                </div>
                    ) :
                    ('')}
                </div>
                <div id='hiddenTable' style={{display:'none'}}></div>
                {/* <div>
                    <table>
                        <thead>
                            <tr>
                                <th colSpan= '6'><strong>Lerngruppe Statistik</strong></th>
                            </tr>
                            <tr>
                                <th colSpan= '2'><strong>Schüller insgesamt</strong></th>
                                <th colSpan= '2'><strong>nicht DE herkunftssprache</strong></th>
                                <th colSpan= '2'><strong>davon Ausländer</strong></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Männlich</strong></td>
                                <td><strong>Weiblich</strong></td>
                                <td><strong>Männlich</strong></td>
                                <td><strong>Weiblich</strong></td>
                                <td><strong>Männlich</strong></td>
                                <td><strong>Weiblich</strong></td>
                            </tr>
                            <tr>
                                <td>{this.state.statistik[0]}</td>
                                <td>{this.state.statistik[1]}</td>
                                <td>{this.state.statistik[2]}</td>
                                <td>{this.state.statistik[3]}</td>
                            </tr>
                        </tbody>
                    </table>
                </div> */}
            </div>
        )}
}

