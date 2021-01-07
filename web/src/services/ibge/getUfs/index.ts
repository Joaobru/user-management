import ibge from '../ibge'

export const getUfs = async () => {
  const ufs = await ibge.get('/')
  console.log(ufs.data)
  return ufs.data
}
