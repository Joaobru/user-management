import api from '../api'

export const getUsers = async (page: number, action: string, setPage: Function) => {
  if (action === '') {
    const user = await api.get(`user?page=${page}&limit=5`)
    console.log(user)
    return user.data
  } else if (action === 'prev') {
    const user = await api.get(`user?page=${page}&limit=5`)
    console.log(user)
    return user.data
  }

  const user = await api.get(`user?page=${page}&limit=5`)
  console.log(user.data)
  return user.data
}
