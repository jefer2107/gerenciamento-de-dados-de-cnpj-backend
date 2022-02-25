const DBSevice = require("../DBService")
const searchCNPJ = require("../searchCNPJ")

const secondaryActivityController = ()=>{
    const options = {
        table: 'secondaryActivity',
        orderBy: 'id'
    }

    let dbService = DBSevice(options)

    const addTable = (req,res)=>{
        const body = [
            'text varchar(100)',
            'code varchar(30)',
            'CNPJClients varchar(30)'
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
            column: 'names',
            to: 'name varchar(30)'
        }

        dbService.changeColumn(body).then((result)=>{
            response(res).send(result)

        }).catch((error)=>{
            response(res).error()
            console.log(error)
        })
    }

    const addForeinkey = (req,res)=>{
        const body = {
            foreignKey: 'CNPJClients',
            tableReferences: 'clients'
        }

        dbService.alterTableForeignKey(body).then((result)=>{
            res.status(200).send(result)

        }).catch((error)=>{
            res.status(500).send(error)

        })
    }

    const create = async (req,res)=>{
        
        req.body.secondary_activity.forEach((x)=>{
            const body = {
                columns: ['text','code','CNPJClients'],
                values: [x.text,x.code,x.refCnpj]
            }

            dbService.insert(body).then((result)=>{
                res.status(200).send(result)

            }).catch((error)=>{
                res.status(500).send(error)
            })
        })
        
    }

    const getAll = (req,res)=>{
        
        dbService.selectAll().then((result)=>{
            res.status(200).send(result)

        }).catch((error)=>{
            res.status(500).send(error)

        })
    }

    const removeItem = (req,res)=>{

        dbService.deleteItem(req.params.id).then((result)=>{
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
        addForeinkey,
        getAll,
        create,
        removeItem
    }
}

module.exports = secondaryActivityController