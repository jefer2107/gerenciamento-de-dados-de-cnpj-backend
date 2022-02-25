const DBSevice = require("../DBService")
const { response } = require("../response")

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
            column: 'qualquer',
            to: 'what varchar(30)'
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

    const getAll = (req,res)=>{
        dbService.selectAll().then((result)=>{
            response(res).send(result)

        }).catch((error)=>{
            response(res).error()
            console.log(error)

        })
    }

    const create = async (req,res)=>{
        
        req.body.qsa.forEach((x)=>{
            const body = {
                columns: ['what','name','CNPJClients'],
                values: [x.qual,x.nome,x.refCnpj]
            }

            dbService.insert(body).then((result)=>{
                response(res).send(result)

            }).catch((error)=>{
                response(res).error()
                console.log(error)
            })
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

module.exports = corporateStructureController