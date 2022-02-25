


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

    //secondaryActivityController
    const secondaryActivityController = require('./controller/secondaryActivity')

    app.post('/secondaryActivity/addTable',secondaryActivityController().addTable)
    app.get('/secondaryActivity/describeTable',secondaryActivityController().describeTable)
    app.put('/secondaryActivity/changeColumn',secondaryActivityController().changeColumn)
    app.put('/secondaryActivity/renameColumn',secondaryActivityController().renameColumn)
    app.delete('/secondaryActivity/deleteTable',secondaryActivityController().deleteTable)
    app.put('/secondaryActivity/addForeinkey',secondaryActivityController().addForeinkey)
    app.get('/secondaryActivity/addForeinkey',secondaryActivityController().getAll)
    //app.post('/clients/create',secondaryActivityController().create)
    app.patch('/secondaryActivity/:id/relateClient',secondaryActivityController().relateClient)

    //corporateStructure
    const corporateStructureController = require('./controller/corporateStructure')

    app.post('/corporateStructure/addTable',corporateStructureController().addTable)
    app.get('/corporateStructure/describeTable',corporateStructureController().describeTable)
    app.put('/corporateStructure/changeColumn',corporateStructureController().changeColumn)
    app.put('/corporateStructure/renameColumn',corporateStructureController().renameColumn)
    app.delete('/corporateStructure/deleteTable',corporateStructureController().deleteTable)
    app.put('/corporateStructure/addForeinkey',corporateStructureController().addForeinkey)
    app.get('/corporateStructure/addForeinkey',secondaryActivityController().getAll)
    //app.post('/corporateStructure/create',corporateStructureController().create)
    app.patch('/corporateStructure/:id/relateClient',secondaryActivityController().relateClient)
}

module.exports = routesController