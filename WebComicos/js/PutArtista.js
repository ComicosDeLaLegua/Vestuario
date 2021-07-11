window.onload = init;


var queryString = location.search.substring(1);



var headers = {};
var url = "https://comicos-vestuario.herokuapp.com/user"

function init(){

    if(queryString){
        document.getElementById("search").style.display = "none"; 
        SearchArtista()
    }
    
    if(localStorage.getItem("Token")){
        
        headers = {
            headers:{
                'Authorization':"bearer " + localStorage.getItem("Token")
            }
        }
        


    }
    else{
        window.location.href="login.html"
    }
}

function SearchArtista(){


    if(queryString){
        id = queryString
    }
    else{
        var id = document.getElementById('IDSearch').value
    }
    
    var id2 = parseInt(id)
    
    axios({

        method : 'get' ,
        url: url +"/artista/"+id2,
        data : {
            id : id2 ,
           
        },
        headers:{
            'Authorization':"bearer " + localStorage.getItem("Token")
        }
    }).then(function(res){
        DisplayArtista(res.data.message)
    }).catch(function(err){
        console.log(err)
    })
}

function DisplayArtista(emp){
    var id = document.getElementById('ID')
    var name = document.getElementById('Nombre')
    var Apellido = document.getElementById('Apellido')
    var contacto = document.getElementById('num')
   
    id.value = emp[0].id_artista
    name.value = emp[0].nombres
    Apellido.value = emp[0].apellido
    contacto.value = emp[0].num_contacto
        

}

 function EditArtista (){
    
    var id = document.getElementById('ID').value
    var name = document.getElementById('Nombre').value
    var Apellido = document.getElementById('Apellido').value
    var contacto = document.getElementById('num').value
    

 axios({

        method : 'put' ,
        url: url + "/artista/"+id,
        data : {
            nombre: name,
            apellido: Apellido,
            contacto: contacto,
            
            
        },
        headers:{
            'Authorization':"bearer " + localStorage.getItem("Token"),
            
            
        }
    })
    .then(function(res){
        Swal.fire({
            icon: 'success',
            title: 'Artista',
            text: 'Cambiado Satisfactoriamente',
           
          })
          
          
          
    }).catch(function(error){
        console.log(error)
    })
    
}


function DeleteArtista (){
    
    var id = document.getElementById('ID').value
    
    

 axios({

        method : 'delete' ,
        url: url + "/artista/"+id,
       
        headers:{
            'Authorization':"bearer " + localStorage.getItem("Token"),
            
            
        }
    })
    .then(function(res){
        Swal.fire({
            icon: 'success',
            title: 'Artista',
            text: 'Eliminado Satisfactoriamente',
           
          })
          
    }).catch(function(error){
        console.log(error)
    })
}


function CloseSesion(){

    localStorage.removeItem('Token');
    window.location.href = "Login.html"
}