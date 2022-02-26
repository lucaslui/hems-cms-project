import { Device } from '@/domain/entities/device'
import axios from 'axios'

export default {
  post: {
    devices: async (
      token: string,
      device: Device
    ): Promise<any> => await axios.request({
      url: `${process.env.API_URL}/devices`,
      method: 'post',
      headers: { 'x-access-token': token },
      data: {
        deviceId: device.id,
        deviceType: device.type,
        roomId: device.roomId
      }
    })
  },
  get: {
    devices: async (
      token: string,
      page?: string
    ): Promise<Device[]> => (await axios.request({
      url: `${process.env.API_URL}/devices`,
      method: 'get',
      headers: { 'x-access-token': token },
      params: { page }
    })).data,
    devicesAdmin: async (
      token: string,
      hemsId: string,
      page?: string
    ): Promise<Device[]> => (await axios.request({
      url: `${process.env.API_URL}/devices/admin/${hemsId}`,
      headers: { 'x-access-token': token },
      params: { page }
    })).data,
    devicesByData: async (
      token: string,
      page?: string
    ): Promise<Device[]> => (await axios.request({
      url: `${process.env.API_URL}/devices/byData`,
      method: 'get',
      headers: { 'x-access-token': token },
      params: { page }
    })).data,
    devicesByDataAdmin: async (
      token: string,
      hemsId: string,
      page?: string
    ): Promise<Device[]> => (await axios.request({
      url: `${process.env.API_URL}/devices/byData/admin/${hemsId}`,
      method: 'get',
      headers: { 'x-access-token': token },
      params: { page }
    })).data
  },
  put: {
    devices: async (
      token: string,
      device: Device
    ): Promise<any> => await axios.request({
      url: `${process.env.API_URL}/devices/${device.id}`,
      method: 'put',
      headers: { 'x-access-token': token },
      data: {
        deviceType: device.type,
        roomId: device.roomId
      }
    })
  },
  delete: {
    devices: async (
      token: string,
      deviceId: string
    ): Promise<any> => await axios.request({
      url: `${process.env.API_URL}/devices/${deviceId}`,
      method: 'delete',
      headers: { 'x-access-token': token }
    })
  }
}
