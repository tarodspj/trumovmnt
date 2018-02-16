import $ from 'jquery';

export function listeners( ) {
  let $calContainer = $('#cal_container');

  $calContainer.find('.yesSession').on('click', function(){
    let $this = $(this);
    //console.log($this.attr('data-day_index'));
    $calContainer.find('.yesSession').removeClass('active');
    $this.addClass('active');

    $calContainer.find('.sessions').removeClass('active');
    $calContainer.find(`#sessionsOfDay${$this.attr('data-day_index')}`).addClass('active');
  });
}
