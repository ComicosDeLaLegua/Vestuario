window.onload = init;


var queryString = location.search.substring(1);



var headers = {};
var url = "https://comicos-vestuario.herokuapp.com/user"

function init(){

    if(queryString){
        document.getElementById("search").style.display = "none"; 
        SearchAlmacen()
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

function SearchAlmacen(){


    if(queryString){
        id = queryString
    }
    else{
        var id = document.getElementById('IDSearch').value
    }
    
    var id2 = parseInt(id)
    
    axios({

        method : 'get' ,
        url: url +"/almacen/"+id2,
        data : {
            id : id2 ,
           
        },
        headers:{
            'Authorization':"bearer " + localStorage.getItem("Token")
        }
    }).then(function(res){
        DisplatAlmacen(res.data.message)
    }).catch(function(err){
        console.log(err)
    })
}

function DisplatAlmacen(emp){
    var id = document.getElementById('ID')
    var name = document.getElementById('Nombre')
    var ubicacion = document.getElementById('ubicacion')
   
    id.value = emp[0].id_almacen
    name.value = emp[0].nombre
    ubicacion.value = emp[0].ubicacion
    
        

}

 function EditAlmacen (){
    
    var id = document.getElementById('ID').value
    var name = document.getElementById('Nombre').value
    var ubicacion = document.getElementById('ubicacion').value
    

 axios({

        method : 'put' ,
        url: url + "/almacen/"+id,
        data : {
            // id: id2,
            nombre : name ,
            ubicacion :ubicacion, 
            
            
        },
        headers:{
            'Authorization':"bearer " + localStorage.getItem("Token"),
            
            
        }
    })
    .then(function(res){
        Swal.fire({
            icon: 'success',
            title: 'Almacen',
            text: 'Cambiado Satisfactoriamente',
           
          })
          
          
          
    }).catch(function(error){
        console.log(error)
    })
    
}


function DeleteAlmacen (){
    
    var id = document.getElementById('ID').value
    
    

 axios({

        method : 'delete' ,
        url: url + "/almacen/"+id,
       
        headers:{
            'Authorization':"bearer " + localStorage.getItem("Token"),
            
            
        }
    })
    .then(function(res){
        Swal.fire({
            icon: 'success',
            title: 'Almacen',
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