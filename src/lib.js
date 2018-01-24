export const person = {
  name: 'rob',
  location: 'nyc',
  ager: 37
}

export function sayHello(name) {
  return `Hello ${name} tu`;
}

/******************module askCalendar *********/


export async function askForCalendar(url) {

    let response = await fetch(url);
    //let movie = await response.json();
    let sessions = await response.ok;
    if (sessions) {
      return response.json();
    } else {
      return sessions;
    }

}
//***end***************module askCalendar *********/

export function checkSession(dayToCheck) {
  //check meetup sessions and return true or false
  //addClass haveSession or noSession
  //msg no session for today?!
  //if(Date.equals(globalToday, Date.parse(dayToCheck))){
  if (Date.equals(Date.parse('2018-01-17'), Date.parse(dayToCheck))) {
    console.log('event today: ' + dayToCheck);
    return true;
  }
  console.log('checkSession: ' + globalToday.toString('yy/MM/dd'));
  return false;
}
