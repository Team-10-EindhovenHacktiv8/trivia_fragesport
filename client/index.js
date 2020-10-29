const SERVER = "http://localhost:3000"

$(document).ready(() => {
  fetchCategory()
})

function fetchCategory(){
  $.ajax({
    method:"GET",
    url: SERVER + "/categories"
  })
  .then(data => {
    console.log(data)
  })
  .fail(err => {
    console.log(err)
  })
}

function initquestion(){
  $.ajax({
    method:"POST",
    url: SERVER + "/trivia"
  })
}