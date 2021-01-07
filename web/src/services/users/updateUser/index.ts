import api from '../api'

export const updateUser = async (body: object, id: number) => {
  await api.put(`user/${id}`, body)
}
