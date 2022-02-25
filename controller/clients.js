const res = require("express/lib/response")
const DBSevice = require("../DBService")
const searchCNPJ = require("../searchCNPJ")


const clientsController = ()=>{
    const options = {
        table: 'clients',
        orderBy: 'id'
    }

    let dbService = DBSevice(options)

    const addTable = (req,res)=>{
        const body = [
            'date date',
            'date_situation varchar(30)',
            'type varchar(30)',
            'name varchar(30)',
            'sth varchar(2)',
            'telephone varchar(30)',
            'email varchar(30)',
            'secondary_activity int',
            'qsa int',
            'situation varchar(15)',
            'district varchar(30)',
            'address varchar(30)',
            'number varchar(30)',
            'zip_code int',
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

    const getCNPJ = async (req,res)=>{
        const json = await searchCNPJ(req.body.cnpj)

        console.log('json:',json)

        res.status(200).send(json)
    }

    const create = (req,res)=>{
        const body = {
            columns:['date','date_situation','type','name','sth','telephone','email','secondary_activity','qsa','situation','district','address','number','zip_code','city','company_size','opening','legal_nature','fantasy','cnpj','status','complement','joint_stock',],
            values:[new Date(),req.body.date_situation,req.body.type,req.body.name,req.body.sth,req.body.telephone,req.body.email,req.body.secondary_activity,req.body.qsa,req.body.situation,req.body.district,req.body.address,req.body.number,req.body.zip_code,req.body.city,req.body.company_size,req.body.opening,req.body.legal_nature,req.body.fantasy,req.body.cnpj,req.body.status,req.body.complement,req.body.joint_stock,]
        }

        dbService.insert(body).then((result)=>{
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

    return{
        addTable,
        describeTable,
        deleteTable,
        changeColumn,
        renameColumn,
        getCNPJ,
        create,
        getAll
    }
}

module.exports = clientsController