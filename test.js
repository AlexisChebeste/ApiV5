const numeros = [1, 3, 6, 7] 


const sumar = (...arg)=> {
    let acum = 0
    arg.forEach(e=> acum += e)
    return acum
}

console.log(sumar(...numeros))

console.log(Math.min(...numeros))



