const DBSevice = require("./DBService")
const { response } = require("./response")


const removeAllActivity = async (req,res)=>{
    const option = {
        table: 'secondaryActivity',
        orderBy: 'id'
    }

    let dbService = DBSevice(option)

    await dbService.selectAll().then((resultMysql)=>{
        resultMysql.forEach((x)=>{

            dbService.deleteItem(x.id).then((result)=>{
                response(res).send(result)

            }).catch((error)=>{
                response(res).error()
                console.log(error)
            })

        })

        console.log('1.2')

    }).catch((error)=>{
        response(res).error()
        console.log(error)

        console.log('1.2 error')
    })
}

const removeAllCorporate = async (req,res)=>{
    const option = {
        table: 'corporateStructure',
        orderBy: 'id'
    }

    let dbService = DBSevice(option)

    await dbService.selectAll().then((resultMysql)=>{
        resultMysql.forEach((x)=>{

            dbService.deleteItem(x.id).then((result)=>{
                response(res).send(result)

            }).catch((error)=>{
                response(res).error()
                console.log(error)
            })
        })

        console.log('2.2')

    }).catch((error)=>{
        response(res).error()
        console.log(error)

        console.log('2.2 error')
    })
}

module.exports = {
    removeAllActivity,
    removeAllCorporate
}