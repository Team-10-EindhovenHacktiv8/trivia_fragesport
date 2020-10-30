

const SERVER = "http://localhost:4000";

$(document).ready(()=> {
  const token = localStorage.token;
  $("#register-page").hide();
  $("quiz").hide()
  $(".register-success").empty();
  $(".error-message").empty();
  if(token) {
    helloSalut()
    $("#landing-page").hide();
    $("#home-page").show();
    $("quiz").hide()
    fetchCategory();
  } else {
    $("#landing-page").show();
    $("#home-page").hide();
    $("quiz").hide()
  }
})

$("#register-link").on("click", () => {
  $("#register-page").show();
  $(".register-success").empty();
  $(".error-message").empty();
  $("#landing-page").hide();
  $("#home-page").hide();
})

$(".cancel-button").on("click", () => {
  $("#add-todo-page").hide();
  $("#edit-todo-page").empty();
  ready();
})

$("#logout-button").on("click", () => {
  $("#landing-page").show();
  $("#home-page").hide();
  $(".error-message").empty();
  signOut()
  localStorage.clear()
})

function login(e){
    e.preventDefault()
    const email = $("#login-email").val()
    const password = $("#login-password").val()
    $.ajax({
        method: "POST",
        url: SERVER + "/login",
        data: {
            email: email,
            password: password
        }
    })
    .done(response => {  
        const token = response.access_token;
        const first_name = response.first_name;
        localStorage.setItem("token", token);
        localStorage.setItem("first_name", first_name);
        ready();
        helloSalut();
        fetchCategory();
    })
    .fail(err => {
      $(".error-message").empty();
      console.log(err)
      $(".error-message").append(`
        <p class="alert alert-danger" role="alert" style="color: red;">${err.responseJSON.message}</p>
      `);
      setTimeout(() => {
        $(".error-message").empty();
      }, 3000)
    })
}

function register(event) {
    event.preventDefault();
    const first_name = $("#reg-first-name").val();
    const last_name = $("#reg-last-name").val();
    const email = $("#reg-email").val();
    const password = $("#reg-password").val();
    $.ajax({
      method: "POST",
      url: SERVER + "/register",
      data: {
        first_name,
        last_name,
        email,
        password
      }
    }).done(response => {
      $("#landing-page").show();
      $("#home-page").hide();
      $("#register-page").hide();
      $(".register-success").empty();
      $(".register-success").append(`
        <p class="alert alert-success" role="alert" style="color: green;">Successful register</p>
      `)
      setTimeout(() => {
        $(".register-success").empty();
      }, 3000)
    }).fail(err => {
      $(".error-message").empty();
      $(".error-message").append(`
        <p class="alert alert-danger" role="alert" style="color: red;">${err.responseJSON.message}</p>
      `)
      setTimeout(() => {
        $(".error-message").empty();
      }, 3000)
    })
  }

  function onSignIn(googleUser) {
    var google_access_token = googleUser.getAuthResponse().id_token;
    // localStorage.setItem('access_token', token)
    $.ajax({
        method:'POST',
        url:'http://localhost:4000/googleLogin',
        data:{
            google_access_token
        }
    }) 
    .done(response => {
      localStorage.setItem("token", response.access_token)
      localStorage.setItem("first_name", response.first_name)
      helloSalut()
      ready()
    })
    .fail(err => {
        console.log(err)
    })
  }

  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

  function ready() {
    $(document).ready(()=> {
      const token = localStorage.token
      $("#register-page").hide();
      $(".register-success").empty();
      $(".error-message").empty();
      if(token) {
        $("#landing-page").hide();
        $("#home-page").show();
      } else {
        $("#landing-page").show();
        $("#home-page").hide();
      }
    })

  }


  function helloSalut() {
    $.ajax({
      method: "GET",
      url: SERVER + "/salut",
    }).done(response => {
      const user = localStorage.getItem("first_name")
      $("#hello-salut").empty();
      $("#hello-salut").append(`
        <h1>${response.hello} ${user}</h1>
        <p class="text-muted">Hello ${user}</p>
      `);
      setTimeout(() => {
        $("#hello-salut").empty();
      }, 5000)
    }).fail(err => {
      console.log(err)
    })
  }

