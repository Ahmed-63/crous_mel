// partie map
    let map = L.map('map').setView([50.629299083223216, 3.0571547673553234], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
// utilisation de fetch 

    const url = "https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=ensemble-des-lieux-de-restauration-des-crous&q=&rows=20&facet=type&facet=zone";

    let prototype = document.querySelector(".lieu");

    fetch(url)
        .then((response) => response.json())
        .then((response) => {
            // traitement JS

            const lieux = response.records;
            console.log(lieux[0].fields.title);
            // on fais une boucle pour lire les infos du tableau (lieu)
            
            for (let lieu of lieux){
                console.log(lieu.fields.title);
                console.log(lieu.fields.geolocalisation);
                let marker = L.marker(lieu.fields.geolocalisation).addTo(map);
                marker.addEventListener("click" , maBanniere);
                  
                    function maBanniere (){
                    prototype.innerHTML += `<div class="baniere">
                    <div class="picture">
                       <img src="/assets/img/picture.png">
                       <div class="description">                         
                          <p>${lieu.fields.contact}</p>
                          <p>${lieu.fields.infos}</p>
                       </div>
                    </div>
                    <div class="save">
                       <button class="enregistrer">Enregistrer</button>
                       <button class="close">X</button>
                    </div>
                 </div>`; 
                
                prototype.onclick = function(event){
                    let target = event.target;
                    if (target.className === "close"){
                        target.parentElement.parentElement.remove();
                    } else if (target.className === "enregistrer"){
                    
                        const allfavoris = 'keyfav';
                        const recupCaracterFav = localStorage.getItem(allfavoris);
                        const favs = JSON.parse(recupCaracterFav) || [];
                        let contact = lieu.fields.contact ;
                        let infos = lieu.fields.infos;
                        const nouveauFav = { contact, infos };
                        favs.push(nouveauFav);

                        localStorage.setItem(allfavoris , JSON.stringify(favs));
                    }
                }
            }
        }
        })
        
        .catch((error) => console.log("erreur de type : " + error))

 // Ajouter un marqueur sur la map

 





        