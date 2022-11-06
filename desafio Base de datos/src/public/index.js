console.log("javascript fun")
//punto de comunicacion cliente
const socketClient = io()
//captura el valor del usuario
let user
Swal.fire({
    title:"hola usuario",
    text:"bienvenido",
    input:"text",
    allowOutsideClick:false

}).then(respuesta =>{
    user = respuesta.value
})
//guardar un productos
const productForm = document.getElementById("productForm")
productForm.addEventListener("submit",(evt)=>{
    //prevenir q se refresque
    evt.preventDefault()
    const product = {
        title:document.getElementById("title").value,
        price:document.getElementById("price").value,
        image:document.getElementById("image").value
    }
    title.value=""
    price.value=""
    image.value=""
    //enviamos el nuevo producto al servidor
    socketClient.emit("newProduct",product)
})

//productos en tiempo real
const createTabla = async (data)=>{
    const response = await fetch("./templates/tabla.hbs")
    const result = await response.text()
    const template = Handlebars.compile(result)
    const html = await template({products:data})
    return html
}

const productsContainer = document.getElementById("productsContainer")
socketClient.on("products",async (data)=>{
   const htmlProducts =  await createTabla(data)
   productsContainer.innerHTML= htmlProducts
})






//logica del chat
//enviar mensaje
const campo = document.getElementById("messageField")

campo.addEventListener("keydown",(evt)=>{
    console.log(evt.key)
    if(evt.key === "Enter"){
        socketClient.emit("message", {
            username:user,
            message:campo.value
    })
    campo.value=""
    }
})
//mostrar todos los mensajes cuando usuario carga pag
const messageContainer = document.getElementById("messageContainer")
socketClient.on("historico", (data)=>{
    let elementos =""
    data.forEach(item =>{
        elementos = elementos + `<p><strong>${item.username}</strong>: ${item.message}</p>`
        
    })
    messageContainer.innerHTML = elementos
})

/* socketClient.on("newUser",()=>{
    Swal.fire({
        text:"nuevo usuario en linea",
        toas:true
    })
}) */