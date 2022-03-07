const jwt = require('jsonwebtoken')
const config = require('../config')
const { response } = require('../response')

const authorizeController = ()=>{

    const authorizeUser = (req,res,next)=>{
        const authHeader = req.header('Authorization')
        const token = (authHeader && authHeader !== ''? authHeader.replace('Bearer ',''): null)
    
        jwt.verify(token, config.secretToken, (error,decoded)=>{
    
            if(error){
                response(res).unauthorize()
                return
            }
    
            req.userId = decoded.userId
    
            next()
        })
    }

    const authorizeAdmin = (req,res,next)=>{
        const authHeader = req.header('Authorization')
        const token = (authHeader && authHeader !== ''? authHeader.replace('Bearer ',''): null)
    
        jwt.verify(token, config.secretToken, (error,decoded)=>{
    
            if(error){
                response(res).unauthorize()
                return
            }

            try {
                
                if(decoded.admin === 'true'){
                    
                    req.userId = decoded.userId
            
                    next()
                }

            } catch (error) {
                response(res).unauthorize()
                console.log(error)
                return
            }
    
            
        })
    }

    return {
        authorizeUser,
        authorizeAdmin
    }
}


module.exports = authorizeController