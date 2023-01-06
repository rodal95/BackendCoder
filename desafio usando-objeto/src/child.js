let randoms=[]

const getRandoms = (cantidad)=>{
    if(cantidad){
        for (let i = 0; i<= cantidad;i++){
            num = Math.random()*1000
            randoms.push(num)
        }
    }else{
        for (let i = 0; i<= 5;i++){
            num = Math.random()*1000
            randoms.push(num)
        }
    }
    return randoms
}


process.on("numero",numero =>{
    const resultado = getRandoms(numero)
    console.log(resultado)
    process.send(resultado.toString)
})
