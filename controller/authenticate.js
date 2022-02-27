const DBSevice = require("../DBService")
const { response } = require("../response")
const jwt = require('jsonwebtoken')
const config = require('../config')


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

        dbService.selectAll(body).then((result)=>{
        
            try {
                if(result.length === 0 || result[0].password !== req.body.password)
                response(res).unauthorize()

                const token = jwt.sign({id: result[0].id, name: result[0].name, admin: result[0].admin}, config.secretToken)

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