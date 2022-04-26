import api from '../api'

export const postUser = async (body: object) => {
  const result = await api.post('user', body)

  return result
}
