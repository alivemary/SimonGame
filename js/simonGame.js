﻿$(document).ready(function () {
    var MAX = 5; //max sequence length
    var sequence = [];
    var curSequence = [];
    var colors = ['red', 'green', 'yellow', 'blue'];
    var myInterval;

    function Board() {
        this.status = 'off';
        this.gameStatus = 'off';
        this.player = 'simon';

        this.setStatus = function (s) {
            switch (s) {
                case 'off':
                    this.status = s;
                    console.log("Game off!");
                    $('#count').html('');
                    $('#strictOn').css('background-color', '#660000');
                    $('#red').removeClass('lightred');
                    $('#blue').removeClass('lightblue');
                    $('#yellow').removeClass('lightyellow');
                    $('#green').removeClass('lightgreen');
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

        function blink(i) {
            clearInterval(myInterval);
            myInterval = setInterval(function () {
                if(i>0) $('.' + sequence[i-1]).removeClass('light' + sequence[i-1]); // change it back 
                $('.' + sequence[i]).addClass('light' + sequence[i]);//blink
                clearInterval(myInterval);
                myInterval = setInterval(function(){
                    $('.' + sequence[i]).removeClass('light' + sequence[i]);
                    clearInterval(myInterval);
                    blink(i);
                }, 400);
                if (i < sequence.length) i++;
                else {
                    clearInterval(myInterval);
                    board.player = 'human';
                    //myInterval = setInterval(generateNext, 1000);
                    return;
                }
            }, 400);
            
        }

        function generateNext() {
            if (sequence.length >= MAX) { clearInterval(myInterval); return}
            sequence.push(colors[Math.floor(Math.random() * 4)]);
            $('#count').html(sequence.length + ' ');
            blink(0);
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
            curSequence = [];
        }

        this.check = function () {
            var result = true;
            for (var i = 0; i < curSequence.length; i++) {
                if (curSequence[i] !== sequence[i]) result = false;
            }
            return result;
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
    $('.pad').click(function () {
        //player turn
        if (board.status !== 'off') {
            if (board.gameStatus == 'on' && board.player == 'human') {
                curSequence.push(this.id);
                if (!board.check()) {
                    $('#count').html('!! ');
                    board.setStatus('off');
                    board.setStatus('on');
                    board.player = 'simon';
                    if (board.status !== 'off') {
                        if (board.gameStatus == 'off') board.startGame();
                    }
                    return;
                }
                console.log(curSequence);
                if (curSequence.length === sequence.length) {
                    board.player = 'simon';
                    curSequence = [];
                    board.startGame();
                }
            }
            
        }
    });
   
});