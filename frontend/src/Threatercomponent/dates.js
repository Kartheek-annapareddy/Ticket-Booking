import React from 'react'
 function dates(){
    const currentdate=new Date();

    const daysofweek=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const monthsOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


    var nextFivedays=[];
    for(var i=0;i<5;i++){
        const futuredate=new Date()
        futuredate.setDate(currentdate.getDate()+i)
        const day=daysofweek[futuredate.getDay()]
        const date=futuredate.getDate();
        const month=monthsOfYear[futuredate.getMonth()]
        nextFivedays.push({day:day,date:date,month:month})
    } 
    return nextFivedays;
 }
 

 export default dates;








