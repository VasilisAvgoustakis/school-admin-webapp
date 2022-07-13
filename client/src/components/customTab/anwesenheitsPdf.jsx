import React from 'react';
import '../../stylesheets/globalstyles.css';
import { v4 as uuidv4 } from 'uuid';

/**
 * Instances of this Class component represent the individual rows in the PDF Document
 */
export class CustomCell extends React.Component {
    constructor(props){
        super(props);

        this.state={
            date: this.props.date,
            dayCode: this.props.dayCode, // the day of the week (0 = sun, 6 = Sat)
            content: this.props.content, // the formatted date as string
            abbr: this.props.abbr // property value used for bckrnd clr styling in simpleList.jsx
        }
    }

    render(){
        return(
            <td 
                id = {this.state.date}
                abbr={this.state.abbr} 
                accessKey= {this.state.dayCode} 
                key={uuidv4()} style={{width:'10%'}}>    
                <p>{this.state.content}</p>
                {}                              
            </td>
        )
    }
}



/**
 * Class component used for creating the PDF document with the Anwesenheitliste
 */
export class Anwesenheitsliste extends React.Component {
    constructor(props){
        super(props);

        // function bindings
        this.getDaysInMonth = this.getDaysInMonth.bind(this);
        this.dateToListeFormat = this.dateToListeFormat.bind(this);

        // state vars
        this.state={
            selectedDate: this.props.selectedDate, // the date selected by the user
            data: this.props.data // the names and other data of students belonging to the selected group
        }
    }


    // returns the right date format for the dates on the pdf
    dateToListeFormat(date){

        // get the day number from date obj
        let day = date.getDate();

        // place a 0 infront of day numbers between 1 - 9
        function formatDay(day){
            if(day < 10){
                return '0' + (day).toString();
            }else{
                return (day).toString();
            }
        }
    
        // get month number from date obj
        let month = date.getMonth();

        // place a 0 infront of months 1 to 9
        function formatMonth(month){
            if(month+1 < 10){
                return '0' + (month+1).toString();
            }else{
                return (month+1).toString();
            }
        }

        // the final "short" date format that appears on the PDF
        let shortDate = formatDay(day) + "." + formatMonth(month)

        // returned as string
        return shortDate.toString()
    }

    // starting from the day selected by the user, return all remaining days till the end of current month
    getDaysInMonth(date) {
        // get month from date obj
        var month = date.getMonth();

        // result array will be populated with the formatted date values and weekday code
        var days = [];

        while (date.getMonth() === month) {
            // push date (in short format) + weekday code in days array (0 = sun, 6 = Sat)
            days.push([this.dateToListeFormat( new Date(date)), date.getDay()]);
            // increment the date passed as parameter by 1
            date.setDate(date.getDate() + 1);
        }
        return days;
    }
    
    
    
    render() {
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
                        <tr>
                            <td accessKey= 'mustNotBeZero' ><strong>Rufname</strong></td>
                            <td accessKey= 'mustNotBeZero'><strong>Klasse</strong></td>
                            <td accessKey= 'mustNotBeZero'><strong>Lerngr.</strong></td>
                        
                            {this.getDaysInMonth(new Date(this.state.selectedDate)).map(
                                day => {
                                    return (
                                        <CustomCell 
                                            key={uuidv4()} 
                                            style={{width:'10%'}}                                         
                                            content = {day[0]}
                                            dayCode = {day[1]} 
                                        />
                                    )
                                }
                            )}
                        </tr>
                        {this.state.data.map((student) => {

                            const { Rufname, Jahrgangsstufe, Lerngruppe } = student
                            
                            return (
                                <tr key={uuidv4()} >
                                    {/* NOTE!!! The class # (Jahrgangsstuffe) is always passed as the value of the 'abbr' property
                                    in order for it to be used for the different bckround clr that students of each class should have.
                                    Similarly other empty properties of the <td> element returned by the CustomCell component above
                                    are used to style the weekends and holiday black. 
                                    This is a workaround, dedicated properties should be used in the future! */}
                                    
                                    <td abbr={Jahrgangsstufe} accessKey= 'mustNotBeZero' style={{width:'10%'}}>{Rufname}</td>
                                    <td abbr={Jahrgangsstufe} accessKey= 'mustNotBeZero'>{Jahrgangsstufe}</td>
                                    <td abbr={Jahrgangsstufe} accessKey= 'mustNotBeZero'>{Lerngruppe}</td>
                                    
                                    {this.getDaysInMonth(new Date(this.state.selectedDate)).map(
                                        day => { 
                                            return (
                                                <CustomCell 
                                                    key={uuidv4()} 
                                                    date = {day[0]}
                                                    dayCode= {day[1]} 
                                                    abbr={Jahrgangsstufe}
                                                    navi={this.props.navi}
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
