const SERVER = "http://localhost:4000"

$(document).ready(function () {
    const token = localStorage.getItem("access_token")
    if(token){
        $("#login").show()
        $("#register").hide()
    } else {
        $("#register").show()
        $("#login").hide()
    }
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
        const token = response.access_token
        localStorage.setItem("token", token)
        
        $('#login').hide()
        $('#home').show()
    })
    .fail(err => {
        console.log(err)
    })

}

function register(event) {
    event.preventDefault();
    const first_name = $("#register-firstname").val()
    const last_name = $("#register-lastname").val();
    const email = $("#register-email").val();
    const password = $("#register-password").val();
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
    }).fail(err => {
      $(".error-message").empty();
      $(".error-message").append(`
        <p class="alert alert-danger" role="alert" style="color: red;">${err.responseJSON.message}</p>
      `)
    })
  }