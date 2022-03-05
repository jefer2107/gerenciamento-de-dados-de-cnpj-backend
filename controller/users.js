const DBSevice = require("../DBService")
const { response, emailFormat } = require("../response")

const usersController = ()=>{
    const options = {
        table: 'users',
        orderBy: 'id'
    }

    let dbService = DBSevice(options)

    const addTable = (req,res)=>{
        const body = [
            'date date',
            'nameUser varchar(30)',
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
            column: 'name',
            to: 'nameUser varchar(30)'
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

    const verifyUser = async (email)=>{
        console.log('veriFyUser email:',email)
        let resultMysql
        
        await dbService.selectAll().then((result)=>{
            const newResult = result.length !== 0? result.filter(e=> e.email === email): null

            resultMysql = newResult

        }).catch((error)=>{
            throw Error(error)
        })

        if(resultMysql !== null && resultMysql[0]?.email === email) throw Error('An account with this email already exists')
    }

    const validateUser = async (user)=>{
        console.log('validateUser user:',user)
        if(user.nameUser === "" || user.email === "" || user.password === "") throw Error("You need to fill in the empty fields")
        if(user.email.length > 30) throw Error("Email cannot be longer than 30 characters")
        await emailFormat(user.email)

        if(user.password.length !== 6) throw Error("Password should be 6 characters")
    }

    const create = async (req,res)=>{
        const body = {
            columns:['date','nameUser','email','admin','password'],
            values:[new Date(),req.body.nameUser,req.body.email,(!req.body.admin || req.body.admin === ''? 'false':req.body.admin),req.body.password]
        }

        await verifyUser(req.body.email)
        await validateUser(req.body)

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

    const getAllunauthenticated = (req,res)=>{
        dbService.selectAll().then((result)=>{
            response(res).send(result)

        }).catch((error)=>{
            response(res).error()
            console.log(error)

        })
    }

    const getOne = (req,res)=>{

        dbService.selectOne(req.params.id).then((result)=>{
        
            try {
                const item = result.length !== 0? result[0]: null

                if(!item) response(res).error()
                response(res).send(item)

            } catch (error) {
                response(res).error()
            }

        }).catch((error)=>{
            response(res).error()
            console.log(error)
        })
    }

    const changeItem = (req,res)=>{
        const body= {
            columns:['nameUser','email','admin'],
            values:[req.body.nameUser,req.body.email,(!req.body.admin || req.body.admin === ""?"false":req.body.admin)]
        }

        dbService.updateChange(body,req.params.id).then((result)=>{
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
        create,
        getAll,
        getAllunauthenticated,
        getOne,
        changeItem,
        removeItem
    }
}

module.exports = usersController