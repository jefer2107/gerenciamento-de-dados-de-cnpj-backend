const axios = require('axios')

const searchCNPJ = async (cnpj)=>{
    let json = {}
    
    try {
        const {data} = await axios.get(`https://receitaws.com.br/v1/cnpj/${cnpj}`);

        json = {
            data_situacao: data.data_situacao,
            tipo: data.tipo,
            nome: data.nome,
            uf: data.uf,
            telefone: data.telefone,
            email: data.email,
            atividades_secundarias: data.atividades_secundarias.map((x)=>{return {text: x.text}}),
            quadro_societário: data.qsa,
            situacao: data.situacao,
            bairro: data.bairro,
            logradouro: data.logradouro,
            numero: data.numero,
            cep: data.cep,
            municipio: data.municipio,
            porte: data.porte,
            abertura: data.abertura,
            natureza_juridica: data.natureza_juridica,
            fantasia: data.fantasia,
            cnpj: data.cnpj,
            complemento: data.complemento,
            capital_social: data.capital_social
        }
        
        return json

    } catch (err) {
        
        return err
    }

}

module.exports = searchCNPJ