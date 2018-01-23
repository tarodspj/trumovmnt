import { person, sayHello, askForCalendar } from './lib';
import $ from 'jquery';
require('datejs');
// console.log(person.name);
// console.log(sayHello('mar'));

  // async function getPost() {
  //   const response = await fetch
  //   ('./js/json/meetup.json');
  //   const data = await response.json();
  //   return data.data;
  // }

//getPost().then(posts => console.log(posts));


let globalToday;
//for prod
// const baseUrl = 'https://api.meetup.com/T-R-U-Movmnt/events',
//       attributes = '?&sign=true&photo-host=public&page=20&fields=id,duration,local_date,local_time,name,venue&desc=false';

//for dev
const baseUrl = './js/json/meetup.json',
      attributes = '';

let calendar = function calendar(manyDays, firstDay, targetHtml) {
  let html = '',
      resultToday = 0,
      classToDay = '';

  const $targetHtml = $('#' + targetHtml);

  function checkSession(dayToCheck) {
    //check meetup sessions and return true or false
    //addClass haveSession or noSession
    //msg no session for today?!
    //if(Date.equals(globalToday, Date.parse(dayToCheck))){
    if (Date.equals(Date.parse('2018-01-17'), Date.parse(dayToCheck))) {
      console.log('event today: ' + dayToCheck);
    }
    console.log('checkSession: ' + globalToday.toString('yy/MM/dd'));
  }

  function drawSessionsDayCalendar(dayWithSession) {
    //recopile the sessions of the day and put where must be putted
    // data-session1... or inside a div for each day

    //if(today)
    //add class Today
    //addClass today
    //check the session timetime or do it when we show the sessions of the day
  }

  function manageDataCalendarHome(json) {
    var dataCalendar = json.data;
    console.log(dataCalendar.length);

    $.each(dataCalendar, function (index, value) {
      console.log(value.name + ' ' + value.local_date);
      checkSession(value.local_date);
    });
  };

  var checkToday = function checkToday(dayToCheck) {
    var valueTocheck = Date.compare(dayToCheck, globalToday);
    if (valueTocheck === -1) {
      return -1;
    } else if (valueTocheck === 0) {
      return 0;
    } else {
      return 1;
    }
  };

  html = "<ol>";
  for (var i = 0; i < manyDays; i++) {
    classToDay = '';
    resultToday = checkToday(firstDay);
    if (resultToday === 0) {
      classToDay = classToDay + ' today';
    } else if (resultToday === 1) {
      classToDay = classToDay + ' afterToday';
    } else {
      classToDay = classToDay + ' beforeToday';
    }

    html += '<li class="' + classToDay + '" data-indice="' + i + '">';

    html += firstDay.toString('dd') + '</li>';
    firstDay.addDays(1); //if it is at the beginning of for add one before draw
    if (i + 1 === manyDays) {
      html += '</ol>';
    } else if ((i + 1) % 7 == 0) {
      html += '</ol><ol>';
    }
  }
};

function setInitialDateValues() {
  Date.today().setTimeToNow(); // devolver today a today de verdad

  const manyDays = 21,
        firstDay = Date.sunday(),
        targetHtml = 'cal_container';

  globalToday = Date.today();
console.log(firstDay);
  let calendarHome = calendar(manyDays, firstDay, targetHtml);
}

$(function () {
  setInitialDateValues();

  askForCalendar(baseUrl).then(sessionsResponse => {
    if(sessionsResponse) {
      console.log(sessionsResponse.data);
    } else {
      console.log('error');
    }
  });
});
