'use strict'

const dateEl = document.querySelector("input[type='date']");

const now = new Date();
let year = now.getFullYear();
let month = now.getMonth();
let day = now.getDay()-1;

if(month < 10) {
    month = "0" + month;
}

if(day < 10){
    day = "0" + day;
}


const dateClean = [year, month, day].join("-");
dateEl.value = dateClean;