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


        SelectAlmacen()
    }
    else {
        window.location.href = "Login.html"
    }
}

function AddVestuario() {

   
    var name = document.getElementById('Nombre').value
    var Talla = document.getElementById('Talla').value
    var almacen = document.getElementById('id_almacen').value
    var tags = document.getElementById('tags').value

    

    
       
        
    
    axios({

        method: 'post',
        url: url + "/vestuario",
        data: {
            nombre: name,
            talla: Talla,
            almacen: almacen,
            tags: tags,

        },
        headers: {
            'Authorization': "bearer " + localStorage.getItem("Token")
        }
    })
        .then(function (res) {
            Swal.fire({
                icon: 'success',
                title: 'Vestuario',
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



function SelectAlmacen() {


    axios.get(url + "/almacen/getall", headers)
        .then(function (res) {

            select = document.getElementById('id_almacen');

            for (var i = 0; i < res.data.message.length; i++) {



                var opt = document.createElement('option');
                opt.value = res.data.message[i].id_almacen;
                opt.innerHTML = res.data.message[i].nombre;
                select.appendChild(opt);


                M.FormSelect.init(select)



            }

        }).catch(function (error) {
            console.log(error)
        })






}
