//var sampleDate = new Date("2018-08-01T00:00:00.000Z");

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

export {dateToDEFormat, dateToENFormat};

//console.log(dateToDEFormat(sampleDate))