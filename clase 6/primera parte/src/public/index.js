console.log(" soy un javascript")


const socketClient = io()

//recibir mensaje
socketClient.on("messageFromServer",(data)=>{
    console.log(data)
})
const messageField = document.getElementById("messageField")

messageField.addEventListener("keydown",(evt)=>{
    socketClient.emit("letras",evt.key)
})
socketClient.on("messages",(mensajes)=>{
    console.log(mensajes)
})