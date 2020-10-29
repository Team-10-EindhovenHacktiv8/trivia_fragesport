const SERVER = "http://localhost:3000"

$(document).ready(() => {
  fetchCategory()
})

function initquestion(e){
  e.preventDefault()
  const idCategory = $('#idcategory').val()
  const amountQuestion = $('#amountquestion').val()
  const difficulty = $('#difficulty').val()
  console.log(idCategory)
  console.log(amountQuestion)
  console.log(difficulty)

  $.ajax({
    method: "POST", 
    url: SERVER + "/trivia",
    data: {
      idCategory,
      amountQuestion,
      difficulty
    }
  })
  .done(data => {
    $("#triviainit").hide()
    $("#quiz").show()
    console.log(data)
  })
  .fail(err => {
    console.log(err)
  })

}
function fetchCategory(){
  $.ajax({
    method:"GET",
    url: SERVER + "/categories"
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
