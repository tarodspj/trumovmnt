function listOfSessionsPerDay (sessions) {
  let sessionsPerThisDay = '',
      baseGoogleMapsButon = 'https://www.google.com/maps/?q=';

  sessions.forEach( function ( session ) {
    const name = session.name,
        local_time = session.local_time,
        link = session.link;
    let location = 'to be defined',
        mapLink = 'to be defined';

        sessionsPerThisDay = sessionsPerThisDay + `name session: ${name}<br />`;
        sessionsPerThisDay = sessionsPerThisDay + `time: ${local_time}<br />`;
        sessionsPerThisDay = sessionsPerThisDay + `link meetup: <a href="${link}" title="event in meetup">enrole in meetup</a><br />`;
    if( session.venue ) {
        location = session.venue.name,
        mapLink = `<a href="${baseGoogleMapsButon}${session.venue.lat},${session.venue.lon}" title="${location}">${location}</a>`;
        //console.log(session.name + ' ' + session.local_time + ' ' + session.venue.name + ' ' + session.link + ' ' + mapLink);
    }
    sessionsPerThisDay = sessionsPerThisDay + `location: ${location} `;
    sessionsPerThisDay = sessionsPerThisDay + `gmap link: ${mapLink}<br />`;
  });
  return sessionsPerThisDay;
}


export function htmlCalendar( days ) {
  console.log(days);
  const startWeekDaysHtml = '<div class="weekLine"><ol class="calendarHomeLine">',
        endWeekDaysHtml = '</ol></div>',
        startWeekSessionsHtml = '<ol class="calendarHomeSessionsLine">',
        endWeekSessionsHtml = '</ol>';


  let html = startWeekDaysHtml,
      weeklySessions = startWeekSessionsHtml,
      i = 0;

  for (let [key, value] of days.entries()) {
    let classSession = 'noSession';

    weeklySessions = weeklySessions + `<li id="sessionsOfDay${key}" class="session">`;
    if( value.sessions.length !== 0 ) {
      classSession = 'yesSession';

      weeklySessions = weeklySessions + listOfSessionsPerDay(value.sessions)
    } else {
      weeklySessions = weeklySessions + `<p>today we don't have session on the schedule</p>`;
    }
    weeklySessions = weeklySessions + `</li>`;

    html = html + `<li class="dayCalendar ${value.classInCalendar} ${classSession}" data-day_index="${key}">
                    ${value.dayNumber}
                  </li>`;

    if ( ( i + 1 ) % 7 === 0 ) {
      weeklySessions = weeklySessions + endWeekSessionsHtml;
      if ( i === (days.size - 1) ) {
       html += endWeekDaysHtml + weeklySessions;
      } else {
       html += endWeekDaysHtml + weeklySessions + startWeekDaysHtml;
      }
      weeklySessions = startWeekSessionsHtml;
    }
    i++;
  }

  return html;
}
