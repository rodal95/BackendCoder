const express = require("express")
const router = express.Router()


const frutas = [
    {id:1, name:'pera', price:200},
{id:2, name:'manzana', price:300},
{id:3, name:'kiwi', price:800},
]

router.get("/", (request, response)=>{
    if(Object.keys(request.query).length > 0){
        const {name} = request.query
        console.log(name)
        const nuevaFrutas = frutas.filter(elm => elm.name === name)
        console.log(nuevaFrutas)
        response.send(nuevaFrutas)
    }else{
        response.send(frutas)
    }
})


router.get("/:frutaId",(req,res)=>{
    const {frutaId} = req.params;
    const producto = frutas.find(elm => elm.id === parseInt(frutaId));
    res.send(producto);

})


router.post("/",(req,res)=>{
    const nuevaFruta = req.body
    console.log(req.body)
    
    frutas.push(nuevaFruta)
    res.send(frutas)
})
router.put("/:id", (req,res)=>{
    const {id}= req.params
    const modificacion = req.body
    const frutaPos = frutas.findIndex(elm => elm.id === parseInt(id))
    if(frutaPos>= 0){
        frutas[frutaPos] = modificacion;
        res.send(frutas)
    }else{
        res.status(404).send("no se encuentra el elemento")
    }
})


module.exports= router
