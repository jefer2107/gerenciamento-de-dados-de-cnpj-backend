const DBSevice = require("../DBService")
const { response } = require("../response")
const validate = require("../validate")

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
            response(res).send(result)

        }).catch((error)=>{
            response(res).error()
            console.log(error)

        })
    }

    const describeTable = (req,res)=>{
        dbService.descTable().then((result)=>{
            response(res).send(result)

        }).catch((error)=>{
            response(res).error()
            console.log(error)
        })
    }

    const deleteTable = (req,res)=>{
        dbService.dropTable().then((result)=>{
            response(res).send(result)

        }).catch((error)=>{
            response(res).error()
            console.log(error)

        })
    }

    const changeColumn = (req,res)=>{
        const body = {
            column: 'name varchar(30)'
        }

        dbService.modifyColumn(body).then((result)=>{
            response(res).send(result)

        }).catch((error)=>{
            response(res).error()
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
            response(res).send(result)

        }).catch((error)=>{
            response(res).error()
            console.log(error)

        })
    }

    const create = async (req,res)=>{
        
        req.body.secondary_activity.forEach((x)=>{
            const body = {
                columns: ['text','code','CNPJClients'],
                values: [x.text,x.code,x.refCnpj]
            }

            //validate(x.refCnpj).secondaryActivity()

            dbService.insert(body).then((result)=>{
                response(res).send(result)

            }).catch((error)=>{
                response(res).error()
                console.log(error)
            })
        })
        
    }

    const getAll = async (req,res)=>{
        
        dbService.selectAll().then((result)=>{
            response(res).send(result)

        }).catch((error)=>{
            response(res).error()
            console.log(error)

        })
    }

    const removeItem = (req,res)=>{

        dbService.deleteItem(req.params.id).then((result)=>{
            response(res).send(result)

        }).catch((error)=>{
            response(res).error()
            console.log(error)
        })
    }

    const removeAll = async (req,res)=>{

        const items = await dbService.selectAll().then((x)=>{return x}).catch((error)=>{return error})

        items.forEach((x)=>{
            dbService.deleteItem(x.id).then((result)=>{
                response(res).send(result)
    
            }).catch((error)=>{
                response(res).error()
                console.log(error)
            })
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
        removeItem,
        removeAll
    }
}

module.exports = secondaryActivityController