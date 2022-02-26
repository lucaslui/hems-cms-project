import { User } from '@/domain/entities/user'
import { Profile } from '@/domain/entities/profile'
import axios from 'axios'

export default {
  post: {
    users: async (token: string, user: User): Promise<any> => await (
      axios.request({
        url: `${process.env.API_URL}/users`,
        method: 'post',
        headers: { 'x-access-token': token },
        data: user
      })
    )
  },
  put: {
    users: async (token: string, user: User): Promise<any> => await (
      axios.request({
        url: `${process.env.API_URL}/users/${user.id}`,
        method: 'put',
        headers: { 'x-access-token': token },
        data: user
      })
    ),
    userHemsId: async (token: string, hemsId: string): Promise<any> => await (
      axios.request({
        url: `${process.env.API_URL}/users/hems/${hemsId}`,
        method: 'put',
        headers: { 'x-access-token': token }
      })
    ),
    userProfile: async (token: string, profile: Profile): Promise<any> => await (
      axios.request({
        url: `${process.env.API_URL}/users/profile`,
        method: 'put',
        headers: { 'x-access-token': token },
        data: profile
      })
    )
  },
  get: {
    users: async (token: string): Promise<User[]> => (
      await axios.request({
        url: `${process.env.API_URL}/users/`,
        method: 'get',
        headers: { 'x-access-token': token }
      })
    ).data,
    userHems: async (token: string): Promise<{hemsId: string}> => (
      await axios.request({
        url: `${process.env.API_URL}/users/hems/`,
        method: 'get',
        headers: { 'x-access-token': token }
      })
    ).data,
    userProfile: async (token: string): Promise<Profile> => (
      await axios.request({
        url: `${process.env.API_URL}/users/profile`,
        method: 'get',
        headers: { 'x-access-token': token }
      })
    ).data
  },
  delete: {
    users: async (token: string, userId: string): Promise<any> => await (
      axios.request({
        url: `${process.env.API_URL}/users/${userId}`,
        method: 'delete',
        headers: { 'x-access-token': token }
      })
    )
  }
}
