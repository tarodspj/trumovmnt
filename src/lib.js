
export async function askForCalendar( url ) {

    let response = await fetch( url) ;
    //let movie = await response.json();
    let sessions = await response.ok;
    if ( sessions ) {
      return response.json();
    } else {
      return sessions;
    }

}

export function checkSession( daysCalendarList, sessionsList ) {
  sessionsList.forEach( function ( session ) {
    let dayWithSession = daysCalendarList.get( session.local_date );
    if( dayWithSession !== undefined ) {
      console.log(session.local_date);
      dayWithSession.addSession( session );
    }
  });
  console.log(daysCalendarList);
}

export function checkToday( dayToCheck ) {
  const valueTocheck = Date.compare(dayToCheck, Date.today());
  if ( valueTocheck === -1 ) {
    return ' beforeToday ';
  } else if ( valueTocheck === 0 ) {
    return ' today ';
  } else {
    return ' afterToday ';
  }
}
