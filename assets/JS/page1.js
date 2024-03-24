

const form = document.querySelector('.formulaire');
console.log(form)
const btnSubmit = document.getElementById('login');
const messageContainer = document.getElementById("formulaireMessage")

form.addEventListener("submit", userLogin )

async function userLogin(event) {
    event.preventDefault();
    
        //Récupérer les valeurs des champs 
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        
        
        // Objet pour la requête
        const data = {
                "email":email,
                "password":password,
        };

        //Création de la charge utile au format JSON
        const chargeUtile = JSON.stringify(data);

        
        
        //Appel de la fonction fetch

        fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: chargeUtile
    }).then(function (response) {
        if (response.status != 200) {
            //afficher le message d’erreur
            console.log(response.json())

            const errorMessage = document.createElement("div")
            errorMessage.innerText = "erreur d'authentification";
            messageContainer.appendChild(errorMessage);
        } else {
            return response.json();
        }
    }).then(function (data) {
        console.log(data)
        localStorage.setItem("token", data.token);
        window.location.assign("index.html")
    }
    )}

    
       
        
        
cde
        

       





