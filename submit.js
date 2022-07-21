const SITE_KEY = "6LdgLucgAAAAAGOn0l3Al1IXBGAQqIVQUvCkSAjJ"
const SECRET_KEY = "6LdgLucgAAAAAOgZQTenBN_3h2Yu0h9eWYlmm_0r"

document.getElementById("form-container").addEventListener("submit", function (event) {
  onSubmitForm(event)
})


function onSubmitForm(e) {

  // console.log(e)

  e.preventDefault()
  grecaptcha.ready(function () {
    grecaptcha.execute(SITE_KEY, { action: 'submit' }).then(function (token) {

      console.log(token)

      const URL = `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${token}`

      console.log(URL)


      try {

        // async function teste(url) {

        //   let headerData = JSON.stringify({
        //     "Accept": "*/*",
        //     "Cache-Control": "no-cache",
        //     "Accept-Encoding": "gzip, deflate",
        //     "Connection": "keep-alive"
        //   });

        //   const request = {
        //     "method": "POST",
        //     "headers": headerData
        //   };

        //   return await fetch(url, request)
        //     .then((httpResponse) =>
        //       httpResponse.json()
        //     )
        // }

        // teste(URL)
        // .then(data => console.log(data))


        async function postData(url) {

          const response = await fetch(url, {
            method: "POST",
            mode: 'no-cors',
            // cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              "Content-Type": "application/json",
              'Accept': 'application/json'
            },
            // redirect: 'follow',
            // referrerPolicy: 'no-referrer',
            // body: JSON.stringify(data)
          })

            .then(res => console.log("data", res.json()))
            //.then(data => console.log("data", data))
            .catch(error => console.log("erro", error))

          return response.json()
        }

        postData(URL)
          .then(data => console.log(data))


        // fetch(URL, {method: "POST", headers: {
        //   "Content-Type": "application/json",
        //   "Access-Control-Allow-Origin": "*"
        // }})
        // .then((res) => {
        //   res.json()
        // })
        // .then((data) => {console.log(data)})
        // .catch((error) => console.log("erro", error))



        // const xhttp = new XMLHttpRequest()
        // xhttp.open("POST", URL)

        // xhttp.onreadystatechange = function () {//Função a ser chamada quando a requisição retornar do servidor
        //   if (xhttp.readyState == 4 && xhttp.status == 200) {//Verifica se o retorno do servidor deu certo
        //     console.log(xhttp.responseText)
        //   }
        // }

        // xhttp.send()


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
              // document.location.reload(true)

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