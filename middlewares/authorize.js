const jwt = require('jsonwebtoken')
const config = require('../config')
const { response } = require('../response')

const authorize = (req,res,next)=>{
    const authHeader = req.header('Authorization')
    const token = (authHeader && authHeader !== ''? authHeader.replace(' Bearer',''): null)

    jwt.verify(token, config.secretToken, (error,decoded)=>{

        if(error){
            response(res).unauthorize()
            return
        }

        console.log(decoded)
        req.userId = decoded.userId

        next()
    })
}

module.exports = authorize