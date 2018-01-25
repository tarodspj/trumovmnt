import { person, sayHello, askForCalendar, checkSession } from './lib';
import { daysClass } from './classDays';
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

//for prod
// const baseUrl = 'https://api.meetup.com/T-R-U-Movmnt/events',
//       attributes = '?&sign=true&photo-host=public&page=20&fields=id,duration,local_date,local_time,name,venue&desc=false';

//for dev
const baseUrl = './js/json/meetup.json',
      attributes = '';

let calendar = function calendar(manyDays, firstDay, targetHtml, sessionsList) {
console.log('calendar');
  let html = '',
      resultToday = 0,
      classToDay = '';

  const $targetHtml = $('#' + targetHtml);

  // function checkSession(dayToCheck) {
  //   //check meetup sessions and return true or false
  //   //addClass haveSession or noSession
  //   //msg no session for today?!
  //   //if(Date.equals(globalToday, Date.parse(dayToCheck))){
  //   if (Date.equals(Date.parse('2018-01-17'), Date.parse(dayToCheck))) {
  //     console.log('event today: ' + dayToCheck);
  //   }
  //   console.log('checkSession: ' + globalToday.toString('yy/MM/dd'));
  // }

  function drawSessionsDayCalendar(dayWithSession) {
    //recopile the sessions of the day and put where must be putted
    // data-session1... or inside a div for each day

    //if(today)
    //add class Today
    //addClass today
    //check the session timetime or do it when we show the sessions of the day
  }

  let manageTheData = function manageDataCalendarHome(json) {
    var dataCalendar = json.data;
    console.log(dataCalendar.length);

    $.each(dataCalendar, function (index, value) {
      console.log(value.name + ' ' + value.local_date);
      checkSession(value.local_date);
    });
  };

function checkToday(dayToCheck) {
    const valueTocheck = Date.compare(dayToCheck, Date.today());
    if (valueTocheck === -1) {
      return ' beforeToday ';
    } else if (valueTocheck === 0) {
      return ' today ';
    } else {
      return ' afterToday ';
    }
  };
  let listofDays = new Map();
  html = "<ol>";
  for (let i = 0; i < manyDays; i++) {
    let dayToPlay = firstDay.addDays(1);
    console.log(i);
    const classToDay = checkToday(dayToPlay);
    const dayNumber = dayToPlay.toString('dd');
    const weekNumber = dayToPlay.getWeek();

    let dayToAdd = new daysClass(dayNumber, classToDay, weekNumber, 'no se');

    listofDays.set( dayNumber, dayToAdd );

    console.log(listofDays);
    //console.log(dayToPlay + ' ' + classToDay+ ' ' + dayNumber + ' ' + weekNumber);

    //html += '<li class="' + classToDay + '" data-indice="' + i + '">';

    //html += firstDay.toString('dd') + '</li>';
    // if (i + 1 === manyDays) {
    //   html += '</ol>';
    // } else if ((i + 1) % 7 == 0) {
    //   html += '</ol><ol>';
    // }
  }

  //$('#' + targetHtml).html(html);
};

function setInitialDateValues() {
  Date.today().setTimeToNow(); // devolver today a today de verdad

  const manyDays = 21,
        firstDay = Date.sunday(),
        targetHtml = 'cal_container';

  //console.log(firstDay);
  askForCalendar(baseUrl).then(sessionsResponse => {
    if(sessionsResponse) {
      console.log(sessionsResponse.data);
      let calendarHome = calendar(manyDays, firstDay, targetHtml);
    } else {
      console.log('error');
    }
  });
}

$(function () {
  setInitialDateValues();
});
