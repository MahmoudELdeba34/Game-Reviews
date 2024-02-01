let ids=[]
let index=Array.from(document.querySelectorAll(".card"));
let parent=document.getElementById("parent");
let Delete=document.getElementById("cancel");
let title=document.getElementById('title');
let platform=document.getElementById('platform');
let Status=document.getElementById('status');
let globalApiResponse;
let imgs=document.getElementById("imgs")
let final=[]
console.log(parent);
console.log(index);
/*********************************************************Start*****************************************************/
/**
 * *to show the parent layer => change the layer form display none into dispaly flex :
*/
for(let i=0;i<index.length;i++){
    index[i].addEventListener('click',function(){
        parent.style.display="flex";
        
    })
}
/*********************************************************END********************************************************/
/*********************************************************Start*****************************************************/
/**
 **to hide the parent layer => change the layer form display flex into dispaly none : 
 */

Delete.addEventListener('click',function(){
    parent.style.display='none'
})
/*********************************************************END********************************************************/  
let nav_links = document.getElementsByClassName("nav-link");
for (let i = 0; i < nav_links.length; i++) {
    nav_links[i].addEventListener('click', function (e) {
        const clickedNavLinkText = e.target.innerHTML;
        console.log(clickedNavLinkText);

        // Call fetchApiForCatigory with the clicked nav link text
       fetchApiForCatigory(clickedNavLinkText).then(()=>{
        let timerInterval;
        Swal.fire({
        title: "welcom !",
        html: "I will get data  <b></b> wating please .",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
        }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was refresh by the timer");
        }
        }).then(()=>{
            displayCategory()
            });
        })
            });
        }
// class FetchApi {
//     constructor() {
//     }
//     async fetchApiForCatigory(category) {
//         const options = {
//             method: 'GET',
//             headers: {
//                 'X-RapidAPI-Key': '3bb1a2c278msh3491ec274022c15p1065d9jsn80c36da1e43f',
//                 'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
//             }
//         }

//         const request = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);
//         this.globalApiResponse = await request.json(); // Store the API response within the class
//         console.log(this.globalApiResponse);
//     }

//     getTitles() {
//         return this.globalApiResponse.map(game => game.title);
//     }

//     getThumbnails() {
//         return this.globalApiResponse.map(game => game.thumbnail);
//     }

//     // Add more methods for other operations you want to perform on the API response
// }


    async function fetchApiForCatigory(category="mmorpg") {
        // const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games?category=shooter';
        const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3bb1a2c278msh3491ec274022c15p1065d9jsn80c36da1e43f',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    }
    
        const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);
        const result = await response.json();
        console.log(result);
        final=result
        gameDetalis()
    }

function displayCategory() {
    let data = '';
    for (let i = 0; i < final.length; i++) {
            data += `
            <div class="col-md-3 mb-5"
            <a href="" class="text-decoration-none text-white next">
            <div class="card h-100 " style="width: 18rem;" >
            <img src=${final[i].thumbnail} alt="...">
            <div class="d-flex justify-content-between">
            <div><h6 class="ms-2 mt-3">${final[i].title}</h6></div>
            <div><a href="#" class="text-decoration-none text-black"><p class="me-2 mt-3 bg-danger rounded-4 p-2 free"> free</p></a></div>
            </div>
             <div class="card-body">
              <h6 class="card-subtitle mb-2">Card subtitle</h6>
             <p class="card-text">${final[i].short_description}</p>
             <a href="" class="btn mr-2 mb-2 w-100 "><i class="fas fa-link "></i>${final[i].platform}</a>
            <a href="" class="btn mx-auto w-100 "><i class="fab fa-github"></i>${final[i].publisher}</a>
        </div>
      </div>
      </a>
      </div>
            `;
        }

    document.getElementById("body").innerHTML = `<div class="row">${data}</div>`;
    let index=Array.from(document.querySelectorAll(".card"));
    let parent=document.getElementById("parent");
    let Delete=document.getElementById("cancel");
    

    /*********************************************************Start*****************************************************/
/**
 * *to show the parent layer => change the layer form display none into dispaly flex :
*/
for(let i=0;i<index.length;i++){
    index[i].addEventListener('click',function(){
        parent.style.display="flex";
        
    })
}
/*********************************************************END********************************************************/
/*********************************************************Start*****************************************************/
/**
 **to hide the parent layer => change the layer form display flex into dispaly none : 
 */

Delete.addEventListener('click',function(){
    parent.style.display='none'
})
}
/*********************************************************START DISPLAY DETELS Game ****************************-------**************-------**/
async function gameDetalis(){
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=20`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3bb1a2c278msh3491ec274022c15p1065d9jsn80c36da1e43f',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    
   
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
        let data;
    //     for(let i=0;i<final.length;i++){
    //         data +=`
        
    //         <h1>title: </h1>
    //  <h4 class="pb-3 " id="title">Category: <span class="bg-primary p-2 rounded-pill">${final[i].title}</span></h4>
    //  <h4 class="pb-3 " id="platform">Platform: <span class="bg-primary p-2 rounded-pill">${final[i].Platform}</span></h4>
    //  <h4 class="pb-3 " id="status">Status: <span class="bg-primary p-2 rounded-pill">${final[i].status}</span></h4>
    //  <p id="content">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto animi molestias modi ipsum culpa cupiditate alias reiciendis veritatis labore, quis minima quaerat, earum, unde nesciunt consequuntur recusandae quae quam voluptates!</p>
    //   <a href="https://www.google.com " target="_blank" class="text-decoration-none "><button class="btu">Show Game</button></a>
    //   <button  class="btu1" id="cancel">cancel</button>
    //         `
            
    //     }
    //     document.getElementById("mahmoud").innerHTML=data
    title.innerHTML
    }



