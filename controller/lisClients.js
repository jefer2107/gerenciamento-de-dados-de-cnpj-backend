const DBSevice = require("../DBService")
const { response } = require("../response")

const ListCLientsController = ()=>{
    const options = {
        table: 'list_clients',
        orderBy: 'id'
    }

    let dbService = DBSevice(options)

    const addTable = (req,res)=>{
        const body = [
            'date date',
            'iduser int',
            'idClient int(30)'
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

    const renameTable = (req,res)=>{
        const body = {
            table: 'list_clients'
        }

        dbService.alterTableRenameTo(body).then((result)=>{
            response(res).send(result)

        }).catch((error)=>{
            response(res).error()
            console.log(error)
        })
    }

    const changeColumn = (req,res)=>{
        const body = {
            column: 'idClient int(30)'
        }

        dbService.modifyColumn(body).then((result)=>{
            response(res).send(result)

        }).catch((error)=>{
            res.status(500).send(error)
            console.log(error)

        })
    }

    const create = async (req,res)=>{
        const body = {
            columns:['id','date','idUser','idClient'],
            values:[req.body.id,new Date(),req.body.idUser,req.body.idClient]
        }

        dbService.insert(body).then((result)=>{
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
        renameTable,
        changeColumn,
        create,
        getAll,
        removeItem
    }
}

module.exports = ListCLientsController