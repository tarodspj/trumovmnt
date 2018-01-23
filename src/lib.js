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
