let favoris2 = document.querySelector(".favoris2");
let favorisrecup = JSON.parse(localStorage.getItem('keyfav'));

function addFav() {
    
    for (let izi = 0; izi < favorisrecup.length; izi++) {
        
        favoris2.innerHTML += ` <div class="baniere">
        <div class="picture">
           <img src="/assets/img/picture.png">
           <div class="description">                         
              <p>${favorisrecup[izi].contact}</p>
              <p>${favorisrecup[izi].infos}</p>
           </div>
        </div>
        <div class="save">
           <button class="close">X</button>
        </div>
     </div>  `;
    }
}
    addFav();
        favoris2.onclick = (e) => {
            let target = e.target;
            if (monBtnclose.getElementsByClassName == 'close') {
                target.parentElement.parentElement.remove();
                localStorage.clear()
            }
        }
