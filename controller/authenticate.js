const DBSevice = require("../DBService")
const { response } = require("../response")
const jwt = require('jsonwebtoken')
const config = require('../config')

const validateUser = (user)=>{
    return new Promise(async(res,rej)=>{
        const characters = ['@','.','com']

        if(user.email === "" || user.password === "") return rej("You need to fill in the empty fields")
        if(user.email.length > 30) return rej("Email cannot be longer than 30 characters")

        characters.forEach(e=> {if(!user.email.includes(e)) 
                return rej(`this email format does not exist`)})

        if(user.password.length !== 6) return rej("Password should be 6 characters")

        if(user.password.length !== 6) return rej("Password should be 6 characters")

        return res()
    })
    
}


const authenticateController = ()=>{
    const options = {
        table: 'users',
        orderBy: 'id'
    }

    let dbService = DBSevice(options)

    const auth = (req,res)=>{
        const body = {
            where: {
                column: ['email'],
                value: [req.body.email]
            }
        }

        validateUser(req.body).then(async()=>{
            await dbService.selectAll(body).then((result)=>{
        
                try {
                    if(result[0].length === 0 || result[0].password !== req.body.password)
                    response(res).unauthorize()
    
                    const token = jwt.sign({id: result[0].id, nameUser: result[0].nameUser, admin: result[0].admin}, config.secretToken)
    
                    response(res).send(token)
    
                } catch (error) {
                    response(res).error()
                }
    
            }).catch((error)=>{
                response(res).error()
                console.log(error)
            })

        }).catch((error)=>{
            response(res).error(error)
        })
        
    }

    return {
        auth
    }
}

module.exports = authenticateController