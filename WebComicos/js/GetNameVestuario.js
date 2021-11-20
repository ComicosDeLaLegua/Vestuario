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

function LoadVestuarioNombre(){

    var name = document.getElementById('first_name').value
    axios({

        method : 'get' ,
        url: url + "/vestuario/"+name,
        data : {
            name:name
        },
        headers:{
            'Authorization':"bearer " + localStorage.getItem("Token")
        }
    })
    .then(function(res){
        console.log(res)
        DisplayVestuarioNombre(res.data.message)
    }).catch(function(error){
        console.log(error)
    })
}

function DisplayVestuarioNombre(emp){
    
    var Table = document.querySelector("tbody")
    Table.innerHTML = ""
    for(var i = 0;i<emp.length;i++){

        var row =  Table.insertRow(-1)
        
        var id = row.insertCell(0)
        var Nombre = row.insertCell(1)
        var Talla = row.insertCell(2)
        var id_almacen = row.insertCell(3)
        var tags = row.insertCell(4)
        
 
        id.innerHTML = `<a href="PutVestuario.html?${emp[i].id_vestuario}">${emp[i].id_vestuario}</a>`
        Nombre.innerHTML = emp[i].Nombre
        Talla.innerHTML = emp[i].Talla
        id_almacen.innerHTML = emp[i].id_almacen
        tags.innerHTML = emp[i].tags

    }

}


function LoadVestuarioTag(){

    var name = document.getElementById('tag').value
    axios({

        method : 'get' ,
        url: url + "/vestuario/tags/"+name,
        data : {
            name:name
        },
        headers:{
            'Authorization':"bearer " + localStorage.getItem("Token")
        }
    })
    .then(function(res){
        console.log(res)
        DisplayVestuarioTag(res.data.message)
    }).catch(function(error){
        console.log(error)
    })
}

function DisplayVestuarioTag(emp){
    
    var Table = document.querySelector("tbody")
    Table.innerHTML = ""
    for(var i = 0;i<emp.length;i++){

        var row =  Table.insertRow(-1)
        
        var id = row.insertCell(0)
        var Nombre = row.insertCell(1)
        var Talla = row.insertCell(2)
        var id_almacen = row.insertCell(3)
        var tags = row.insertCell(4)
        
 
        id.innerHTML = `<a href="#"> ${emp[i].id_vestuario}</a>`
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