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
            column: 'idClient varchar(20)'
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

    const getJoinClientsAndUsers = (req,res)=>{
        const table = req.params.table
        const table2 = req.params.table2
        const body = {
            foreignkey: req.params.foreignKey,
            foreignkey2: req.params.foreignKey2,
            columns:["clients.id","clients.date","clients.name","clients.fantasy","clients.status","users.nameUser"]
        }
        
        dbService.selectJoin(body,table,table2).then((result)=>{
            response(res).send(result)

        }).catch((error)=>{
            response(res).error()
            console.log(error)

        })
    }

    const getOneJoinClientsAndUsers = (req,res)=>{
        let id = req.params.id
        
        dbService.connection.query(`select clients.id,clients.date,clients.name,clients.fantasy,clients.status,users.nameUser from list_clients join clients on clients.id=list_clients.idClient join users on users.id=list_clients.idUser where list_clients.idUser=${id}`,(error,result)=>{
            if(error) response(res).error()

            response(res).send(result)
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
        getJoinClientsAndUsers,
        getOneJoinClientsAndUsers,
        removeItem
    }
}

module.exports = ListCLientsController