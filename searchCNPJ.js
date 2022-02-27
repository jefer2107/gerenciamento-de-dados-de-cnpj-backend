const axios = require('axios')
const DBSevice = require('./DBService')
const { response } = require('./response')

const sendClientsData = async (json)=>{
    const options = {
        table: 'clients',
        orderBy: 'id'
    }

    let dbService = DBSevice(options)

    const body = {
        columns:['id','date','date_situation','type','name','sth','telephone','email','situation','district','address','number','zip_code','city','company_size','opening','legal_nature','fantasy','cnpj','status','complement','joint_stock'],
        values:[json.id,new Date(),json.date_situation,json.type,json.name,json.sth,json.telephone,json.email,json.situation,json.district,json.address,json.number,json.zip_code,json.city,json.company_size,json.opening,json.legal_nature,json.fantasy,json.cnpj,json.status,json.complement,json.joint_stock]
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
            columns: ['what','name','CNPJClients'],
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

const searchCNPJ = (cnpj)=>{

    return new Promise(async(res,rej)=>{
            let json = {}
        
        try {
            const {data} = await axios.get(`https://receitaws.com.br/v1/cnpj/${cnpj}`);
            const newCNPJ = data.cnpj.replace('.','').replace('.','').replace('/','').replace('-','')

            json = {
                id: newCNPJ,
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
    })
    
}

module.exports = searchCNPJ