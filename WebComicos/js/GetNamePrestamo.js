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
        


    }
    else{
        window.location.href="Login.html"
    }
}

function LoadPrestamoName(){

    var name = document.getElementById('first_name').value
    axios({

        method : 'get' ,
        url: url + "/prestamos/"+name,
        data : {
            name:name
        },
        headers:{
            'Authorization':"bearer " + localStorage.getItem("Token")
        }
    })
    .then(function(res){
        console.log(res)
        DisplayPrestamoName(res.data.message)
    }).catch(function(error){
        console.log(error)
    })
}

function DisplayPrestamoName(emp){
    
    var Table = document.querySelector("tbody")
    Table.innerHTML = ""
    for(var i = 0;i<emp.length;i++){

        var row =  Table.insertRow(-1)
       
       var id_prestamo = row.insertCell(0)
       var Prestamo = row.insertCell(1)
       var Regreso = row.insertCell(2)
       var Vestuario = row.insertCell(3)
       var Artista = row.insertCell(4)
       var Apellido = row.insertCell(5)
       

       id_prestamo.innerHTML = `<a href="PutPrestamo.html?${emp[i].id_prestamo}"> ${emp[i].id_prestamo}</a>`
       Prestamo.innerHTML = emp[i].Prestamo
       Regreso.innerHTML = emp[i].Regreso
       Vestuario.innerHTML = emp[i].Nombre_Vestuario
       Artista.innerHTML = emp[i].Nombre_artista
       Apellido.innerHTML = emp[i].Apellido
    }

}






function CloseSesion(){

    localStorage.removeItem('Token');
    window.location.href = "login.html"
}