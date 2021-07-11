window.onload = init;

function init() {

     if(!localStorage.getItem("Token")){
    document.querySelector('#btnLogin').addEventListener('click',login)
     }
     else{

        window.location.href = "main.html"
     }
}

function login(){

    var Username  = document.getElementById('Username').value;

    var passwords = document.getElementById('Password').value;

    axios({

        method : 'post' ,
        url: 'https://comicos-vestuario.herokuapp.com/Admin/login',
        data : {
            username : Username ,
            password : passwords
        }
    }).then(function(res){

        

        if(res.data.code=== 200){
            
            localStorage.setItem("Token",res.data.message)
            window.location.href = "main.html"
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Incorrect data',
                
              })
        }
    }).catch(function(err){
        console.log(err)
        
    })


}

