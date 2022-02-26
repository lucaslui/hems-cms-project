import axios from 'axios'
import { Room } from '@/domain/entities/room'

export default {
  post: {
    rooms: async (token: string, room: Room): Promise<any> => await (
      axios.request({
        url: `${process.env.API_URL}/rooms`,
        method: 'post',
        headers: { 'x-access-token': token },
        data: {
          roomName: room.name,
          roomType: room.type
        }
      })
    )
  },
  get: {
    rooms: async (token: string, page?: string): Promise<Room[]> => (
      await axios.request({
        url: `${process.env.API_URL}/rooms`,
        method: 'get',
        headers: { 'x-access-token': token },
        params: { page }
      })
    ).data
  },
  put: {
    rooms: async (token: string, room: Room): Promise<Room> => await (
      axios.request({
        url: `${process.env.API_URL}/rooms/${room.id}`,
        method: 'put',
        headers: { 'x-access-token': token },
        data: {
          roomName: room.name,
          roomType: room.type
        }
      })
    )
  },
  delete: {
    rooms: async (token: string, roomId: string): Promise<any> => await (
      axios.request({
        url: `${process.env.API_URL}/rooms/${roomId}`,
        method: 'delete',
        headers: { 'x-access-token': token }
      })
    )
  }
}
