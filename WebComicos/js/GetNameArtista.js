window.onload = init;

var headers = {};
var url = "https://comicos-vestuario.herokuapp.com/user"

function init(){

    
    if(localStorage.getItem("Token")){
        
        headers = {
            headers:{
                'Authorization':"bearer " + localStorage.getItem("Token")
            }
        }
        


    }
    else{
        window.location.href="Login.html"
    }
}

function LoadArtistaName(){

    var name = document.getElementById('first_name').value
    axios({

        method : 'get' ,
        url: url + "/artista/"+name,
        data : {
            name:name
        },
        headers:{
            'Authorization':"bearer " + localStorage.getItem("Token")
        }
    })
    .then(function(res){
        console.log(res)
        DisplayArtistaNombre(res.data.message)
    }).catch(function(error){
        console.log(error)
    })
}

function DisplayArtistaNombre(emp){
    
    var Table = document.querySelector("tbody")
    Table.innerHTML = ""
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
    window.location.href = "login.html"
}