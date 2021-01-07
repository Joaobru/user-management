import ibge from '../ibge'

export const getCityList = async (uf: string) => {
  const cityList = await ibge.get(`/${uf}/municipios`)

  return cityList.data
}
