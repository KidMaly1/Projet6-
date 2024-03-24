var allworks = {};
async function loadWorks() {
    const reponse = await fetch("http://localhost:5678/api/works");
    allworks =  await reponse.json();
    const reponsecategories = await fetch("http://localhost:5678/api/categories");
    const categories =  await reponsecategories.json();
    console.log(categories)
    genererTravaux(allworks);
    genererImagesModale(allworks);
    boutonCategories(categories)
}

function initializePage() {
    loadWorks();
    
  }
  window.addEventListener("load", initializePage);


const gallerycontainer = document.querySelector(".gallery")

 function genererTravaux(works) {
    gallerycontainer.innerHTML = '';

for (let i = 0; i < works.length; i++) {
    
    const elements = document.createElement("figure")
    gallerycontainer.appendChild(elements);

    const elementsImage = document.createElement("img");

    elementsImage.src = works[i].imageUrl;
    

    const elementsTitle = document.createElement("figcaption")
    elementsTitle.innerText = works[i].title;
    
    
    
    elements.appendChild(elementsImage);
    elements.appendChild(elementsTitle);
    
    
    }
}





function boutonCategories (categories) {

    
    const btnCategories = document.querySelector(".categories")
    console.log(btnCategories)
    const bouton = document.createElement("input");
    bouton.setAttribute("data-index", "0");
    bouton.type = "button";
    bouton.value = "Tous";
    bouton.id = "btn-0";
        console.log(bouton)
    btnCategories.appendChild(bouton)

    for (let i = 0; i < categories.length; i++) {

        
    const bouton = document.createElement("input");
    bouton.type = "button";
    bouton.value = categories[i].name;
    bouton.id = "btn-"+categories[i].id;
        console.log(bouton)

        bouton.setAttribute("data-index", categories[i].id);

    btnCategories.appendChild(bouton)

    }


    const btns = document.querySelectorAll(".categories input")
for (let i = 0; i < btns.length; i++) {


btns[i].addEventListener("click", filtres)
}
}


function filtres () {

    console.log(this)
    console.log(this.getAttribute("data-index"))

    const category_id = this.getAttribute("data-index")
    if (category_id == "0") {
        genererTravaux(allworks)
    } else {
        const filtreHotels = allworks.filter((work) =>
    work.category.id == category_id);

    

    genererTravaux(filtreHotels);
    
    }
}

function connected() {
    // Code pour vérifier si l'utilisateur est connecté
    const token = localStorage.getItem("token")
    console.log(token)
    if (token){
        console.log("connected")
        return true
    }
    
    console.log("not connected")
    return false
}

// Après que l'utilisateur se soit connecté avec succès
if (connected()) {
    // Modifie l'élément "login" en "logout"
    document.getElementById("loginLogout").textContent = "logout";

document.getElementById("loginLogout").addEventListener("click", (event) => {
    event.preventDefault
    localStorage.removeItem("token")
    window.location.assign("index.html")
})
}






