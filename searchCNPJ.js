const axios = require('axios')
const DBSevice = require('./DBService')
const { response } = require('./response')
const verifyIfHasCnpj = require('./verifyIfHasCnpj')

const saveClient = async (json)=>{
    const options = {
        table: 'clients',
        orderBy: 'id'
    }

    let dbService = DBSevice(options)

    const body = {
        columns:['id','date','user','date_situation','type','name','sth','telephone','email','situation','district','address','number','zip_code','city','company_size','opening','legal_nature','fantasy','cnpj','status','complement','joint_stock'],
        values:[json.id,new Date(),json.user,json.date_situation,json.type,json.name,json.sth,json.telephone,json.email,json.situation,json.district,json.address,json.number,json.zip_code,json.city,json.company_size,json.opening,json.legal_nature,json.fantasy,json.cnpj,json.status,json.complement,json.joint_stock]
    }

    await dbService.insert(body).then((result)=>{
        return result
    }).catch((error)=>{
        console.log(error)
        return error
    })
}

const saveAcitivitiesData = async (json)=>{
    const options = {
        table: 'secondaryActivity',
        orderBy: 'id'
    }

    let dbService = DBSevice(options)

    await json.secondary_activity.forEach(async(x)=>{
        const body = {
            columns: ['text','code','CNPJClients'],
            values: [x.text,x.code,x.refCnpj]
        }

        await dbService.insert(body).then((result)=>{
            return result

        }).catch((error)=>{
            console.log(error)
            return error
            
        })
    })
}

const saveCorporatesData = async (json)=>{
    const options = {
        table: 'corporateStructure',
        orderBy: 'id'
    }

    let dbService = DBSevice(options)

    await json.qsa.forEach(async(x)=>{
        const body = {
            columns: ['qual','nome','CNPJClients'],
            values: [x.qual,x.nome,x.refCnpj]
        }

        await dbService.insert(body).then((result)=>{
            return result

        }).catch((error)=>{
            console.log(error)
            return error
            
        })
    })
}

const getClients = (cnpj)=>{
    return new Promise((res,rej)=>{

        DBSevice().connection.query(`select * from clients join users on clients.user=users.id where clients.id=${cnpj}`,(error,result)=>{
            if(error) return rej(error)
    
            return res(result)
        })
    })
    
}

const getActivity = (cnpj)=>{
    return new Promise((res,rej)=>{

        DBSevice().connection.query(`select * from secondaryActivity where CNPJClients=${cnpj}`,(error,result)=>{
            if(error) return rej(error)
    
            return res(result)
        })
    })
    
}

const getCorporate = (cnpj)=>{
    
    return new Promise((res,rej)=>{

        DBSevice().connection.query(`select * from corporateStructure where CNPJClients=${cnpj}`,(error,result)=>{
            if(error) return rej(error)
    
            return res(result)
        })
    })

}


const searchCNPJ = async (cnpj,user)=>{

    const result = await verifyIfHasCnpj(cnpj)

    return new Promise(async(res,rej)=>{
        let json = {}

        if(!result || result.length === 0){
            
            try {
                const {data} = await axios.get(`https://receitaws.com.br/v1/cnpj/${cnpj}`);

                console.log("data:",data)

                DBSevice().connection.query(`select nameUser from users where id=${user}`,async(error,result)=>{
                    if(error) throw Error(error)

                    json = {
                        id: data.length !== 0 && cnpj,
                        date: new Date(),
                        user: (!user?'':user),
                        date_situation: data.data_situacao,
                        type: data.tipo,
                        name: data.nome,
                        sth: data.uf,
                        telephone: data.telefone,
                        email: data.email,
                        secondary_activity:data.atividades_secundarias.length === 0?data.atividades_secundarias: data.atividades_secundarias.map((x)=>{ return {...x,refCnpj:cnpj}}),
                        qsa:data.qsa.length === 0?data.qsa: data.qsa.map((x)=>{ return {...x,refCnpj:cnpj}}),
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
        
                    await saveClient(json)
                    await saveAcitivitiesData(json)
                    await saveCorporatesData(json)
                    
                    return res({...json,user:result[0].nameUser})
                })
    
            } catch (err) {
                
                return rej(err)
            }

        }else{
            
            try {
                let resultClients;
                let resultCorporate;
                let resultActivity;

                 await getClients(cnpj).then((result)=>{
                     resultClients = result
                 }).catch((error)=>{
                     resultClients = error
                 })
                 await getActivity(cnpj).then((result)=>{
                     resultActivity = result
                 }).catch((error)=>{
                     resultActivity = error
                 })
                 await getCorporate(cnpj).then((result)=>{
                    resultCorporate = result
                 }).catch((error)=>{
                     resultCorporate = error
                 })

                let itemClient = !resultClients || resultClients.length === 0? null: resultClients[0]
                let newSecondary_activity = !resultActivity || resultActivity.length === 0?null:resultActivity
                let newQsa = !resultCorporate || resultCorporate.length === 0?null:resultCorporate

                json = {
                    id: cnpj,
                    date:!itemClient?null:itemClient.date,
                    user: !itemClient?null:itemClient.nameUser,
                    date_situation: !itemClient?null:itemClient.date_situation,
                    type: !itemClient?null:itemClient.type,
                    name: !itemClient?null:itemClient.name,
                    sth: !itemClient?null:itemClient.sth,
                    telephone: !itemClient?null:itemClient.telephone,
                    email: !itemClient?null:itemClient.email,
                    secondary_activity: newSecondary_activity,
                    qsa: newQsa,
                    situation: !itemClient?null:itemClient.situation,
                    district: !itemClient?null:itemClient.district,
                    address: !itemClient?null:itemClient.address,
                    number: !itemClient?null:itemClient.number,
                    zip_code: !itemClient?null:itemClient.zip_code,
                    city: !itemClient?null:itemClient.city,
                    company_size: !itemClient?null:itemClient.company_size,
                    opening: !itemClient?null:itemClient.opening,
                    legal_nature: !itemClient?null:itemClient.legal_nature,
                    fantasy: !itemClient?null:itemClient.fantasy,
                    cnpj: !itemClient?null:itemClient.cnpj,
                    status: !itemClient?null:itemClient.status,
                    complement: !itemClient?null:itemClient.complement,
                    joint_stock: !itemClient?null:itemClient.joint_stock
                }

                return res(json)

            } catch (err) {
                
                return rej(err)
            }
        }
    })

}


module.exports = searchCNPJ