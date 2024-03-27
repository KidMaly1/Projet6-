
// Formulaire de la deuxième fenêtre modale pour l'ajout de travaux 
const modalForm = document.getElementById("modalForm-img");

modalForm.addEventListener("submit", (e) => {

e.preventDefault();

// Récupérer les valeurs des champs
const titleValue = document.getElementById("title").value.trim();
const categoryValue = document.getElementById("category").value.trim();
    const  formData = new FormData();
    const imgModal = document.getElementById("imgUrl");
    

    const file = imgModal.files[0]    

    formData.append("image", file);
    formData.append("title", document.getElementById("title").value);
    formData.append("category", document.getElementById("category").value);

    // Vérifier si tous les champs sont remplis
    if (titleValue === '' || categoryValue === '' || !file) {
        // Afficher un message d'erreur
        alert('Veuillez remplir tous les champs du formulaire.');
        return; // Arrêter l'exécution de la fonction
    }
    
    console.log(formData);

    

    fetch("http://localhost:5678/api/works",{
        method : "POST",
        headers: {"Authorization":"Bearer "+localStorage.getItem("token")},
        body: formData

    })
    
    .then(function (response) {
        if (response.status != 201) {
            //afficher le message d’erreur
            console.log(response.json())

            const error = document.createElement("div")
            error.innerText = "erreur";
            modalForm.appendChild(error);
        } else {
            return response.json();
        }
    })

    .then(function (data) {
        console.log(data)
        
        closeTheModal()
        
    }
    )}
)

    // Afficher l'image selectionnée 
    document.getElementById('imgUrl').addEventListener('change', function(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    const fileButton = document.querySelector(".file-button");

    reader.onload = function(e) {
        var imgPreview = document.getElementById('imgPreview');
        imgPreview.innerHTML = '<img src="' + e.target.result + '"/>';
    };
    reader.readAsDataURL(file);

    fileButton.style.display = "none";

});

    // Fermer la deuxième fenêtre modale 
    async function closeTheModal () {
        try{
        const reponse = await fetch("http://localhost:5678/api/works");
        const allworks =  await reponse.json();

    genererTravaux(allworks);
    genererImagesModale(allworks);
    secondModal.close();
    modal.close("close");
        }catch(error){console.log(error)}
}

const closeButton = document.getElementById("secondclose-button")

closeButton.addEventListener("click", function () {
    secondModal.close();
    modal.close("close");
}
)

