const axios = require('axios')

const searchCNPJ = async (cnpj)=>{
    let json = {}
    
    try {
        const {data} = await axios.get(`https://receitaws.com.br/v1/cnpj/${cnpj}`);

        json = {
            cnpj: data.cnpj,
            date_situation: data.data_situacao,
            type: data.tipo,
            name: data.nome,
            sth: data.uf,
            telephone: data.telefone,
            email: data.email,
            secondary_activity: data.atividades_secundarias,
            qsa: data.qsa,
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
            status: data.status,
            complement: data.complemento,
            joint_stock: data.capital_social
        }
        
        return json

    } catch (err) {
        
        return err
    }

}

module.exports = searchCNPJ