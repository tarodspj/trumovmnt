import { askForCalendar, checkSession, checkToday } from './lib';
import { daysClass } from './classDays';
import { htmlCalendar } from './htmlCalendar';
import $ from 'jquery';
require('datejs');

//for prod
 // const baseUrl = 'https://api.meetup.com/T-R-U-Movmnt/events?&sign=true&photo-host=public&page=20&fields=id,duration,local_date,local_time,name,venue,short_link&desc=false',
 //       attributes = '';

//for dev
const baseUrl = './js/json/meetup.json',
     attributes = '';

let calendar = function calendar( manyDays, firstDay, targetHtml, sessionsList ) {
  const $targetHtml = $( '#' + targetHtml );
  let daysCalendarList = new Map(),
      htmlToDraw = '';

  for ( let i = 0; i < manyDays; i++ ) {
    let dayToPlay = firstDay.addDays( 1 );
    const classToDay = checkToday( dayToPlay ),
          dayNumber = dayToPlay.toString( 'dd' ),
          keyDate = dayToPlay.toString( 'yyyy-MM-dd' ), //same structure than meetup
          weekNumber = dayToPlay.getWeek();

    let dayToAdd = new daysClass( dayNumber, classToDay, weekNumber );

    daysCalendarList.set( keyDate, dayToAdd );
  }

  checkSession( daysCalendarList, sessionsList );

  htmlToDraw = htmlCalendar( daysCalendarList );
  $( '#' + targetHtml ).html( htmlToDraw );
  //now you can add lisenners
};

 function calendarInitialValues() {
  Date.today().setTimeToNow(); // devolver today a today de verdad

  const manyDays = 21,
        firstDay = Date.sunday(),
        targetHtml = 'cal_container';

  askForCalendar( baseUrl ).then( sessionsResponse => {
    if( sessionsResponse ) {
      let calendarHome = calendar( manyDays, firstDay, targetHtml, sessionsResponse.data );
    } else {
      console.log('error');
    }
  });

}

$(function () {
  calendarInitialValues();
});
