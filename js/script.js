$(document).ready(function() {
    var quizNum = 1,
        audioNum = 1,
        score = 0;
    
    //Click Start Button
    $('.start-btn').click(function() {
        $('.start').fadeOut(750);
        $('.start-btn').fadeOut(750, function() {
            $('.progress').fadeIn(750);
            $('.audio-section').fadeIn(750);
            $('.audio-1').fadeIn(750);
            $('.answers').fadeIn(750);
            $('.group-1').fadeIn(750, function() {
                $('.progress').fadeTo(750, 1);
            });
        });
    });
    
    //Click on answerbox to reveal right answer and move to the next
    $('.answer-box').click(function() {
        //fade answer boxes, show correct answer
        $('.group-' + quizNum + ' .correct').addClass('correct-reveal'); //reveal correct answer
        $('.group-' + quizNum + ' .wrong').fadeTo(1000, 0); //fade out wrong ones
        
        //fade out old group, fade in new group
        $('.group-' + quizNum).delay(1000).fadeOut(1000).delay(1000); //hide old group
        quizNum++;
        
        if (quizNum == 11) { //if the game is over
            $('.audio-section').delay(2000).fadeOut(1000); //hide audio
            $('.sound-number').fadeOut(1000); //hide quiz number
            //score animation
            $('.score-section').addClass('score-end').delay(1000).animate({
            left: '-50px',
            top: '100px',
            width: '500px',
            height: '150px',
            fontSize: '3em',
            color: 'white'    
        }, "slow");
            
            $('body').animate({backgroundColor: 'green'}, 3000);
            $('h1').animate({color: "green"}, 3000);
            $('.audio-section').hide();
            $('.answers').hide();   
        } else {
            $('.group-' + quizNum).delay(2000).fadeIn(1000, function() { //show new group
                //change quiz number at progress bar
                if (quizNum <=10) {
                    var quizString = quizNum.toString();
                    $('.num-change').text(quizString);
                } else {
                    return;
                }  
            });  
            //hide & mute old sound and show new sound
            $('.audio-' + audioNum).prop("muted", true);
            $('.audio-' + audioNum).hide();
            audioNum++
            $('.audio-' + audioNum).css('display', 'inline');
        }
        
        //Change score at progress bar
        if ($(this).hasClass('correct')) {
            score++;
            var scoreString = score.toString();
            $('.score').text(scoreString);
        } else {
            return;
        }
    });
    //Hover effect for Answer-Box
    $('.answer-box').mouseenter(function() {
        $(this).addClass('answer-box-hover');
    });
    $('.answer-box').mouseleave(function() {
        $(this).removeClass('answer-box-hover');
    });
});