const SITE_KEY = "6LdgLucgAAAAAGOn0l3Al1IXBGAQqIVQUvCkSAjJ"
const SECRET_KEY = "6LdgLucgAAAAAOgZQTenBN_3h2Yu0h9eWYlmm_0r"

document.getElementById("form-container").addEventListener("submit", function (event) {
  onSubmitForm(event)
})


function onSubmitForm(e) {

  console.log(e)

  e.preventDefault()
  grecaptcha.ready(function () {
    grecaptcha.execute(SITE_KEY, { action: 'submit' }).then(function (token) {

      console.log(token)

      const URL = `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${token}`

      console.log(URL)
      
      
      try {
        
        const xhttp = new XMLHttpRequest()
        xhttp.open("POST", URL)
  
        xhttp.onreadystatechange = function () {//Função a ser chamada quando a requisição retornar do servidor
          if (xhttp.readyState == 4 && xhttp.status == 200) {//Verifica se o retorno do servidor deu certo
            console.log(xhttp.responseText)
          }
        }
  
        xhttp.send()
        

        //verifica se algum campo obrigatório está vazio
        const checkForm = () => {
          const inputs = document.getElementsByClassName('input-style')
          const len = inputs.length
          let valid = true

          for (let i = 0; i < len; i++) {
            if (!inputs[i].value) { valid = false }
          }
          if (!valid) {
            throw "ERROR - internalCode: 999999"
          } else { return true }
        }
        
        
        const submitForm = () => {

          //exemplo de resposta
          const response = {
            "success": true,
            "challenge_ts": "2022-07-21T12:12:13Z",
            "hostname": "localhost",
            "score": 0.9,
            "action": "submit"
          }
    
          // variável que simula uma resposta do backend escolhendo um número aleatório entre 1 e 10
          const backendResponse = Math.floor(Math.random() * 10 + 1)
    
          // se o número for par, deu tudo certo no backend
          if (backendResponse % 2 === 0) {
    
            console.log(backendResponse)
    
            if (response.success === true && response.score >= 0.5) {
              alert("Success!")
              document.location.reload(true)
    
            } else if (response.success === false || response.score < 0.5) {
              throw "ERROR - internalCode: 131"
            }
          }
          // se for ímpar, sinaliza que deu um erro no backend
          else {
            console.log(backendResponse)
    
            throw "ERROR - internalCode: 450"
          }
        }

        checkForm()
        submitForm()


      } catch (error) {
        alert(error)
      }

    })
  })
}