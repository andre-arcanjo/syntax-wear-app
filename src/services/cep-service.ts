export const fetchCEP = async (cep: string) => {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)

    if(!response.ok) {
        throw new Error('Não foi possível buscar o CEP. Tente novamente')
    }

    const data = await response.json()

    if(data.erro) {
        throw new Error('Cep não encontrado.')
    }

    return {
        street: data.logradouro,
        neighborhood: data.bairro,
        complement: data.complemento,
        city: data.localidade,
        state: data.uf,
        region: data.regiao,
    }
}
