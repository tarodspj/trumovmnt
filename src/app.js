import { askForCalendar, checkSession, checkToday } from './lib';
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

let calendar = function calendar( manyDays, firstDay, targetHtml, sessionsList ) {
  const $targetHtml = $( '#' + targetHtml );



  let daysCalendarList = new Map();

  for ( let i = 0; i < manyDays; i++ ) {
    let dayToPlay = firstDay.addDays( 1 );
    const classToDay = checkToday( dayToPlay );
    const dayNumber = dayToPlay.toString( 'dd' );
    const keyDate = dayToPlay.toString( 'yyyy-MM-dd' ); //same structure than meetup
    const weekNumber = dayToPlay.getWeek();

    let dayToAdd = new daysClass( dayNumber, classToDay, weekNumber );

    daysCalendarList.set( keyDate, dayToAdd );
  }
  console.log( daysCalendarList );
  checkSession( daysCalendarList, sessionsList );

};

 function calendarInitialValues() {
  Date.today().setTimeToNow(); // devolver today a today de verdad

  const manyDays = 21,
        firstDay = Date.sunday(),
        targetHtml = 'cal_container';

  askForCalendar( baseUrl ).then( sessionsResponse => {
    if( sessionsResponse ) {
      console.log(sessionsResponse.data);
      let calendarHome = calendar( manyDays, firstDay, targetHtml, sessionsResponse.data );
    } else {
      console.log('error');
    }
  });
}

$(function () {
  calendarInitialValues();
});
