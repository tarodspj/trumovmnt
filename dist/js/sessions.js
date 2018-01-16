"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

// let base = 'https://api.meetup.com/T-R-U-Movmnt/events',
//     attributes = '?&sign=true&photo-host=public&page=20&fields=id,duration,local_date,local_time,name,venue&desc=false';
//
// function manageDataCalendar(json){
//   let dataCalendar = json.data;
//   return dataCalendar;
//   // console.log(dataCalendar.length);
//   // $.each(dataCalendar, function(index, value){
//   //   console.log(value.name + ' ' + value.local_date);
//   // });
// }
//
// export function askForCalendar() {
//   console.log('a');
//   $.ajax({
//     url: base + attributes,
//     dataType: 'jsonp',
//     jsonpCallback: 'manageDataCalendar'
//   });
// }
//
// // $(function() {
// //     askForCalendar();
// // });


exports.default = function (x, y) {
  return x + y;
};