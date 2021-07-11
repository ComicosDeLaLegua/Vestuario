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
        LoadVestuario()


    }
    else{
        window.location.href="Login.html"
    }
}

function LoadVestuario(){

    axios.get(url + "/vestuario/getall",headers)
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
        
       var id = row.insertCell(0)
       var Nombre = row.insertCell(1)
       var Talla = row.insertCell(2)
       var id_almacen = row.insertCell(3)
       var tags = row.insertCell(4)
       

       id.innerHTML = `<a href="PutVestuario.html?${emp[i].id_vestuario}"> ${emp[i].id_vestuario}</a>`
       Nombre.innerHTML = emp[i].Nombre
       Talla.innerHTML = emp[i].Talla
       id_almacen.innerHTML = emp[i].id_almacen
       tags.innerHTML = emp[i].tags
       

      
    }

}

function CloseSesion(){

    localStorage.removeItem('Token');
    window.location.href = "Login.html"
}


document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    options = []
    var instances = M.Dropdown.init(elems, options);
  });