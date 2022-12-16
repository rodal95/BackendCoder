
//punto de comunicacion cliente
const socketClient = io()
//captura el valor del usuario
let user

function salir(){
    window.location.replace("/salir")

  }
socketClient.on("usuarioLog",(data)=>{
   user = data
   console.log(user.nombre)
   
const containerUsuario = document.getElementById("UsuarioLog")

containerUsuario.innerHTML=`<h1>Bienvenido ${user.nombre}</h1><button onclick=salir()>Salir</button>`

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

const authorSchema = new normalizr.schema.Entity("authors",{}, {idAttribute:"email"})
const mensajeSchema = new normalizr.schema.Entity("mensajes",{author:authorSchema})
const chatSchema = new normalizr.schema.Entity("chat",{
    mensajes:[mensajeSchema]
},{idAttribute:"id"})


//logica del chat
//enviar mensaje
const campo = document.getElementById("messageField")

campo.addEventListener("keydown",(evt)=>{
    /* console.log(evt.key) */
    if(evt.key === "Enter"){
        socketClient.emit("message", {
            author:user,
            text:campo.value,
            timestamp: new Date().toLocaleDateString()
    })
    
    campo.value=""
    }
})
//mostrar todos los mensajes cuando usuario carga pag
const messageContainer = document.getElementById("messageContainer")
socketClient.on("historico", (data)=>{
    let elementos =""
    const normalData = normalizr.denormalize(data.result,chatSchema,data.entities)
    normalData.mensajes.forEach(item =>{
        elementos = elementos + `<p><strong>${item.author.nombre}</strong>: ${item.text}</p>`
        
    })
    messageContainer.innerHTML = elementos
})

/* socketClient.on("newUser",()=>{
    Swal.fire({
        text:"nuevo usuario en linea",
        toas:true
    })
}) */