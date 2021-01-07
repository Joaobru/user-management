import api from '../api'

export const deleteUser = async (id: number, page:number) => {
  await api.delete(`user/${id}`)

  const user = await api.get(`user?page=${page}&limit=5`)
  console.log(user.data)
  return user.data
}
