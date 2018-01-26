
export class daysClass {

    constructor (dayNumber, classInCalendar, weekNumber) {
        this.dayNumber = dayNumber;
        this.classInCalendar = classInCalendar;
        this.weekNumber = weekNumber;
        this.sessions = [];
    }
    addSession(newSession) {
      this.sessions.push(newSession);
      return true;
    }

}