function initquestion(e){
  e.preventDefault()
  const access_token = localStorage.getItem("token")
  const idCategory = $('#idcategory').val()
  const amountQuestion = $('#amountquestion').val()
  const difficulty = $('#difficulty').val()
  $.ajax({
    method: "POST", 
    url: SERVER + "/trivia",
    data: {
      idCategory,
      amountQuestion,
      difficulty,
    },
    headers:{
      access_token
    }
  })
  .done(data => {
    $("#triviainit").hide()
    $("#quiz").show()
    let question = []
    for(let i = 0; i < data.length;i++){
      let answers = []
      let randomIndex = Math.floor(Math.random() * 4) 
      
      for(let j = 0;j < 3; j++){
        answers.push(data[i].incorrect_answers[j])
      }
      answers.splice(randomIndex,0,data[i].correct_answer)

      let element = {
        'q': data[i].question,
        'options': answers,
        'correctIndex':randomIndex,
        'correctResponse':'Correct',
        'incorrectResponse':`Wrong, the answer is ${answers[randomIndex]}` 
      }
      
      question.push(element)
    }   
    
    $('#quiz').quiz({
      counterFormat: 'Question %current of %total',
      questions: question
    });
    $("#home-page").hide();
    $("#quiz").show()
  })
  .fail(err => {
    console.log(err)
  })

}

function fetchCategory(){
  const access_token = localStorage.getItem("token")
  $.ajax({
    method:"GET",
    url: SERVER + "/categories",
    headers:{
      access_token
    }
  })
  .then(data => {
    data.forEach(el => {
      $("#idcategory").append(`
      <option value="${el.id}">${el.name}</option>
      `)
    })
  })
  .fail(err => {
    console.log(err)
  })
}

