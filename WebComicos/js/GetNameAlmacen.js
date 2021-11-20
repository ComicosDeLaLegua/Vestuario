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

function LoadAlmacenName(){

    var name = document.getElementById('first_name').value
    axios({

        method : 'get' ,
        url: url + "/almacen/"+name,
        data : {
            name:name
        },
        headers:{
            'Authorization':"bearer " + localStorage.getItem("Token")
        }
    })
    .then(function(res){
        console.log(res)
        DisplayAlmacenNombre(res.data.message)
    }).catch(function(error){
        console.log(error)
    })
}

function DisplayAlmacenNombre(emp){
    
    var Table = document.querySelector("tbody")
    Table.innerHTML = ""
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