import { askForCalendar, checkSession, checkToday } from './lib';
import { daysClass } from './classDays';
import { htmlCalendar } from './htmlCalendar';
import { listeners } from './listeners';
import $ from 'jquery';
require('datejs');

//for prod
 const baseUrl = 'https://api.meetup.com/2/events?key=353441564659940603b1b234e1d6c7e&group_urlname=T-R-U-Movmnt&sign=true';
  //       attributes = '';

//for dev
 //const baseUrl = './js/json/meetup.json';
 //      attributes = '';

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
  let listening = listeners();
};

 function calendarInitialValues() {
  Date.today().setTimeToNow(); // devolver today a today de verdad

  const manyDays = 21,
        firstDay = Date.sunday(),
        targetHtml = 'cal_container';

  askForCalendar( baseUrl ).then( sessionsResponse => {
    if( sessionsResponse ) {
      let calendarHome = calendar( manyDays, firstDay, targetHtml, sessionsResponse );
    } else {
      console.log('error');
    }
  });

}
if (process.env.NODE_ENV !== 'production') {
   console.log('Looks like we are in development mode!');
}

$(function () {
  calendarInitialValues();
});
