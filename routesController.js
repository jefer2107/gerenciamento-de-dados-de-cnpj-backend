


const routesController = (app)=>{
    //clients
    const controllerClients = require('./controller/clients')

    app.post('/clients/addTable',controllerClients().addTable)
    app.get('/clients/describeTable',controllerClients().describeTable)
    app.put('/clients/changeColumn',controllerClients().changeColumn)
    app.put('/clients/renameColumn',controllerClients().renameColumn)
    app.delete('/clients/deleteTable',controllerClients().deleteTable)
    app.get('/clients/getAll',controllerClients().getAll)
}

module.exports = routesController