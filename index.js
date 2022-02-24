const express = require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

require('./routesController')(app)

app.listen(3001,()=>{
    console.log('Running...')
})