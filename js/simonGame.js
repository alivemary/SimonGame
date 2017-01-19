$(document).ready(function () {

    function Board() {
        this.status = 'off';

        this.setStatus = function (s) {
            switch (s) {
                case 'off':
                    this.status = s;
                    console.log("Game off!");
                    $('#count').html('');
                    $('#strictOn').css('background-color', '#660000');
                    this.stopGame();
                    break;
                case 'on':
                    this.status = s;
                    console.log("Game on!");
                    $('#count').html('-- ');
                    this.setStatus('plain');
                    break;
                case 'strict':
                    this.status = s;
                    console.log("Strict mode on!");
                    $('#strictOn').css('background-color', '#FF5733');
                    break;
                case 'plain':
                    this.status = s;
                    console.log("Plain mode on!");
                    $('#strictOn').css('background-color', '#660000');
                    break;
            }
        }

        this.startGame = function () {
            switch (this.status) {
                case 'plain':
                    console.log("Plain game starts!!!");
                    break;
                case 'strict':
                    console.log("Strict game starts!!!");
                    break;
            }
        }

        this.stopGame = function () {
            console.log('Game stops!');
        }
        
    }

    
    $('#gameWin').removeClass('hidden');
    $('#loadWin').addClass('hidden');
    var board = new Board();
    $('.onoffswitch-label').click(function () {
        //switch game status on/off
        if ($('.onoffswitch-checkbox').is(':checked')) $('.myCheckbox').prop('checked', true);
        else $('.onoffswitch-checkbox').prop('checked', false);
        //if game on
        if (!$('.onoffswitch-checkbox').is(':checked')) {
            board.setStatus('on');
        }
        //if game off
        else {
            board.setStatus('off');
        }
    });
    $('#strict').click(function () {
        //change game mode from simple to strict and otherwise
        if (board.status !== 'off'){
            if (board.status == 'plain') board.setStatus('strict');
            else board.setStatus('plain');
        }
    });
    $('#start').click(function () {
        //start game
        if (board.status !== 'off') {
               board.startGame();
            }
      
    });
   
});