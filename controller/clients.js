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
            'data_situacao varchar(30)',
            'tipo varchar(30)',
            'uf varchar(2)',
            'telefone varchar(30)',
            'email varchar(30)',
            'atividades_secundarias int',
            'qsa int',
            'situacao varchar(30)',
            'bairro varchar(30)',
            'logradouro varchar(30)',
            'cep int',
            'municipio varchar(30)',
            'porte varchar(30)',
            'natureza_juridica varchar(30)',
            'fantasia varchar(30)',
            'cnpj varchar(30)',
            'ultima_atualizacao varchar(30)',
            'status varchar(30)',
            'complemento varchar(30)',
            'capital_social int',
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

    const getAll = async (req,res)=>{
        const json = await searchCNPJ(req.body.cnpj)

        res.status(200).send(json)
    }

    return{
        addTable,
        describeTable,
        deleteTable,
        changeColumn,
        renameColumn,
        getAll
    }
}

module.exports = clientsController