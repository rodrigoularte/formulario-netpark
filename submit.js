// const onSubmitForm = () => {
//   alert("Success!")
// }

document.getElementById("form-container").addEventListener("submit", function(event){
  onSubmitForm(event)
})


function onSubmitForm(e) {
  alert("teste")
  console.log(e)
  e.preventDefault()
  grecaptcha.ready(function () {
    grecaptcha.execute('6LdgLucgAAAAAGOn0l3Al1IXBGAQqIVQUvCkSAjJ', { action: 'submit' }).then(function (token) {
      console.log("yusaguy")
      console.log(token)
      
      console.log(grecaptcha.getResponse("form-container"))

    })
  })
}