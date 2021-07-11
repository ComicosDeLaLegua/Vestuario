window.onload = init;


var queryString = location.search.substring(1);



var headers = {};
var url = "http://127.0.0.1:4000/user"

function init(){

    if(queryString){
        document.getElementById("search").style.display = "none"; 
        SearchVestuario()
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

function SearchVestuario(){


    if(queryString){
        id = queryString
    }
    else{
        var id = document.getElementById('IDSearch').value
    }
    
    var id2 = parseInt(id)
    
    axios({

        method : 'get' ,
        url: url +"/vestuario/"+id2,
        data : {
            id : id2 ,
           
        },
        headers:{
            'Authorization':"bearer " + localStorage.getItem("Token")
        }
    }).then(function(res){
        displayVestuario(res.data.message)
    }).catch(function(err){
        console.log(err)
    })
}

function displayVestuario(emp){
    var id = document.getElementById('ID')
    var name = document.getElementById('Nombre')
    var talla = document.getElementById('Talla')
    var almacen = document.getElementById('id_almacen')
    var tags = document.getElementById('tags')
    
    id.value = emp[0].id_vestuario
    name.value = emp[0].Nombre
    talla.value = emp[0].Talla
    almacen.value = emp[0].id_almacen
    tags.value = emp[0].tags
    
        

}

 function EditVestuario (){
    
    var id = document.getElementById('ID').value
    var name = document.getElementById('Nombre').value
    var talla = document.getElementById('Talla').value
    var almacen = document.getElementById('id_almacen').value
    var tags = document.getElementById('tags').value
    

 axios({

        method : 'put' ,
        url: url + "/vestuario/"+id,
        data : {
            // id: id2,
            nombre : name ,
            talla :talla, 
            almacen :almacen ,
            tags :tags,
            
        },
        headers:{
            'Authorization':"bearer " + localStorage.getItem("Token"),
            
            
        }
    })
    .then(function(res){
        Swal.fire({
            icon: 'success',
            title: 'Vestuario',
            text: 'Cambiado Satisfactoriamente',
           
          })
         
          
          
    }).catch(function(error){
        console.log(error)
    })
    
}


function DeleteVestuario (){
    
    var id = document.getElementById('ID').value
    
    

 axios({

        method : 'delete' ,
        url: url + "/vestuario/"+id,
       
        headers:{
            'Authorization':"bearer " + localStorage.getItem("Token"),
            
            
        }
    })
    .then(function(res){
        Swal.fire({
            icon: 'success',
            title: 'Vestuario',
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