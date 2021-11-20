window.onload = init;


var queryString = location.search.substring(1);



var headers = {};
var url = "https://comicos-vestuario.herokuapp.com/user"

function init(){

    if(queryString){
        document.getElementById("search").style.display = "none"; 
        SearchPrestamo()
    }
    
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

function SearchPrestamo(){


    if(queryString){
        id = queryString
    }
    else{
        var id = document.getElementById('IDSearch').value
    }
    
    var id2 = parseInt(id)
    
    axios({

        method : 'get' ,
        url: url +"/prestamos/"+id2,
        data : {
            id : id2 ,
           
        },
        headers:{
            'Authorization':"bearer " + localStorage.getItem("Token")
        }
    }).then(function(res){
        DisplayPrestamo(res.data.message)
    }).catch(function(err){
        console.log(err)
    })
}

function DisplayPrestamo(emp){
    var id = document.getElementById('ID')
    var fechaRegreso = document.getElementById('fechaRegreso')
    var id_vestuario = document.getElementById('id_vestuario')
    var id_artista = document.getElementById('id_artista')
   
    id.value = emp[0].id_prestamo
    fechaRegreso.value = emp[0].Regreso
    id_vestuario.value = emp[0].id_vestuario
    id_artista.value = emp[0].id_artista
        

}

 function EditPrestamo (){
    
    var id = document.getElementById('ID').value
    var fechaRegreso = document.getElementById('fechaRegreso').value
    var id_vestuario = document.getElementById('id_vestuario').value
    var id_artista = document.getElementById('id_artista').value
    

 axios({

        method : 'put' ,
        url: url + "/prestamos/"+id,
        data : {
            fechaRegreso: fechaRegreso,
            id_vestuario: id_vestuario,
            id_artista: id_artista,
            
            
        },
        headers:{
            'Authorization':"bearer " + localStorage.getItem("Token"),
            
            
        }
    })
    .then(function(res){
        Swal.fire({
            icon: 'success',
            title: 'Prestamo',
            text: 'Cambiado Satisfactoriamente',
           
          })
          
          
          
    }).catch(function(error){
        console.log(error)
    })
    
}


function DeletePrestamo (){
    
    var id = document.getElementById('ID').value
    
    

 axios({

        method : 'delete' ,
        url: url + "/prestamos/"+id,
       
        headers:{
            'Authorization':"bearer " + localStorage.getItem("Token"),
            
            
        }
    })
    .then(function(res){
        Swal.fire({
            icon: 'success',
            title: 'Prestamo',
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