const DBSevice = require("../DBService")
const { removeAllActivity, removeAllCorporate } = require("../removeAll")
const { response, emailFormat } = require("../response")
const searchCNPJ = require("../searchCNPJ")

const clientsController = ()=>{
    const options = {
        table: 'clients',
        orderBy: 'date'
    }

    let dbService = DBSevice(options)

    const addTable = (req,res)=>{
        const body = [
            'id varchar(30)',
            'date date',
            'user varchar(30)',
            'date_situation varchar(30)',
            'type varchar(30)',
            'name varchar(30)',
            'sth varchar(2)',
            'telephone varchar(30)',
            'email varchar(30)',
            'situation varchar(15)',
            'district varchar(30)',
            'address varchar(30)',
            'number varchar(30)',
            'zip_code varchar(30)',
            'city varchar(30)',
            'company_size varchar(30)',
            'opening varchar(10)',
            'legal_nature varchar(30)',
            'fantasy varchar(30)',
            'cnpj varchar(30)',
            'status varchar(30)',
            'complement varchar(30)',
            'joint_stock varchar(30)',
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
            response(res).send(result)
            console.log(error)

        })
    }

    const changeColumn = (req,res)=>{
        const body = {
            column: 'user int'
        }

        dbService.modifyColumn(body).then((result)=>{
            response(res).send(result)

        }).catch((error)=>{
            res.status(500).send(error)
            console.log(error)

        })
    }

    const renameColumn = (req,res)=>{
        const body = {
            column: 'cnpj',
            to: 'id varchar(30)'
        }

        dbService.changeColumn(body).then((result)=>{
            response(res).send(result)

        }).catch((error)=>{
            response(res).error()
            console.log(error)
        })
    }

    const addColumn = (req,res)=>{
        const body = {
            column: 'user varchar(30)',
            position: 'after',
            of: 'date'
        }

        dbService.alterTableAddColumn(body).then((result)=>{
            response(res).send(result)

        }).catch((error)=>{
            response(res).error()
            console.log(error)

        })
    }

    const createForeignKey = (req,res)=>{
        const body = {
            foreignKey: 'user',
            references: 'users'
        }

        dbService.alterTableForeignKey(body).then((result)=>{
            response(res).send(result)

        }).catch((error)=>{
            response(res).error()
            console.log(error)

        })
    }

    const getOne = async (req,res)=>{
        searchCNPJ(req.params.id,req.params.user).then((result)=>{
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
        const body = {
            columns:['id','date','date_situation','type','name','sth','telephone','email','situation','district','address','number','zip_code','city','company_size','opening','legal_nature','fantasy','cnpj','status','complement','joint_stock',],
            values:[req.body.id,new Date(),req.body.date_situation,req.body.type,req.body.name,req.body.sth,req.body.telephone,req.body.email,req.body.situation,req.body.district,req.body.address,req.body.number,req.body.zip_code,req.body.city,req.body.company_size,req.body.opening,req.body.legal_nature,req.body.fantasy,req.body.cnpj,req.body.status,req.body.complement,req.body.joint_stock,]
        }

        emailFormat(req.body.email)

        dbService.insert(body).then((result)=>{
            response(res).send(result)

        }).catch((error)=>{
            response(res).error()
            console.log(error)

        })
    }

    const removeClient = async (req,res)=>{

        await dbService.deleteItem(req.params.id).then((result)=>{
            console.log("removeClient")
            response(res).send(result)

        }).catch((error)=>{
            response(res).error()
            console.log(error)

        })
        
    }

    const getJoinClientsAndUsers = (req,res)=>{
        dbService.connection.query(`select clients.id,clients.date,clients.name,clients.fantasy,clients.status,users.nameUser from clients join users on clients.user=users.id`,(error,result)=>{
            if(error) response(res).error()

            response(res).send(result)
        })
    }

    const getOneJoinClientAndUsers = (req,res)=>{
        let id = req.params.id

        dbService.connection.query(`select clients.id,clients.date,clients.name,clients.fantasy,clients.status,users.nameUser from clients join users on clients.user=users.id where clients.user=${id}`,(error,result)=>{
            if(error) response(res).error()

            response(res).send(result)
        })
    }

    const removeItem = async (req,res)=>{
        console.log("removeItem")
        await removeAllActivity(req,res)
        await removeAllCorporate(req,res)
        await removeClient(req,res)
    }

    return{
        addTable,
        describeTable,
        deleteTable,
        changeColumn,
        renameColumn,
        addColumn,
        createForeignKey,
        create,
        getOne,
        getAll,
        getJoinClientsAndUsers,
        getOneJoinClientAndUsers,
        removeItem
    }
}

module.exports = clientsController