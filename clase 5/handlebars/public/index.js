const template = Handlebars.compile(
    `<h1>Datos Personales</h1>
    <ul>
        <li>{{nombre}}</li>
        <li>{{apellido}}</li>
        <li>{{edad}}</li>
        <li>{{email}}</li>
        <li>{{telefono}}</li>

    </ul>
    `)
const html= template(
    {
        nombre:"rodrigo",
        apellido:"alday",
        edad:26,
        email:"rodirgo@gmail.com",
        telefono:1547444154
    })


document.getElementById("contenedor").innerHTML = html;