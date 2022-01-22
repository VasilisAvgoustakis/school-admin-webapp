import React from 'react';
import dateToDEFormat from '../../globalFunctions'
import { v4 as uuidv4 } from 'uuid';
import { jsPDF } from "jspdf";


export class CustomCell extends React.Component {
    constructor(props){
        super(props);
        this.state={
            dayCode: this.props.dayCode,
            content: this.props.content,
            abbr: this.props.abbr
        }
    }

    render(){
        return(
            <td abbr={this.state.abbr} accessKey= {this.state.dayCode} key={uuidv4()} style={{width:'10%'}}>    
                <p>{this.state.content}</p>
                {}                              
            </td>
        )
    }
}



// Create Document Component
export class Anwesenheitsliste extends React.Component {
    constructor(props){
        super(props);
        this.getDaysInMonth = this.getDaysInMonth.bind(this);
        this.dateToListeFormat = this.dateToListeFormat.bind(this);
        this.state={
            selectedDate: this.props.selectedDate,
            data: this.props.data
        }
    }


    dateToListeFormat(date){
        let day = date.getDate();
        function formatDay(day){
            if(day < 10){
                return '0' + (day).toString();
            }else{
                return (day).toString();
            }
        }
    
        let month = date.getMonth();
        function formatMonth(month){
            if(month < 10){
                return '0' + (month+1).toString();
            }else{
                return (month+1).toString();
            }
        }
        let shortDate = formatDay(day) + "." + formatMonth(month)
        return shortDate.toString()
    }


    getDaysInMonth(date) {
        var month = date.getMonth();
        
        var days = [];
        while (date.getMonth() === month) {
            days.push([this.dateToListeFormat( new Date(date)), date.getDay()]);
            date.setDate(date.getDate() + 1);
        }
        return days;
        }
        
    
    render() {
        console.log(this.state.data)
        console.log(new Date(this.state.selectedDate))
        console.log(this.getDaysInMonth(new Date(this.state.selectedDate)))
        return(
            <div >
                <table id='anwesenheitsPDF' >
                            <thead>
                                <tr>
                                    <th accessKey= 'mustNotBeZero' colSpan={this.getDaysInMonth(new Date(this.state.selectedDate)).length+3}>
                                        Anwesenheitsliste</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* <tr><td>test row</td></tr> */}
                                <tr>
                                    <td accessKey= 'mustNotBeZero' ><strong>Rufname</strong></td>
                                    <td accessKey= 'mustNotBeZero'><strong>Klasse</strong></td>
                                    <td accessKey= 'mustNotBeZero'><strong>Lerngr.</strong></td>
                                
                                    {this.getDaysInMonth(new Date(this.state.selectedDate)).map(
                                        day => {
                                            return (
                                                
                                                <CustomCell key={uuidv4()} style={{width:'10%'}}
                                                    
                                                        content = {day[0]}
                                                        dayCode = {day[1]}
                                                        
                                                  
                                                />
                                            )
                                        }
                                    )}
                                </tr>
                                {this.state.data.map((student, index) => {
                                    const { Rufname, Jahrgangsstufe, Lerngruppe, Etage} = student
                                    return (
                                        <tr key={uuidv4()}>
                                            <td abbr={Jahrgangsstufe} accessKey= 'mustNotBeZero' style={{width:'10%'}}>{Rufname}</td>
                                            <td abbr={Jahrgangsstufe} accessKey= 'mustNotBeZero'>{Jahrgangsstufe}</td>
                                            <td abbr={Jahrgangsstufe} accessKey= 'mustNotBeZero'>{Lerngruppe}</td>
                                            {this.getDaysInMonth(new Date(this.state.selectedDate)).map(
                                                day => { 
                                                return (
                                                    // <td key={uuidv4+'_'+ day + '_' + day[1]} style={{width:'10%'}}>    
                                                    //     {console.log()}
                                                    // </td>
                                                    <CustomCell 
                                                        key={uuidv4()} 
                                                        dayCode= {day[1]} 
                                                        abbr={Jahrgangsstufe}
                                                        />
                                                
                                                )
                                        }
                                    )}
                                            
                                        </tr>
                                    )
                                })}
                            </tbody>
                </table>
            </div>
        )
    }
};
