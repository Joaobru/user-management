import api from '../api'

export const postUser = async (body: object) => {
  await api.post('user', body)
}