//jquery.quiz.js
;(function($, window, document, undefined) {

  'use strict';

  $.quiz = function(el, options) {
    var base = this;

    // Access to jQuery version of element
    base.$el = $(el);

    // Add a reverse reference to the DOM object
    base.$el.data('quiz', base);

    base.options = $.extend($.quiz.defaultOptions, options);

    var questions = base.options.questions,
      numQuestions = questions.length,
      startScreen = base.options.startScreen,
      startButton = base.options.startButton,
      homeButton = base.options.homeButton,
      resultsScreen = base.options.resultsScreen,
      gameOverScreen = base.options.gameOverScreen,
      nextButtonText = base.options.nextButtonText,
      finishButtonText = base.options.finishButtonText,
      restartButtonText = base.options.restartButtonText,
      currentQuestion = 1,
      score = 0,
      answerLocked = false;

    base.methods = {
      init: function() {
        base.methods.setup();

        $(document).on('click', startButton, function(e) {
          e.preventDefault();
          base.methods.start();
        });

        $(document).on('click', homeButton, function(e) {
          e.preventDefault();
          base.methods.home();
        });

        $(document).on('click', '.answers a', function(e) {
          e.preventDefault();
          base.methods.answerQuestion(this);
        });

        $(document).on('click', '#quiz-next-btn', function(e) {
          e.preventDefault();
          base.methods.nextQuestion();
        });

        $(document).on('click', '#quiz-finish-btn', function(e) {
          e.preventDefault();
          base.methods.finish();
        });

        $(document).on('click', '#quiz-restart-btn, #quiz-retry-btn', function(e) {
          e.preventDefault();
          base.methods.restart();
        });
      },
      setup: function() {
        var quizHtml = '';

        if (base.options.counter) {
          quizHtml += '<div id="quiz-counter"></div>';
        }

        quizHtml += '<div id="questions">';
        $.each(questions, function(i, question) {
          quizHtml += '<div class="question-container">';
          quizHtml += '<p class="question">' + question.q + '</p>';
          quizHtml += '<ul class="answers">';
          $.each(question.options, function(index, answer) {
            quizHtml += '<li><a href="#" data-index="' + index + '">' + answer + '</a></li>';
          });
          quizHtml += '</ul>';
          quizHtml += '</div>';
        });
        quizHtml += '</div>';

        // if results screen not in DOM, add it
        if ($(resultsScreen).length === 0) {
          quizHtml += '<div id="' + resultsScreen.substr(1) + '">';
          quizHtml += '<p id="quiz-results"></p>';
          quizHtml += '</div>';
        }

        quizHtml += '<div id="quiz-controls">';
        quizHtml += '<p id="quiz-response"></p>';
        quizHtml += '<div id="quiz-buttons">';
        quizHtml += '<a href="#" id="quiz-next-btn">' + nextButtonText + '</a>';
        quizHtml += '<a href="#" id="quiz-finish-btn">' + finishButtonText + '</a>';
        quizHtml += '<a href="#" id="quiz-restart-btn">' + restartButtonText + '</a>';
        quizHtml += '</div>';
        quizHtml += '</div>';

        base.$el.append(quizHtml).addClass('quiz-container quiz-start-state');

        $('#quiz-counter').hide();
        $('.question-container').hide();
        $(gameOverScreen).hide();
        $(resultsScreen).hide();
        $('#quiz-controls').hide();
      },
      start: function() {
        base.$el.removeClass('quiz-start-state').addClass('quiz-questions-state');
        $(startScreen).hide();
        $('#quiz-controls').hide();
        $('#quiz-finish-btn').hide();
        $('#quiz-restart-btn').hide();
        $('#questions').show();
        $('#quiz-counter').show();
        $('.question-container:first-child').show().addClass('active-question');
        base.methods.updateCounter();
      },
      answerQuestion: function(answerEl) {
        if (answerLocked) {
          return;
        }
        answerLocked = true;

        var $answerEl = $(answerEl),
          response = '',
          selected = $answerEl.data('index'),
          currentQuestionIndex = currentQuestion - 1,
          correct = questions[currentQuestionIndex].correctIndex;

        if (selected === correct) {
          $answerEl.addClass('correct');
          response = questions[currentQuestionIndex].correctResponse;
          score++;
        } else {
          $answerEl.addClass('incorrect');
          response = questions[currentQuestionIndex].incorrectResponse;
          if (!base.options.allowIncorrect) {
            base.methods.gameOver(response);
            return;
          }
        }

        $('#quiz-response').html(response);
        $('#quiz-controls').fadeIn();

        if (typeof base.options.answerCallback === 'function') {
          base.options.answerCallback(currentQuestion, selected, questions[currentQuestionIndex]);
        }
      },
      nextQuestion: function() {
        answerLocked = false;

        $('.active-question')
          .hide()
          .removeClass('active-question')
          .next('.question-container')
          .show()
          .addClass('active-question');

        $('#quiz-controls').hide();

        // check to see if we are at the last question
        if (++currentQuestion === numQuestions) {
          $('#quiz-next-btn').hide();
          $('#quiz-finish-btn').show();
        }

        base.methods.updateCounter();

        if (typeof base.options.nextCallback === 'function') {
          base.options.nextCallback();
        }
      },
      gameOver: function(response) {
        // if gameover screen not in DOM, add it
        if ($(gameOverScreen).length === 0) {
          var quizHtml = '';
          quizHtml += '<div id="' + gameOverScreen.substr(1) + '">';
          quizHtml += '<p id="quiz-gameover-response"></p>';
          quizHtml += '<p><a href="#" id="quiz-retry-btn">' + restartButtonText + '</a></p>';
          quizHtml += '</div>';

          base.$el.append(quizHtml);
        }
        $('#quiz-gameover-response').html(response);
        $('#quiz-counter').hide();
        $('#questions').hide();
        $('#quiz-finish-btn').hide();
        $(gameOverScreen).show();
        
      },
      finish: function() {
        base.$el.removeClass('quiz-questions-state').addClass('quiz-results-state');
        $('.active-question').hide().removeClass('active-question');
        $('#quiz-counter').hide();
        $('#quiz-response').hide();
        $('#quiz-finish-btn').hide();
        $('#quiz-next-btn').hide();
        $('#quiz-restart-btn').show();
        // $('#restartnew').show();
        $('#tenorgif').show();
        $(resultsScreen).show();
        
        if(score>=7){
          getExcited()
        }else{
          getLose()
        }
        var resultsStr = base.options.resultsFormat.replace('%score', score).replace('%total', numQuestions);
        $('#quiz-results').html(resultsStr);

        if (typeof base.options.finishCallback === 'function') {
          base.options.finishCallback();
        }
      },
      restart: function() {
        base.methods.reset();
        base.$el.addClass('quiz-questions-state');
        $('#questions').show();
        $('#quiz-counter').show();
        $('.question-container:first-child').show().addClass('active-question');
        base.methods.updateCounter();
      },
      reset: function() {
        answerLocked = false;
        currentQuestion = 1;
        score = 0;
        $('.answers a').removeClass('correct incorrect');
        base.$el.removeClass().addClass('quiz-container');
        $('#quiz-restart-btn').hide();
        $(gameOverScreen).hide();
        $(resultsScreen).hide();
        $('#quiz-controls').hide();
        $('#quiz-response').show();
        $('#quiz-next-btn').show();
        $('#quiz-counter').hide();
        $('.active-question').hide().removeClass('active-question');
      },
      home: function() {
        base.methods.reset();
        base.$el.addClass('quiz-start-state');
        $(startScreen).show();

        if (typeof base.options.homeCallback === 'function') {
          base.options.homeCallback();
        }
      },
      updateCounter: function() {
        var countStr = base.options.counterFormat.replace('%current', currentQuestion).replace('%total', numQuestions);
        $('#quiz-counter').html(countStr);
      }
    };

    base.methods.init();
  };

  $.quiz.defaultOptions = {
    allowIncorrect: true,
    counter: true,
    counterFormat: '%current/%total',
    startScreen: '#quiz-start-screen',
    startButton: '#quiz-start-btn',
    homeButton: '#quiz-home-btn',
    resultsScreen: '#quiz-results-screen',
    resultsFormat: 'You got %score out of %total correct!',
    gameOverScreen: '#quiz-gameover-screen',
    nextButtonText: 'Next',
    finishButtonText: 'Finish',
    restartButtonText: 'Restart'
  };

  $.fn.quiz = function(options) {
    return this.each(function() {
      new $.quiz(this, options);
    });
  };
}(jQuery, window, document));

// function newgame(){
//   $('#quiz').hide()
//   $('#quiz-response').hide();
//   $('#quiz-next-btn').hide();
//   $('#home-page').show();
// }

function getExcited(){
  const access_token = localStorage.getItem("token")
  $.ajax({
    method:"GET",
    url: SERVER + "/excited",
    headers:{
      access_token
    }
  })
  .done(data => {
    $('#tenorgif').empty()
    $('#tenorgif').append(`<img src=${data}>`)   
  })
  .fail(err => {
    console.log(err)
  })
}

function getLose(){
  const access_token = localStorage.getItem("token")
  $.ajax({
    method:"GET",
    url: SERVER + "/lose",
    headers:{
      access_token
    }
  })
  .done(data => {
    $('#tenorgif').empty()
    $('#tenorgif').append(`<img src=${data}>`)   
  })
  .fail(err => {
    console.log(err)
  })
}
