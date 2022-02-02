import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Anwesenheitsliste } from './anwesenheitsPdf';
import '../stylesheets/globalstyles.css';
import dateToDEFormat from '../../globalFunctions'
import { v4 as uuidv4 } from 'uuid';
import { useWindowDimensions } from 'react-native';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';


export class SimpleList extends React.Component{
    constructor(props){
        super(props);
        this.today = new Date();
        this.defaultDateValue = this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+ this.today.getDate();
        this.updateGroup = this.updateGroup.bind(this);
        this.updateDate = this.updateDate.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.showData = this.showData.bind(this);
        this.generatePDF = this.generatePDF.bind(this);
        
        this.state = {
            showData: false,
            group:'alle',
            selectedDate: this.defaultDateValue,
            data:[],
            statistik:[]
        }

    }

    async fetchData(group, date){
        return (
        await axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/simpleList`, {
            params: {
                group: group,
                date: date,
            },
          }))
      }

    updateGroup(e){
        //console.log(e.target.value)
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
                data= {this.state.data} />, document.getElementById('hiddenTable')
            ));

          
    }

//     calculateStatistik() {
//         return new Promise(resolve => {
//             setTimeout(() => {
//                 //reset statistik in state
//                 this.setState({statistik: []})
//                 // create variables for Klassenstatistik
//                 let sumMale = 0, sumFemale = 0, sumNoDeLangMale = 0, sumNoDeLangFemale = 0;
//                 //iterate through the data for each student
//                 this.state.data.forEach(student => {
//                 //console.log(student)
//                 if(student.geschlecht == 'm') sumMale += 1;
//                 else if (student.geschlecht == 'f') sumFemale +=1;
//                 if (student.geschlecht == 'm' && student.nichtdeutsche_herkunftssprache == '1') sumNoDeLangMale +=1;
//                 else if (student.geschlecht == 'f' && student.nichtdeutsche_herkunftssprache == '1') sumNoDeLangFemale +=1;

//             })
//             this.state.statistik.push(sumMale, sumFemale, sumNoDeLangMale, sumNoDeLangFemale)
//             resolve('resolved')
//             }, 500)
//     })
// }
       
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

    generatePDF() {
        
        const doc = new jsPDF('l', 'mm', [297, 210], false);
        //doc.text("Hello world!", 10, 10);
       
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


    render(){
        // console.log(this.state.group)
        // console.log(this.state.selectedDate)
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
                    <table >
                        <thead>
                            <tr>
                                <th colSpan="4">Liste nach Ausgewählte Kriterien</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((student, index) => {
                                const { Rufname, Jahrgangsstufe, Lerngruppe, Etage} = student
                                return (
                                    <tr key={uuidv4+Rufname}>
                                        <td style={{width:'10%'}}>{Rufname}</td>
                                        <td>{Jahrgangsstufe}</td>
                                        <td>{Lerngruppe}</td>
                                        <td>{Etage}</td>
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

