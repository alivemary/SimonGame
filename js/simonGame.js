$(document).ready(function () {
    $('#gameWin').removeClass('hidden');
    $('#loadWin').addClass('hidden');

    $('.onoffswitch-label').click(function () {
        //switch game status on/off
        if ($('.onoffswitch-checkbox').is(':checked')) $('.myCheckbox').prop('checked', true);
        else $('.onoffswitch-checkbox').prop('checked', false);
        //if game on
        if (!$('.onoffswitch-checkbox').is(':checked')) {
            console.log("Game on!");
            $('#count').html('-- ');
        }
            //if game off
        else {
            console.log("Game off!");
            $('#count').html('');
        }
    });
       
   
});