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
        LoadAlmacen()


    }
    else{
        window.location.href="Login.html"
    }
}

function LoadAlmacen(){

    axios.get(url + "/almacen/getall",headers)
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
        
       var id_almacen = row.insertCell(0)
       var Nombre = row.insertCell(1)
       var ubicacion = row.insertCell(2)
       
       

       id_almacen.innerHTML = `<a href="PutAlmacen.html?${emp[i].id_almacen}"> ${emp[i].id_almacen}</a>`
       Nombre.innerHTML = emp[i].nombre
       ubicacion.innerHTML = emp[i].ubicacion
       

      
    }

}

function CloseSesion(){

    localStorage.removeItem('Token');
    window.location.href = "Login.html"
}


