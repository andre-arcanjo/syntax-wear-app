const SHIPPING_BY_REGION: Record<string, number> = {
  Norte: 39.9,
  Nordeste: 29.9,
  'Centro-Oeste': 24.9,
  Sudeste: 14.9,
  Sul: 19.9,
};

export const fetchCEP = async (cep: string) => {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)

    if(!response.ok) {
        throw new Error('Não foi possível buscar o CEP. Tente novamente')
    }

    const data = await response.json()

    if(data.erro) {
        throw new Error('Cep não encontrado.')
    }

    const shippingCost = SHIPPING_BY_REGION[data.regiao]

    return {
        street: data.logradouro,
        neighborhood: data.bairro,
        complement: data.complemento,
        city: data.localidade,
        state: data.uf,
        region: data.regiao,
        shippingCost
    }
}
