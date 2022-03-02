const DBSevice = require("../DBService")
const { response } = require("../response")

const ListCLientsController = ()=>{
    const options = {
        table: 'list_cients',
        orderBy: 'id'
    }

    let dbService = DBSevice(options)

    const addTable = (req,res)=>{
        const body = [
            'date date',
            'iduser int',
            'idClient int'
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

    const create = async (req,res)=>{
        const body = {
            columns:['id','date','idUser','idClient'],
            values:[req.body.id,new Date(),req.body.idUser,req.body.idClient]
        }

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

    return{
        addTable,
        describeTable,
        create,
        getAll
    }
}

module.exports = ListCLientsController