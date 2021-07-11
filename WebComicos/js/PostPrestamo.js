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


        SelectArtista()
    }
    else {
        window.location.href = "Login.html"
    }
}

function AddVestuario() {

   
    var Regreso = document.getElementById('Regreso').value
    var Vestuario = document.getElementById('Vestuario').value
    var id_artista = document.getElementById('id_artista').value
    

    

    
       
        
    
    axios({

        method: 'post',
        url: url + "/prestamos",
        data: {
            fechaRegreso: Regreso,
            id_vestuario: Vestuario,
            id_artista: id_artista,
            

        },
        headers: {
            'Authorization': "bearer " + localStorage.getItem("Token")
        }
    })
        .then(function (res) {
            Swal.fire({
                icon: 'success',
                title: 'Prestamo',
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



document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('select');
    options = []
    var instances = M.FormSelect.init(elems, options);
});



function SelectArtista() {


    axios.get(url + "/artista/getall", headers)
        .then(function (res) {

            select = document.getElementById('id_artista');

            for (var i = 0; i < res.data.message.length; i++) {

                

                var opt = document.createElement('option');
                opt.value = res.data.message[i].id_artista;
                opt.innerHTML = res.data.message[i].nombres;
                select.appendChild(opt);


                M.FormSelect.init(select)



            }

        }).catch(function (error) {
            console.log(error)
        })




        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.datepicker');
            var instances = M.Datepicker.init(elems);
          });

}
