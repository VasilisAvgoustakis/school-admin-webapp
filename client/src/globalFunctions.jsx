/**
 * File contains variables and functions that can be globaly used by other files.
 */

/**
 * Global Variables
 */

//global variable containing the server IP
const SERVER_IP = "localhost";

/**
 * Formats a Date object to German Date format.
 * 
 * @param {*} date Date Object
 * @returns String dd.mm.YYYY
 */

function dateToDEFormat(date){

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
        if(month < 9){
            return '0' + (month+1).toString();
        }else{
            return (month+1).toString();
        }
    }

    let year = date.getFullYear();

    let shortDate = formatDay(day) + "." + formatMonth(month) + "." + year;

    return shortDate.toString()
}


/**
 * Formats a Date object to English Date format.
 * 
 * @param {*} date Date Object
 * @returns String YYYY-mm-dd
 */

function dateToENFormat(date){

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
        if(month < 9){
            return '0' + (month+1).toString();
        }else{
            return (month+1).toString();
        }
    }

    let year = date.getFullYear();

    let shortDate = year + '-' + formatMonth(month) + '-' + formatDay(day);

    return shortDate.toString()
}

/**
 * Delaying execution. Returns a Promise delayed by the setTimeout function.
 * 
 * @param {*} milliseconds int
 * @returns Promise 
 */

function Sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
   }

//exports
export {dateToDEFormat, dateToENFormat, Sleep, SERVER_IP};
