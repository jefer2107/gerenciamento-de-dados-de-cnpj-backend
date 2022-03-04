const jwt = require('jsonwebtoken')
const config = require('../config')
const { response } = require('../response')

const authorizeController = ()=>{

    const authorizeUser = (req,res,next)=>{
        const authHeader = req.header('Authorization')
        const token = (authHeader && authHeader !== ''? authHeader.replace('Bearer ',''): null)
    
        console.log('authorizeUser authHeader:',authHeader)
        console.log('authorizeUser token:',token)
    
        jwt.verify(token, config.secretToken, (error,decoded)=>{
    
            if(error){
                response(res).unauthorize()
                return
            }
    
            console.log('decoded:',decoded)
            req.userId = decoded.userId
    
            next()
        })
    }

    const authorizeAdmin = (req,res,next)=>{
        const authHeader = req.header('Authorization')
        const token = (authHeader && authHeader !== ''? authHeader.replace('Bearer ',''): null)
    
        console.log('authHeader:',authHeader)
    
        jwt.verify(token, config.secretToken, (error,decoded)=>{
    
            if(error){
                response(res).unauthorize()
                return
            }

            try {
                console.log('decoded:',decoded)
                if(decoded.admin === 'true'){
                    console.log('decoded:',decoded)
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