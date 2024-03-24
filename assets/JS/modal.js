
// Fenêtre modale 
const modal = document.getElementById("modal");
const openModal = document.querySelector(".openModal");
const closeModal = document.getElementById("close-button");

openModal.addEventListener("click", () => {
    modal.showModal();
})

closeModal.addEventListener("click", () => {
    modal.close("close");
})



// Création des éléments de la galerie modale
const modalContainer = document.querySelector(".modalGallery")



function genererImagesModale(works) {
    modalContainer.innerHTML = '';
    for (let i = 0; i < works.length; i++) {
        
        const modalImage = document.createElement("img")
        const deleteButton = document.createElement("i")
        const modalElements = document.createElement("figure")
        const deleteButtonBox = document.createElement("div")
    
        deleteButtonBox.classList.add("deleteButton-box")
    // Icône de poubelle pour supprimer les travaux    

        deleteButton.classList.add("fa-solid", "fa-trash-can");
        
        modalImage.src = works[i].imageUrl;
        modalElements.appendChild(modalImage);
        modalElements.appendChild(deleteButtonBox);
        deleteButtonBox.appendChild(deleteButton);
        modalContainer.appendChild(modalElements);

	    deleteButton.setAttribute("data-index", works[i].id);
        
    
        
        
        deleteButton.addEventListener("click", function() {
            console.log(this)
            console.log(this.getAttribute("data-index"))
            const worksId = this.getAttribute("data-index");

            fetch("http://localhost:5678/api/works/"+worksId, {
        method: "DELETE",
        headers: {"Content-Type": "application/json", 
                "Authorization":"Bearer "+localStorage.getItem("token")}
        
    }).then(function (response) {
        console.log(response)
        fetch("http://localhost:5678/api/works").then(function(response){
            return response.json();
            
        }).then(function(allworks){
            console.log(allworks)
            genererImagesModale(allworks);
            //genererTravaux(allworks);
        });

        

    })
    

        })

        
        }
}





// Deuxième fenêtre modale 
const openSecondModal = document.getElementById("openSecondModal-button");
const secondModal = document.querySelector(".secondModal");
const closeSecondModal = document.getElementById("secondclose-button");
const previousModal = document.getElementById("previous");



openSecondModal.addEventListener("click", () => {
    secondModal.showModal()
})

closeSecondModal.addEventListener("click", () => {
    secondModal.close()
})

previousModal.addEventListener("click", () => {
    secondModal.close();
})



