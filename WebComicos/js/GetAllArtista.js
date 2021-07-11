window.onload = init;

var headers = {};
var url = "http://127.0.0.1:4000/user"

function init(){

    
    if(localStorage.getItem("Token")){
        
        headers = {
            headers:{
                'Authorization':"bearer " + localStorage.getItem("Token")
            }
        }
        LoadArtista()


    }
    else{
        window.location.href="Login.html"
    }
}

function LoadArtista(){

    axios.get(url + "/artista/getall",headers)
    .then(function(res){
        
        Display(res.data.message)
    }).catch(function(error){
        console.log(error)
    })
}

function Display(emp){
    
    var Table = document.querySelector("tbody")
    
    for(var i = 0;i<emp.length;i++){

       var row =  Table.insertRow(-1)
       
       var id_artista = row.insertCell(0)
       var Nombre = row.insertCell(1)
       var Apellido = row.insertCell(2)
       var num_contacto = row.insertCell(3)
       

       id_artista.innerHTML = `<a href="PutArtista.html?${emp[i].id_artista}"> ${emp[i].id_artista}</a>`
       Nombre.innerHTML = emp[i].nombres
       Apellido.innerHTML = emp[i].apellido
       num_contacto.innerHTML = emp[i].num_contacto

      
    }

}

function CloseSesion(){

    localStorage.removeItem('Token');
    window.location.href = "Login.html"
}


