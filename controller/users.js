const DBSevice = require("../DBService")
const { response, emailFormat } = require("../response")
const searchCNPJ = require("../searchCNPJ")
const validate = require("../validate")

const usersController = ()=>{
    const options = {
        table: 'users',
        orderBy: 'id'
    }

    let dbService = DBSevice(options)

    const addTable = (req,res)=>{
        const body = [
            'date date',
            'name varchar(30)',
            'email varchar(30)',
            'admin vachar(5)',
            'password varchar(30)'
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
            column: 'email varchar(30)'
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
            column: 'admin varchar(5)',
            position: 'after',
            of: 'email'
        }

        dbService.alterTableAddColumn(body).then((result)=>{
            response(res).send(result)

        }).catch((error)=>{
            response(res).error()
            console.log(error)

        })
    }

    const getCNPJ = (req,res)=>{
        searchCNPJ(req.params.id).then((result)=>{
            response(res).send(result)

        }).catch((error)=>{
            response(res).error()
            console.log(error)
        })

    }

    

    const create = async (req,res)=>{
        const body = {
            columns:['date','name','email','admin','password'],
            values:[new Date(),req.body.name,req.body.email,(!req.body.admin || req.body.admin === ''? 'false':req.body.admin),req.body.password]
        }

        //validate(req.body.id).clients()
        emailFormat(req.body.email)

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
        deleteTable,
        changeColumn,
        renameColumn,
        addColumn,
        getCNPJ,
        create,
        getAll,
        removeItem
    }
}

module.exports = usersController