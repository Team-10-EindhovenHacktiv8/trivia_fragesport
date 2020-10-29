const SERVER = "http://localhost:3002"

$(document).ready(()=> {
  const token = localStorage.token;
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
  localStorage.removeItem("token")
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
        localStorage.setItem("token", token);
        ready();
    })
    .fail(err => {
      $(".error-message").empty();
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
