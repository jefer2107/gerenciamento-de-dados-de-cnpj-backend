const authorizeController = require('./middlewares/authorize')



const routesController = (app)=>{
    //clients
    const clientsController = require('./controller/clients')

    app.post('/clients/addTable',clientsController().addTable)
    app.get('/clients/describeTable',clientsController().describeTable)
    app.put('/clients/changeColumn',clientsController().changeColumn)
    app.put('/clients/renameColumn',clientsController().renameColumn)
    app.post('/clients/addColumn',clientsController().addColumn)
    app.put('/clients/createForeignKey',clientsController().createForeignKey)
    app.delete('/clients/deleteTable',clientsController().deleteTable)
    app.get('/clients/getAll',clientsController().getAll)
    app.get('/clients/:id/:user/getOne',clientsController().getOne)
    app.post('/clients/create',clientsController().create)
    app.delete('/clients/:id/removeItem',clientsController().removeItem)

    //list_clients
    const listClientsController = require('./controller/lisClients')

    app.post('/list_clients/addTable',listClientsController().addTable)
    app.get('/list_clients/describeTable',listClientsController().describeTable)
    app.put('/list_clients/renameTable',listClientsController().renameTable)
    app.put('/list_clients/changeColumn',listClientsController().changeColumn)
    app.post('/list_clients/create',listClientsController().create)
    app.get('/list_clients/getAll',listClientsController().getAll)
    app.delete('/list_clients/removeItem',listClientsController().removeItem)

    //secondaryActivityController
    const secondaryActivityController = require('./controller/secondaryActivity')

    app.post('/secondaryActivity/addTable',secondaryActivityController().addTable)
    app.get('/secondaryActivity/describeTable',secondaryActivityController().describeTable)
    app.put('/secondaryActivity/changeColumn',secondaryActivityController().changeColumn)
    app.put('/secondaryActivity/renameColumn',secondaryActivityController().renameColumn)
    app.delete('/secondaryActivity/deleteTable',secondaryActivityController().deleteTable)
    app.put('/secondaryActivity/addForeinkey',secondaryActivityController().addForeinkey)
    app.get('/secondaryActivity/getAll',secondaryActivityController().getAll)
    app.post('/secondaryActivity/create',secondaryActivityController().create)
    app.delete('/secondaryActivity/:id/removeItem',secondaryActivityController().removeItem)
    app.delete('/secondaryActivity/removeAll',secondaryActivityController().removeAll)

    //corporateStructure
    const corporateStructureController = require('./controller/corporateStructure')

    app.post('/corporateStructure/addTable',corporateStructureController().addTable)
    app.get('/corporateStructure/describeTable',corporateStructureController().describeTable)
    app.put('/corporateStructure/changeColumn',corporateStructureController().changeColumn)
    app.put('/corporateStructure/renameColumn',corporateStructureController().renameColumn)
    app.delete('/corporateStructure/deleteTable',corporateStructureController().deleteTable)
    app.put('/corporateStructure/addForeinkey',corporateStructureController().addForeinkey)
    app.get('/corporateStructure/addForeinkey',corporateStructureController().getAll)
    app.post('/corporateStructure/create',corporateStructureController().create)
    app.get('/corporateStructure/getAll',corporateStructureController().getAll)
    app.delete('/corporateStructure/:id/removeItem',corporateStructureController().removeItem)
    app.delete('/corporateStructure/removeAll',corporateStructureController().removeAll)

    //users
    const usersController = require('./controller/users')

    app.post('/users/addTable',usersController().addTable)
    app.get('/users/describeTable',usersController().describeTable)
    app.put('/users/changeColumn',usersController().changeColumn)
    app.put('/users/renameColumn',usersController().renameColumn)
    app.post('/users/addColumn',usersController().addColumn)
    app.delete('/users/deleteTable',usersController().deleteTable)
    app.post('/users/create',usersController().create)
    app.get('/users/getAll',usersController().getAll)
    app.get('/users/:id/getOne',usersController().getOne)
    app.delete('/users/:id/removeItem',usersController().removeItem)
    app.put('/users/:id/changeItem',usersController().changeItem)

    //authentivate
    const authenticateController = require('./controller/authenticate')

    app.post('/auth',authenticateController().auth)
}

module.exports = routesController