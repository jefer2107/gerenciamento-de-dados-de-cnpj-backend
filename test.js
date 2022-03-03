const axios = require('axios');
const DBSevice = require('./DBService');

const searchCNPJ = (cnpj)=>{
    const options = {
        table:"table",
        orderBy: "id"
    }

    let dbService = DBSevice(options)

    dbService.connection.query(`select * from clients join secondaryActivity on secondaryActivity.CNPJClients=clients.id 
    join corporateStructure on corporateStructure.CNPJClients=clients.id join users on users.id=clients.user where clients.id=${cnpj};`,(error,result)=>{
        if(error) console.log(error)

        console.log(result[0].nameUser)
    })
    
    // return new Promise(async(res,rej)=>{
    //     let json = {}
        
    //     try {
    //         const {data} = await axios.get('https://receitaws.com.br/v1/cnpj/10836288000192');
    //         const newCNPJ = data.cnpj.replace('.','').replace('.','').replace('/','').replace('-','')
            
    //         json = {
    //             id: newCNPJ,
    //             date_situation: data.data_situacao,
    //             type: data.tipo,
    //             name: data.nome,
    //             sth: data.uf,
    //             telephone: data.telefone,
    //             email: data.email,
    //             secondary_activity: data.atividades_secundarias.map((x)=>{ return {...x,refCnpj:newCNPJ}}),
    //             qsa: data.qsa.map((x)=>{ return {...x,refCnpj:newCNPJ}}),
    //             situation: data.situacao,
    //             district: data.bairro,
    //             address: data.logradouro,
    //             number: data.numero,
    //             zip_code: data.cep,
    //             city: data.municipio,
    //             company_size: data.porte,
    //             opening: data.abertura,
    //             legal_nature: data.natureza_juridica,
    //             fantasy: data.fantasia,
    //             cnpj: data.cnpj,
    //             status: data.status,
    //             complement: data.complemento,
    //             joint_stock: data.capital_social
    //         }
            
    //         return res(json)

    //     } catch (err) {
            
    //         console.log(err)
    //         return rej(err)
    //     }
    // })
    
}

const getResult = async ()=>{
    searchCNPJ().then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })

    

    //return result
}

searchCNPJ("10293721000190")


//console.log(getResult())