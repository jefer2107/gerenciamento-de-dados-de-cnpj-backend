
const response = (res)=>{
    const send = ()=> res.status(200).send(value)
    const error = ()=> res.status(500).send('Um error crítico ocorreu!')
    const unauthorize = ()=> res.status(500).send('Não autorizado!')
    const forbiden = ()=> res.status(500).send('Acesso negado!')

    return {
        send,
        error,
        unauthorize,
        forbiden
    }
}

const emailFormat = (email)=>{
    const characters = ['@','.','com']
    if(!email) throw Error('email not informed')
    
    characters.forEach(e=> {if(!email.includes(e)) 
        throw Error(`this email format does not exist`)})
           
}

module.exports = {
    response,
    emailFormat
}