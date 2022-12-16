
const login = document.getElementById("FormularioLogin")

let inputs = login.getElementsByTagName("input")

function loginSubmit(){

    let usuario = {
        email:inputs[0].value,
        nombre:inputs[1].value
    }
    console.log(usuario)
    fetch("/login",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(usuario)
    }).then(async (respuesta)=>{
        try {
            let data = await respuesta.json()
            console.log(data)
            if(data.message == "exito"){
                window.location.replace("/home")
            }
        } catch (error) {
            console.log(error)
        }
        console.log(respuesta)
        
    })
}


