const DBSevice = require("../DBService")

const corporateStructureController = ()=>{
    const options = {
        table: 'corporateStructure',
        orderBy: 'id'
    }

    let dbService = DBSevice(options)

    const addTable = (req,res)=>{
        const body = [
            'what varchar(100)',
            'name varchar(30)',
            'idClients int'
        ]

        dbService.createTable(body).then((result)=>{
            res.status(200).send(result)

        }).catch((error)=>{
            res.status(500).send(error)

        })
    }

    const describeTable = (req,res)=>{
        dbService.descTable().then((result)=>{
            res.status(200).send(result)

        }).catch((error)=>{
            res.status(500).send(error)
            console.log(error)
        })
    }

    const deleteTable = (req,res)=>{
        dbService.dropTable().then((result)=>{
            res.status(200).send(result)

        }).catch((error)=>{
            res.status(500).send(error)
            console.log(error)

        })
    }

    const changeColumn = (req,res)=>{
        const body = {
            column: 'name varchar(30)'
        }

        dbService.modifyColumn(body).then((result)=>{
            res.status(200).send(result)

        }).catch((error)=>{
            res.status(500).send(error)
            console.log(error)

        })
    }

    const renameColumn = (req,res)=>{
        const body = {
            column: 'qualquer',
            to: 'what varchar(30)'
        }

        dbService.changeColumn(body).then((result)=>{
            res.status(200).send(result)

        }).catch((error)=>{
            res.status(500).send(error)
            console.log(error)
        })
    }

    const addForeinkey = (req,res)=>{
        const body = {
            foreignKey: 'idClients',
            tableReferences: 'clients'
        }

        dbService.alterTableForeignKey(body).then((result)=>{
            res.status(200).send(result)

        }).catch((error)=>{
            res.status(500).send(error)

        })
    }

    return{
        addTable,
        describeTable,
        deleteTable,
        changeColumn,
        renameColumn,
        addForeinkey
    }
}

module.exports = corporateStructureController