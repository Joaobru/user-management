import api from '../api'

export const getUsers = async (page: number) => {
  const user = await api.get(`user?page=${page}&limit=5`)

  return user.data
}
