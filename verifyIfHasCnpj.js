const DBSevice = require("./DBService");


const verifyIfHasCnpj = async (id)=>{
    const options = {
        table: 'clients',
        orderBy: 'id'
    }

    let dbService = DBSevice(options)

    let hasCnpj;
    let number = 0
    await dbService.selectAll().then((result)=>{

        if(result.length !== 0){

            result.map((x)=>{
                hasCnpj = x.id === id

                if(hasCnpj === true){
                    ++number
                }

            })

            hasCnpj = number > 0
            return hasCnpj

        }else{
            hasCnpj = result
            return hasCnpj
        }

    }).catch((error)=>{
        hasCnpj = error
        return error
        
    })

    return hasCnpj
}

module.exports = verifyIfHasCnpj