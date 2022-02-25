const DBSevice = require("../DBService")
const searchCNPJ = require("../searchCNPJ")

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
            foreignKey: 'CNPJClients',
            tableReferences: 'clients'
        }

        dbService.alterTableForeignKey(body).then((result)=>{
            res.status(200).send(result)

        }).catch((error)=>{
            res.status(500).send(error)

        })
    }

    const getAll = (req,res)=>{
        dbService.selectAll().then((result)=>{
            res.status(200).send(result)

        }).catch((error)=>{
            res.status(500).send(error)

        })
    }

    const create = async (req,res)=>{
        
        const newCNPJ = req.body.CNPJClients.replace('.','').replace('.','').replace('/','').replace('-','')
        const result = await searchCNPJ(newCNPJ)
        const resultSize = result.qsa.length
        
        for(let index=0; index < resultSize; index++){
            const body = {
                columns: ['what','name','CNPJClients'],
                values: [req.body.what,req.body.name,req.body.CNPJClients]
            }

            dbService.insert(body).then((result)=>{
                res.status(200).send(result)

            }).catch((error)=>{
                res.status(500).send(error)
            })
        }
        
    }

    const relateClient = (req,res)=>{
        const id = req.params.id
        const body = {
            column: 'idClients',
            id: req.body.id
        }

        dbService.updateTableForeignKey(body,id).then((result)=>{
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
        relateClient
    }
}

module.exports = corporateStructureController