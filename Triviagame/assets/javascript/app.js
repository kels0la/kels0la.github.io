/*PsuedoCoding:
1. Layout of the page + questions and answers (*Arrays?*)
2. Add button to start the game
3. On click of button: timer starts, question(s) is displayed
4. Allow user to click their answer.
5. If Timer ends or incorrect: incorrect score is added, correct answer is displayed, within 5 seconds next Q is up
5. If correct: added to correctScore, display of correct, move onto next question within 5 seconds
6. 
7. Restart the game upon completion
*/
const Questions = [
    {//1
        question: "<h5>1. Who sold his entire stake of the cryptocurrency he created at its all-time high on the day Bitcoin Cash launched on Coinbase?</h5>",
        answers: {
            a: "Charlie Lee", b: "Satoshi Nakamoto", c: "Roger Ver", d: "Vitalik Buterin"
        },
        correctAnswer: "a"
    },
    {//2
        question: "<h5>2. The creator of Bitcoin used what alias for his communications?</h5>", //2
        answers: {
            a: "Milton Friedman", b: "Alan Greenspan", c: "Donald Trump", d: "Satoshi Nakamoto"
        },
        correctAnswer: "d"
    },
    {//3
        question: "<h5>3. Who founded Ethereum?</h5>", //3
        answers: {
            a: "Peter Wuille", b: "Vitalik Buterin", c: "Barry Silbert", d: "Luke Dashjr"
        },
        correctAnswer: "b"
    },
    {//4
        question: "<h5>4. Which company recently bought the cryptocurrency exchange, Poloniex?</h5>",
        answers: {
            a: "Coinbase", b: "Kraken", c: "Mt.Gox", d: "Circle"
        },
        correctAnswer: "d"
    },
    {//5
        question: "<h5>5. What is the name of the venture capitalist that won the first Silk Road auction?</h5>",
        answers: {
            a: "Adam Draper", b: "Tim Draper", c: "Barry Silbert", d: "Ryan X Charles"
        },
        correctAnswer: "b"
    },
    {//6
        question: "<h5>6. What is the name of the Bitcoin developer Satoshi handed over the reigns to?</h5>",
        answers: {
            a: "Gavin Andresen", b: "Marc Andreesen", c: "Mike Hearn", d: "Greg Maxwell"
        },
        correctAnswer: "a"
    },
    {//7
        question: "<h5>7. Which coin hardforked from Bitcoin on August 1st, 2017, to pursue the path Satoshi laid out?</h5>",
        answers: {
            a: "Litecoin", b: "Bitcoin Cash", c: "DASH", d: "Ethereum"
        },
        correctAnswer: "b"
    },
    {//8
        question: "<h5>8. Which cryptocurrency was created by Brandon Eich, creator of Javascript and founder of Mozilla?</h5>",
        answers: {
            a: "Basic Attention Token", b: "Civic", c: "Zcash", d: "Ripple"
        },
        correctAnswer: "a"
    },
    {//9
        question: "<h5>9. Who created the Bitcoin-Cash-based social-media network Yours.org?</h5>",
        answers: {
            a: "Ryan X Charles and Clemens Ley", b: "Satoshi Nakamoto", c: "Coinbase", d: "Microsoft"
        },
        correctAnswer: "a"
    },
    {//10
        question: "<h5>10. Who is the Chief Scientist at nChain?</h5>",
        answers: {
            a: "Satoshi Nakamoto", b: "Craig Wright", c: "Jimmy Nguyen", d: "Unknown"
        },
        correctAnswer: "b"
    },

];

var incorrectAnswers = 0;
var correctAnswers = 0;
var unchecked = 0;
var clock = 90
var intervalId;

$(document).ready(function () {

    $("#submit").hide() // hides the submit button

    $('.start').click(function () {// upon click of button, the Quizbegins.
        startQuiz();
    })

    function startQuiz() {

        clearInterval(intervalId)
        clock = 90;
        $("#timer").show()

        clockRun();
        
        $('#submit').click(function(){
            submit()
        })

        $("#correct").html("")
        $("#incorrect").html("")
        $("#unchecked").html("")

        $("h4").hide();
        $(".start").hide(); // hides the start button
        $("#submit").show(); // shows the submit button
        $("#questions").show().empty()

        for (var i = 0; i < Questions.length; i++) {//iterates through Questions(10)

            var questioncontainer = $("<p>") //variable questioncontainer assigned a paragraph.
            questioncontainer.html(Questions[i].question)//html of the question is being looped with the question. a paragraph is added to each because of testing

            var fieldset = $('<fieldset id=' + i + '>')
            questioncontainer.append(fieldset)

            for (var letter in Questions[i].answers) {
                
                fieldset.append('<input type="radio" name=' + i + ' value="' + letter + '">' + Questions[i].answers[letter] + " ")//previously had class="radio"
                console.log(Questions[i].answers)
            }

            questioncontainer.append('</fieldset>')
            $("#questions").append(questioncontainer);

        }
    }
    
    function submit() {

        incorrectAnswers = 0;
        correctAnswers = 0;
        unchecked = 0;

        clearInterval(intervalId)
        
        for (var i = 0; i < Questions.length; i++) {
            var selected_value = $('input[name=' + i + ']:checked').val();
            //console.log(selected_value)
            //console.log(Questions[i].correctAnswer)
            if (Questions[i].correctAnswer === selected_value) {
                correctAnswers++;

            } else if (selected_value == undefined) {
                unchecked++;
                console.log(selected_value)
            }
                else {
                    incorrectAnswers++
                }
            
        }

        $("#correct").html("Correct Answers: " + correctAnswers)
        $("#incorrect").html("Incorrect Answers: " + incorrectAnswers)
        $("#unchecked").html("Unchecked Answers: " + unchecked)

        $("#submit").hide()
        $("#questions").hide()
        $(".start").show()
        $("#timer").hide()
    }

    function clockRun() {
        intervalId = setInterval(decrement, 1000);
    }

    function decrement() {

        clock--;

        $("#timer").html("<h2>" + clock + "</h2>")

            if (clock === 0) {
                clearInterval(intervalId)
                submit()
            } 
    }
})
