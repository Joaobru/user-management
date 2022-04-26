import api from '../api'

export const updateUser = async (body: object, id: number) => {
  const result = await api.put(`user/${id}`, body)

  return result
}
