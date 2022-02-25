const axios = require('axios');

const searchCNPJ = async ()=>{
    let json = {}
    
    try {
        const {data} = await axios.get('https://receitaws.com.br/v1/cnpj/10293721000190');

        json = {
            date_situation: data.data_situacao,
            type: data.tipo,
            name: data.nome,
            sth: data.uf,
            telephone: data.telefone,
            email: data.email,
            secondary_activity: data.atividades_secundarias.map((x)=>{ return {...x,refCnpj:data.cnpj}}),
            qsa: data.qsa.map((x)=>{ return {...x,refCnpj:data.cnpj}}),
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
        
        return json

    } catch (err) {
        
        console.log(err)
        return err
    }

}

const getResult = async ()=>{
    const result = await searchCNPJ()

    console.log(result)

    //return result
}

getResult()


//console.log(getResult())