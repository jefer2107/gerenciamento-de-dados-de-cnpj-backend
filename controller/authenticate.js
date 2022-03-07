const DBSevice = require("../DBService")
const { response, emailFormat } = require("../response")
const jwt = require('jsonwebtoken')
const config = require('../config')

const validateUser = async (user)=>{
    if(user.email === "" || user.password === "") throw Error("You need to fill in the empty fields")
    if(user.email.length > 30) throw Error("Email cannot be longer than 30 characters")
    await emailFormat(user.email)

    if(user.password.length !== 6) throw Error("Password should be 6 characters")
}


const authenticateController = ()=>{
    const options = {
        table: 'users',
        orderBy: 'id'
    }

    let dbService = DBSevice(options)

    const auth = async (req,res)=>{
        const body = {
            where: {
                column: ['email'],
                value: [req.body.email]
            }
        }

        await validateUser(req.body)
        
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
        
    }

    return {
        auth
    }
}

module.exports = authenticateController