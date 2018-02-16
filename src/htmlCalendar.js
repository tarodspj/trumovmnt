let listOfSessionsPerDay = function ( sessions ) {
  return {
    getList : function() {
      const startHtmlList = '<ol class="listOfSessionsThatDay">',
            endHtmlList = '</ol>';
      let sessionsPerThisDay = '',
          baseGoogleMapsButon = 'https://www.google.com/maps/?q=';

      sessions.forEach( function ( session ) {
        let d = new Date( parseInt( session.time, 10 ) ),
            dEnd = new Date( parseInt( session.time + session.duration, 10 ) );

        const name = session.name,
            local_time = d.toString('hh:mmtt'),
            local_time_end = dEnd.toString('hh:mmtt'),
            link = session.event_url;

        let location = '',
            mapLink = '';

        sessionsPerThisDay = sessionsPerThisDay + `<li class="sessionPerToday">`;
        sessionsPerThisDay = sessionsPerThisDay + `<span class="sessionPerTodayInside">`;
        sessionsPerThisDay = sessionsPerThisDay + `<p class="sessionName sessionData">${name}</p>`;

        if( session.venue ) {
          //location = ,
          mapLink = `<a class="sessionLocationLink" target="_blank" href="${baseGoogleMapsButon}${session.venue.lat},${session.venue.lon}" title="${location}">${session.venue.name} <span class="ico"></span></a>`;
          //console.log(session.name + ' ' + session.local_time + ' ' + session.venue.name + ' ' + session.link + ' ' + mapLink);
        }
        //sessionsPerThisDay = sessionsPerThisDay + `<p class="sessionLocationName sessionData">${location}`;
        sessionsPerThisDay = sessionsPerThisDay + `${mapLink}`;
        sessionsPerThisDay = sessionsPerThisDay + `<strong class="sessionTime sessionData">${local_time} - ${local_time_end}</strong>`;
        sessionsPerThisDay = sessionsPerThisDay + `<a href="${link}" target="_blank" class="sessionCta cta ctaMedium ctaColor1" title="event in meetup">enrole in meetup</a>`;
        sessionsPerThisDay = sessionsPerThisDay + `<hr class="sessionSeparationLine" />`;
        sessionsPerThisDay = sessionsPerThisDay + `</span>`;
        sessionsPerThisDay = sessionsPerThisDay + '</li>';
      });
      return startHtmlList + sessionsPerThisDay + endHtmlList;
    },
    getClass : function() {
      let classSession = 'noSession';

      if( sessions.length !== 0 ) {
        classSession = 'yesSession';
      }
      return classSession;
    }
  }
};

export function htmlCalendar( days ) {
  console.log(days);
  const startWeekDaysHtml = '<div class="weekLine"><ol class="calendarDaysLine">',
        endWeekDaysHtml = '</ol>',
        startWeekSessionsHtml = '<ol class="calendarSessionsLine">',
        endWeekSessionsHtml = '</ol></div>',
        headerCalendar = '<div class="weekLine"><ol class="calendarDaysLine nameDayList"><li class="nameDay cellCalendar">Sun</li><li class="nameDay cellCalendar">Mon</li><li class="nameDay cellCalendar">Tus</li><li class="nameDay cellCalendar">Wed</li><li class="nameDay cellCalendar">Thu</li><li class="nameDay cellCalendar">Fri</li><li class="nameDay cellCalendar">Sat</li></ol></div>';

  let html = headerCalendar + startWeekDaysHtml,
      weeklySessions = startWeekSessionsHtml,
      i = 0;

  for (let [key, value] of days.entries()) {
    let sessionsListDay = listOfSessionsPerDay(value.sessions);

    weeklySessions = weeklySessions + `<li id="sessionsOfDay${key}" class="sessions">`;

    if( value.sessions.length !== 0 ) {
      weeklySessions = weeklySessions + sessionsListDay.getList();
    } else {
      weeklySessions = weeklySessions + `<p>today we don't have session on the schedule</p>`;
    }
    weeklySessions = weeklySessions + `</li>`;

    html = html + `<li class="dayCalendar cellCalendar ${value.classInCalendar} ${sessionsListDay.getClass()}" data-day_index="${key}">
                    ${value.dayNumber}
                    <span class="activeDay"></span>
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
