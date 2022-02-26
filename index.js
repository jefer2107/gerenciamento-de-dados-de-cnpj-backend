const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

require('./routesController')(app)

app.listen(3001,()=>{
    console.log('Running...')
})