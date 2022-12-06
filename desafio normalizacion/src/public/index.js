
//punto de comunicacion cliente
const socketClient = io()
//captura el valor del usuario
let user
/* Swal.fire({
    title:"hola usuario",
    text:"bienvenido",
    input:"text",
    allowOutsideClick:false

}).then(respuesta =>{
    user = respuesta.value
}) */
Swal.fire({
    title: 'Formulario Perfil',
    html: `<input type="text" id="email" class="swal2-input" placeholder="Email">
    <input type="text" id="name" class="swal2-input" placeholder="Nombre">
    <input type="text" id="lastname" class="swal2-input" placeholder="Apellido">`,
    confirmButtonText: 'Iniciar sesion',
    focusConfirm: false,
    allowOutsideClick:false,
    preConfirm: () => {
      const email = Swal.getPopup().querySelector('#email').value
      const name = Swal.getPopup().querySelector('#name').value
      const lastname = Swal.getPopup().querySelector('#lastname').value
      if (!email || !name || !lastname) {
        Swal.showValidationMessage(`Por favor complete formulario`)
      }
      return { name,lastname,email}
    }
  }).then((result) => {
    Swal.fire(`
      email: ${result.value.email}
      name: ${result.value.name}
      lastname: ${result.value.lastname}
    `.trim())
    user = result.value
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
    console.log(normalData)
    normalData.mensajes.forEach(item =>{
        elementos = elementos + `<p><strong>${item.author.name}</strong>: ${item.text}</p>`
        
    })
    messageContainer.innerHTML = elementos
})

/* socketClient.on("newUser",()=>{
    Swal.fire({
        text:"nuevo usuario en linea",
        toas:true
    })
}) */