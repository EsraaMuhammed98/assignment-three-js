var siteName = document.getElementById('siteName');
var siteUrl = document.getElementById('siteUrl');
var form = document.querySelector('form');
var inputs = document.querySelectorAll('form input')
 var poppup = document.getElementById('alert-box');
 var xMark= document.getElementById('xMark');
 var main = document.querySelector('main')
 var poppupWarning = document.getElementById('poppup-warning')

//  var main = document.getElementsByTagName('main')[0]
var bookmark = document.getElementsByClassName('bookmark')[0];
var tableBody = document.getElementById('table-body')


form.addEventListener('click',function(e){
e.preventDefault()
})




// var regUrl = /^(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/

// var regUrl =  /^(https:\/\/)(www.)|(http:\/\/)(www.)/

// var testUrl = regUrl.test(siteUrl.value);

// ==================================
var favoriteSites = [];
if(JSON.parse(localStorage.getItem('Fav Sites')) !=null){
    favoriteSites = JSON.parse(localStorage.getItem('Fav Sites'))
    displayData()
}


// ==================================================
// check valid or not 

for(let i =0 ; i<inputs.length ; i++){
    inputs[i].addEventListener('keyup',function () {
        for(let j = 0 ; j<favoriteSites.length ; j++){
        if(siteName.value === favoriteSites[j].name){
                poppupWarning.style.display='block'   
                
            }else if(siteName.value.length  < 3 || siteName.value.length == 0 ){
                siteName.classList.add('not-valid');
                    siteName.classList.remove('valid');  
        }else{
                poppupWarning.style.display='none' 
                 siteName.classList.add('valid');
                    siteName.classList.remove('not-valid');
            }
       
    }

        if( siteUrl.value == 0 ||  /^(https:\/\/)(www.)|(http:\/\/)(www.)/.test(siteUrl.value)  == false ){
             siteUrl.classList.add('not-valid');
            siteUrl.classList.remove('valid');
        }else{
             siteUrl.classList.add('valid');
            siteUrl.classList.remove('not-valid');
        }
      })
}


// =================================================
function closePoupp(){

    xMark.addEventListener('click',function(){
        poppup.style.cssText='display:none;';
        main.style.filter='brightness(100%)'

       })
}
//==================================================== 
 
function addFavSite(){
 
    if( siteName.value.length  < 3 || siteName.value.length == 0  ||  siteUrl.value == 0 ||  /^(https:\/\/)(www.)|(http:\/\/)(www.)/.test(siteUrl.value) == false ){
        poppup.style.cssText='display:block';
        main.style.filter='brightness(60%)'
        closePoupp()
 
}
else{
    poppup.style.display = 'none'
    var allsites = {
        name:siteName.value,
        url:siteUrl.value
    }
    // isExiste()
                favoriteSites.push(allsites)
  
   
 localStorage.setItem('Fav Sites',JSON.stringify(favoriteSites))

}

displayData()

siteName.value='';
siteUrl.value='';
siteName.classList.remove('valid' , 'not-valid')
siteUrl.classList.remove('valid' , 'not-valid')
 
}
function displayData ( ){
    var allData = ''
    for(let i = 0 ; i<favoriteSites.length ; i++){
     allData+= `
     <tr>
     <td>${i}</td>
     <td>${favoriteSites[i].name}</td>
     <td><button class="btn btn-v" onclick='visitSite(${i})'><i class="fa fa-eye pe-2 fs-6"></i>Visit</button></td>
     <td><button class="btn btn-danger btn-delete" onclick='deleteSite(${i})'><i class="fa fa-trash pe-2 fs-6"></i>Delete</button></td>
 </tr>`
    }

    tableBody.innerHTML= allData
}


function deleteSite(index){
            favoriteSites.splice(index , 1);
            localStorage.setItem('Fav Sites',JSON.stringify(favoriteSites))

            displayData()
}


function visitSite(index){
    var getUrl = favoriteSites[index];

    open(getUrl.url ,' _blank')

}

// function isExiste() {
//     for (let i = 0; i < favoriteSites.length; i++) {
//         if(siteName.value !== favoriteSites[i].name){
//             poppupWarning.style.display='none' 
//             favoriteSites.push(all)  
            
//         }else{
//             poppupWarning.style.display='block'   
//         }
        
//     }
//   }