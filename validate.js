const DBSevice = require("./DBService")

const validate = (id)=>{

    const verifyId = ()=>{
        console.log('Entrei aqui')
        console.log('id:',id)
        DBSevice().connection.query(`select * from clients order by id`,(error,result)=>{
            if(error){
                throw Error(error)

            }else{
                console.log('result:',result)

                result.forEach((x)=>{
                    if(x.id === id){
                        throw Error('there is already a record with this id')
                    }
                })
            }

        })
    }

    const clients = ()=>{

        verifyId()

        if(fields.date_situation === '') throw Error('The date_situation field needs to be filled')
        if(fields.type === '') throw Error('The type field needs to be filled')
        if(fields.name === '') throw Error('The name field needs to be filled')
        if(fields.sth === '') throw Error('The sth field needs to be filled')
        if(fields.situation === '') throw Error('The situation field needs to be filled')
        if(fields.district === '') throw Error('The district field needs to be filled')
        if(fields.address === '') throw Error('The address field needs to be filled')
        if(fields.number === '') throw Error('The number field needs to be filled')
        if(fields.zip_code === '') throw Error('The zip_code field needs to be filled')
        if(fields.city === '') throw Error('The city field needs to be filled')
        if(fields.company_size === '') throw Error('The company_size field needs to be filled')
        if(fields.opening === '') throw Error('The opening field needs to be filled')
        if(fields.legal_nature === '') throw Error('The legal_nature field needs to be filled')
        if(fields.fantasy === '') throw Error('The fantasy field needs to be filled')
        if(fields.cnpj === '') throw Error('The cnpj field needs to be filled')
        if(fields.status === '') throw Error('The status field needs to be filled')
        if(fields.joint_stock === '') throw Error('The joint_stock field needs to be filled')

    }

    const secondaryActivity = ()=>{

        verifyId()
    }

    const corporateStructure = ()=>{
        
        verifyId()
    }

    return {
        clients,
        secondaryActivity,
        corporateStructure
    }
}

module.exports = validate

