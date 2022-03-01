const axios = require('axios')
const DBSevice = require('./DBService')
const { response } = require('./response')
const verifyIfHasCnpj = require('./verifyIfHasCnpj')

const sendClientsData = async (json)=>{
    const options = {
        table: 'clients',
        orderBy: 'id'
    }

    let dbService = DBSevice(options)

    const body = {
        columns:['id','date','user','date_situation','type','name','sth','telephone','email','situation','district','address','number','zip_code','city','company_size','opening','legal_nature','fantasy','cnpj','status','complement','joint_stock'],
        values:[json.id,new Date(),json.user,json.date_situation,json.type,json.name,json.sth,json.telephone,json.email,json.situation,json.district,json.address,json.number,json.zip_code,json.city,json.company_size,json.opening,json.legal_nature,json.fantasy,json.cnpj,json.status,json.complement,json.joint_stock]
    }

    dbService.insert(body).then((result)=>{
        return result
    }).catch((error)=>{
        console.log(error)
        return error
    })
}

const sendAcitivitiesData = async (json)=>{
    const options = {
        table: 'secondaryActivity',
        orderBy: 'id'
    }

    let dbService = DBSevice(options)

    json.secondary_activity.forEach((x)=>{
        const body = {
            columns: ['text','code','CNPJClients'],
            values: [x.text,x.code,x.refCnpj]
        }

        dbService.insert(body).then((result)=>{
            return result

        }).catch((error)=>{
            console.log(error)
            return error
            
        })
    })
}

const sendCorporatesData = async (json)=>{
    const options = {
        table: 'corporateStructure',
        orderBy: 'id'
    }

    let dbService = DBSevice(options)

    json.qsa.forEach((x)=>{
        const body = {
            columns: ['qual','nome','CNPJClients'],
            values: [x.qual,x.nome,x.refCnpj]
        }

        dbService.insert(body).then((result)=>{
            return result

        }).catch((error)=>{
            console.log(error)
            return error
            
        })
    })
}

const getNewObjectActivity = async (result)=>{
    let newArray = []
    
    result.map((x)=>{
        if(newArray.length === 0){
            
            newArray.push({text:x.text})

        }else{
            
            let state = [...newArray]

            const isEqual = (state)=>{
                let number1 = 0
                let result;
                return state.map((e)=> { 

                    if(e.text === x.text){
                        number1 = 0
                        
                    }else{
                        number1 = 1
                    }

                    result = number1 * 1
                    return result
                    
                })
                
            }

            let returnResult = isEqual(state)

            let resultReduce = returnResult.reduce((a,b)=>{return(a * b)})

            if(resultReduce !== 0)

            newArray.push({text:x.text})

        }
        
    })

    return newArray
}

const getNewObjectQsa = async (result)=>{
    let newArray = []
    
    result.map((x)=>{
        if(newArray.length === 0){
            
            newArray.push({nome:x.nome,qual:x.qual})

        }else{
            
            let state = [...newArray]

            const isEqual = (state)=>{
                let number1 = 0
                let result;
                return state.map((e)=> { 

                    if(e.nome === x.nome){
                        number1 = 0
                        
                    }else{
                        number1 = 1
                    }

                    result = number1 * 1
                    return result
                    
                })
                
            }

            let returnResult = isEqual(state)

            let resultReduce = returnResult.reduce((a,b)=>{return(a * b)})

            if(resultReduce !== 0)

            newArray.push({nome:x.nome,qual:x.qual})

        }
        
    })

    return newArray
}

const searchCNPJ = async (cnpj,user)=>{

    const options = {
        table: 'clients',
        orderBy: 'id'
    }

    let dbService = DBSevice(options)

    const result = await verifyIfHasCnpj(cnpj)

    return new Promise(async(res,rej)=>{
        let json = {}
        let newCNPJ;

        if(!result || result.length === 0){
            
            try {
                const {data} = await axios.get(`https://receitaws.com.br/v1/cnpj/${cnpj}`);
                newCNPJ = data.cnpj.replace('.','').replace('.','').replace('/','').replace('-','')
    
                json = {
                    id: newCNPJ,
                    date: new Date(),
                    user: (!user?'':user),
                    date_situation: data.data_situacao,
                    type: data.tipo,
                    name: data.nome,
                    sth: data.uf,
                    telephone: data.telefone,
                    email: data.email,
                    secondary_activity: data.atividades_secundarias.map((x)=>{ return {...x,refCnpj:newCNPJ}}),
                    qsa: data.qsa.map((x)=>{ return {...x,refCnpj:newCNPJ}}),
                    situation: data.situacao,
                    district: data.bairro,
                    address: data.logradouro,
                    number: data.numero,
                    zip_code: data.cep,
                    city: data.municipio,
                    company_size: data.porte,
                    opening: data.abertura,
                    legal_nature: data.natureza_juridica,
                    fantasy: data.fantasia,
                    cnpj: data.cnpj,
                    status: data.status,
                    complement: data.complemento,
                    joint_stock: data.capital_social
                }
    
                await sendClientsData(json)
                await sendAcitivitiesData(json)
                await sendCorporatesData(json)
                
                return res(json)
    
            } catch (err) {
                
                return rej(err)
            }

        }else{

            try {
                
                dbService.connection.query(
                    `select * from clients join secondaryActivity on secondaryActivity.CNPJClients=clients.id 
                    join corporateStructure on corporateStructure.CNPJClients=clients.id where clients.id=${cnpj};`,
                    async(error,result)=>{
                        if(error) throw Error(error)

                        let newSecondary_activity = await getNewObjectActivity(result)
                        let newQsa = await getNewObjectQsa(result)
                        
                        newCNPJ = result[0].cnpj.replace('.','').replace('.','').replace('/','').replace('-','')
                        json = {
                            id: newCNPJ,
                            date: result[0].date,
                            user: user,
                            date_situation: result[0].date_situation,
                            type: result[0].type,
                            name: result[0].name,
                            sth: result[0].sth,
                            telephone: result[0].telephone,
                            email: result[0].email,
                            secondary_activity: newSecondary_activity,
                            qsa: newQsa,
                            situation: result[0].situation,
                            district: result[0].district,
                            address: result[0].address,
                            number: result[0].number,
                            zip_code: result[0].zip_code,
                            city: result[0].city,
                            company_size: result[0].company_size,
                            opening: result[0].opening,
                            legal_nature: result[0].legal_nature,
                            fantasy: result[0].fantasy,
                            cnpj: result[0].cnpj,
                            status: result[0].status,
                            complement: result[0].complement,
                            joint_stock: result[0].joint_stock
                        }

                        return res(json)
                    })

    
            } catch (err) {
                
                return rej(err)
            }
        }
    })

}

module.exports = searchCNPJ