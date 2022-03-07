
const response = (res)=>{
    const send = (value)=> res.status(200).send(value)
    const error = (value=null)=> value === null?res.status(500).send('Um error crítico ocorreu!'):res.status(500).send(value)
    const unauthorize = ()=> res.status(500).send('Não autorizado!')
    const forbiden = ()=> res.status(500).send('Acesso negado!')

    return {
        send,
        error,
        unauthorize,
        forbiden
    }
}

const emailFormat = async (email)=>{
    const characters = ['@','.','com']
    if(!email) throw Error('email not informed')
    
    characters.forEach(e=> {if(!email.includes(e)) 
        throw Error(`this email format does not exist`)})
           
}

module.exports = {
    response,
    emailFormat
}