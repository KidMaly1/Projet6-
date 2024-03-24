
// Formulaire de la deuxième fenêtre modale pour l'ajout de travaux 
const modalForm = document.getElementById("modalForm-img");

modalForm.addEventListener("submit", (e) => {

e.preventDefault();

    const  formData = new FormData();
    const imgModal = document.getElementById("imgUrl");

    const file = imgModal.files[0]    

    

    formData.append("image", file);
    formData.append("title", document.getElementById("title").value);
    formData.append("category", document.getElementById("category").value);
    
    
    

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

            // fermer la deuxième fenêtre modale 
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

