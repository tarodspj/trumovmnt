//console.log(firstDay.toString('dd-MM') + ' beforeToday ' + globalToday.toString('dd-MM'));
let globalToday = null;

let calendar = function(manyDays, firstDay, targetHtml) {
  let html = '',
      $targetHtml = $('#' + targetHtml),
      resultToday = 0,
      classToDay = '';

      //for prod
      // const baseUrl = 'https://api.meetup.com/T-R-U-Movmnt/events',
      //       attributes = '?&sign=true&photo-host=public&page=20&fields=id,duration,local_date,local_time,name,venue&desc=false';

            //for dev
      const baseUrl = './js/json/meetup.json',
            attributes = '';

      function manageDataCalendar(json){
        let dataCalendar = json.data;
        console.log(dataCalendar.length);
        console.log('exito2');

        $.each(dataCalendar, function(index, value){
          console.log(value.name + ' ' + value.local_date);
        });
      };

      let askForCalendar = function () {
        console.log('a');
        $.ajax({
          url: baseUrl + attributes,
          dataType: 'json',
          //dataType: 'jsonp',
          success: function(data) { // callback for successful completion
            console.log('exito');
            manageDataCalendar(data);
          },
          error: function() { // callback if there's an error
            console.log('error');
          }
        });
      };

       let checkToday = function(dayToCheck) {
        let valueTocheck = Date.compare(dayToCheck, globalToday);
        if(valueTocheck === -1) {
          return -1;
        } else if(valueTocheck === 0){
          return 0;
        } else {
          return 1;
        }
      };

      function checkSession(dayToCheck) {
        //check meetup sessions and return true or false
        //addClass haveSession or noSession
        //msg no session for today?!
      }

      function drawSessionsDayCalendar(dayWithSession) {
        //recopile the sessions of the day and put where must be putted
        // data-session1... or inside a div for each day

        //if(today)
        //add class Today
        //addClass today
        //check the session timetime or do it when we show the sessions of the day
      }

      html = "<ol>";
      for(let i=0; i<manyDays; i++) {
        classToDay = '';
        resultToday = checkToday(firstDay);
        if(resultToday === 0) {
          classToDay = classToDay + ' today';
        } else if (resultToday === 1) {
          classToDay = classToDay + ' afterToday';
        } else {
          classToDay = classToDay + ' beforeToday';
        }

        html += '<li class="' + classToDay + '" data-indice="'+ i +'">';

        html += firstDay.toString('dd') + '</li>';
        firstDay.addDays(1); //if it is at the beginning of for add one before draw
        if(i+1 === manyDays) {
          html += '</ol>';
        } else if (((i+1)%7) == 0) {
          html += '</ol><ol>';
        }
      }

      let askForCalendarHome = askForCalendar();
      $targetHtml.html(html);
};

function setInitialDateValues() {
  Date.today().setTimeToNow(); // devolver today a today de verdad

  let manyDays = 21,
      firstDay = Date.sunday(),
      targetHtml = 'cal_container';

      globalToday = Date.today();

  let calendarHome = calendar(manyDays, firstDay, targetHtml);
}

$(function() {
  setInitialDateValues();
});
