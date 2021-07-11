window.onload = init;

var headers = {};
var url = "http://127.0.0.1:4000/user"

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

function AddArtista() {

    var name = document.getElementById('Nombre').value
    var apellido = document.getElementById('Apellido').value
    var num = document.getElementById('Num').value
   
    axios({

        method: 'post',
        url: url + "/artista", 	 	 	
        data: {
            nombre: name,
            apellido: apellido,
            contacto: num,
            

        },
        headers: {
            'Authorization': "bearer " + localStorage.getItem("Token")
        }
    })
        .then(function (res) {
            Swal.fire({
                icon: 'success',
                title: 'Artista',
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







