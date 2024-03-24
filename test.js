    // to do : récupérer les valeurs du formulaire
    // to do : faire une requète à l'API

//Appel de la fonction fetch
fetch("http://localhost:5678/api/users/login"),{
    method: "POST",
    headers: {"Content-Type": "application/json" },
    body: chargeUtile
}

// 

function userLogin() {
    

    form.addEventListener("submit", function (event) {
     event.preventDefault();
    
    //Récupérer les valeurs des champs 
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
   
 
     // Objet pour la requête
     const data = {
         email:email,
         password:password,
     };
 
     //Création de la charge utile au format JSON
     const chargeUtile = JSON.stringify(data);

     //Appel de la fonction fetch
     fetch("http://localhost:5678/api/users/login"),{
         method: "POST",
         headers: {"Content-Type": "application/json" },
         body: chargeUtile
     }

 });


 fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({"userId": 1, "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4"})

}).then(function (response) {
    if (response.status != 200) {
        //afficher le message d’erreur
    } else {
        return response.json();
    }
}).then(function (data) {
    console.log(data)
    console.log(data.userId)
    console.log(data.token)

    // Enregistrer le token dans le localStorage
    localStorage.setItem("token", data.token);
    
    // Rediriger l’utilisateur vers la page d’accueil
    window.location.assign("index.html")
});