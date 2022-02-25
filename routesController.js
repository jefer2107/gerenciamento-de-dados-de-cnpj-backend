


const routesController = (app)=>{
    //clients
    const clientsController = require('./controller/clients')

    app.post('/clients/addTable',clientsController().addTable)
    app.get('/clients/describeTable',clientsController().describeTable)
    app.put('/clients/changeColumn',clientsController().changeColumn)
    app.put('/clients/renameColumn',clientsController().renameColumn)
    app.delete('/clients/deleteTable',clientsController().deleteTable)
    app.get('/clients/getCNPJ',clientsController().getCNPJ)
    app.post('/clients/create',clientsController().create)
    app.get('/clients/getAll',clientsController().getAll)

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
    app.patch('/corporateStructure/:id/relateClient',corporateStructureController().relateClient)
}

module.exports = routesController