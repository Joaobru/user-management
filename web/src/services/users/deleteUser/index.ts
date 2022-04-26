import api from '../api'

export const deleteUser = async (id: number) => {
  const user = await api.delete(`user/${id}`)

  return user.data
}
