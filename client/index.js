const SERVER = "http://localhost:4000"
helloSalut()


function helloSalut() {
  $.ajax({
    method: "GET",
    url: SERVER + "/salut",
  }).done(response => {
    $("#hello-salut").empty();
    $("#hello-salut").append(`
      <h1>${response.hello}</h1>
      <p class="text-muted">Hello</p>
    `);
  }).fail(err => {
    console.log(err)
  })
}


