$(document).ready(function () {
    var MAX = 20; //max sequence length
    var sequence = [];
    var colors = ['red', 'green', 'yellow', 'blue'];
    var myInterval;

    function Board() {
        this.status = 'off';
        this.gameStatus = 'off';

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

        function blink() {
            var i = 0;
            clearInterval(myInterval);
            myInterval = setInterval(function () {
                if(i>0) $('.' + sequence[i-1]).removeClass('light' + sequence[i-1]); // change it back 
                $('.' + sequence[i]).addClass('light' + sequence[i]);//blink
                if (i < sequence.length) i++;
                else { clearInterval(myInterval); myInterval = setInterval(generateNext, 1000);return }
            }, 700);
        }

        function generateNext() {
            if (sequence.length >= MAX) { clearInterval(myInterval); return}
            sequence.push(colors[Math.floor(Math.random() * 4)]);
            $('#count').html(sequence.length + ' ');
            blink();
            
            console.log(sequence);
        }

        this.startGame = function () {
            console.log("Game starts!!!");
            this.gameStatus = 'on';
            myInterval = setInterval(generateNext, 1000);
            
        }

        this.stopGame = function () {
            console.log('Game stops!');
            this.gameStatus = 'off';
            clearInterval(myInterval);
            sequence = [];
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
               if (board.gameStatus == 'off') board.startGame();
            }
      
    });
   
});