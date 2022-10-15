console.log("javascript fun")

const socketClient = io()
Swal.fire({
    title:"hola usuario",
    text:"bienvenido",
    input:"text",
    allowOutsideClick:false

}).then(respuesta =>{
    user = respuesta.value
})

const campo = document.getElementById("messageField")

campo.addEventListener("keydown",(evt)=>{
    console.log(evt.key)
    if(evt.key === "Enter"){
        socketClient.emit("message", {
            username:user,
            message:campo.value
    })
    }
})
const messageContainer = document.getElementById("messageContainer")
socketClient.on("historico",(data)=>{
    console.log(data)
    let elementos =""
    data.forEach(item =>{
        elementos = elementos + `<p><strong>${item.username}</strong>: ${item.message}</p>`
    })
    messageContainer.innerHTML = elementos
})

socketClient.on("newUser",()=>{
    Swal.fire({
        text:"nuevo usuario en linea",
        toas:true
    })
})