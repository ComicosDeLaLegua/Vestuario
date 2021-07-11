window.onload = init;

var headers = {};
var url = "https://comicos-vestuario.herokuapp.com/user"

function init() {


    if (localStorage.getItem("Token")) {

        headers = {
            headers: {
                'Authorization': "bearer " + localStorage.getItem("Token")
            }
        }


        
    }
    else {
        window.location.href = "Login.html"
    }
}

function AddAlmacen() {

    var name = document.getElementById('Nombre').value
    var ubicacion = document.getElementById('ubicacion').value
   
    axios({

        method: 'post',
        url: url + "/almacen",
        data: {
            nombre: name,
            ubicacion: ubicacion,
            

        },
        headers: {
            'Authorization': "bearer " + localStorage.getItem("Token")
        }
    })
        .then(function (res) {
            Swal.fire({
                icon: 'success',
                title: 'Almacen',
                text: 'Agregado exitosamente',

            })



        }).catch(function (error) {
            console.log(error)
        })
}


function CloseSesion() {

    localStorage.removeItem('Token');
    window.location.href = "login.html"
}







