import $ from 'jquery';
require('datejs');

export async function askForCalendar( url ) {
  let responseToSend = false;
  //console.log(url);
  await $.ajax({
    url: url,
    dataType: 'jsonp',
    success: function( data ){
      //console.log(data.results);
      responseToSend = data.results;
    }
  });
  return responseToSend;
}

export function checkSession( daysCalendarList, sessionsList ) {
  sessionsList.forEach( function ( session ) {
    let d = new Date( parseInt( session.time, 10 ) );
    let dayWithSession = daysCalendarList.get( d.toString('yyyy-MM-dd') );

    if( dayWithSession !== undefined ) {
      dayWithSession.addSession( session );
    }
  });
}

export function checkToday( dayToCheck ) {
  const valueTocheck = Date.compare( dayToCheck, Date.today() );
  if ( valueTocheck === -1 ) {
    return ' beforeToday ';
  } else if ( valueTocheck === 0 ) {
    return ' today ';
  } else {
    return ' afterToday ';
  }
}
