import { get, post } from '../utils/request'

export const login = async (data) => {
  const url = '/user/login'
  const result = await get(url, data)

  if (result.code === 0) {
    return result.data
  }
  return false
}