import { loginPath, signupPath } from './paths/auth'
import { hemsDeviceDataPath, loadDataByRegionPath } from './paths/data'
import { addHemsPath, editHemsRegionPath, loadHemsPath, deleteHemsPath } from './paths/hems'
import { addRegionPath, deleteRegionPath, editRegionPath, loadRegionsPath } from './paths/region'
import { addUserPath, deleteUserPath, editUserProfilePath, loadUserProfilePath, loadUsersPath, editUserHemsPath, loadUserHemsPath, editUserPath } from './paths/user'
import { addHemsDevicePath, deleteHemsDevicePath, editHemsDeviceNicknamePath, loadDevicesByDataAdminPath, loadDevicesAdminPath, loadHemsDevicesPath, loadDevicesByDataPath } from './paths/device'

import { accountSchema, loginParamsSchema, signupParamsSchema, apiKeyAuthSchema } from './schemas/auth'
import { dataMeasureSchema, dataSchema } from './schemas/data'
import { addHemsParamsSchema, hemsSchema, keySchema } from './schemas/hems'
import { addRegionParamsSchema, regionSchema } from './schemas/region'
import { addUserParamsSchema, userEditSchema, userHemsSchema, userProfileSchema, userSchema } from './schemas/user'
import { addHemsDeviceParamsSchema, deviceSchema, devicesSchema } from './schemas/device'

import { badRequestComponent, forbiddenComponent, noContentComponent, notFoundComponent, serverErrorComponent, unauthorizedComponent } from './components'
import { userListSchema } from './schemas/user/user-list'
import { addRoomPath, deleteRoomPath, editRoomPath, loadRoomsPath } from './paths/room'
import { addRoomParamsSchema, roomSchema, roomsSchema } from './schemas/room'
import { tariffSchema } from './schemas/tariff'
import { editTariffPath, loadTariffPath } from './paths/tariff'

export default {
  openapi: '3.0.0',
  info: {
    title: 'API Software em Nuvem',
    description:
      'Essa API trata de servir **dados de medições** que foram enviados e armazenados na nuvem. ' +
      'Os dados são originários dos **dispositivos HEMS** instalados nas casas. ' +
      'Além disso, a API conta com serviço de **acesso e cadastro de usuários** visto que grande parte dos dados são de cunho pessoal ou privado.\n\n',
    version: '1.0.0',
    license: {
      name: `© ${new Date().getFullYear()} Copel. Todos os direitos reservados.`,
      url: 'https://www.copel.com/'
    }
  },
  servers: [{
    url: '/api',
    description: 'servidor principal'
  }],
  tags: [{
    name: 'Autenticação',
    description: 'APIs relacionadas ao acesso e cadastro dos usuários do sistema'
  },{
    name: 'Usuários',
    description: 'APIs relacionadas a conta do usuário'
  },{
    name: 'Usuários (Admin)',
    description: 'APIs relacionadas a conta do usuário (versão Admin)'
  },{
    name: 'HEMS',
    description: 'APIs relacionadas ao vínculo e obtenção de dados dos dispositivos HEMS'
  },{
    name: 'Tomadas Inteligentes',
    description: 'APIs relacionadas as Tomadas Inteligentes vinculadas a determinado dispositivo HEMS'
  },{
    name: 'Regiões',
    description: 'APIs relacionadas aos dados de regiões cadastradas no sistema'
  },{
    name: 'Cômodos',
    description: 'APIs relacionadas aos dados de cômodos (ou rooms) cadastradas no sistema'
  },{
    name: 'Tarifas',
    description: 'APIs relacionadas a configuração das tarifas usadas no sistema'
  },{
    name: 'Dados de Medições',
    description: 'APIs relacionadas ao conjunto de dados de medições armazenado'
  }],
  paths: {
    '/login': {
      post: loginPath
    },
    '/signup': {
      post: signupPath
    },
    '/users': {
      post: addUserPath,
      get: loadUsersPath
    },
    '/users/hems': {
      get: loadUserHemsPath
    },
    '/users/hems/{hemsId}': {
      put: editUserHemsPath
    },
    '/users/profile': {
      get: loadUserProfilePath,
      put: editUserProfilePath
    },
    '/users/{userId}': {
      put: editUserPath,
      delete: deleteUserPath
    },
    '/hems': {
      post: addHemsPath,
      get: loadHemsPath
    },
    '/hems/{hemsId}': {
      put: editHemsRegionPath,
      delete: deleteHemsPath
    },
    '/devices': {
      post: addHemsDevicePath,
      get: loadHemsDevicesPath
    },
    '/devices/admin/{hemsId}': {
      get: loadDevicesAdminPath
    },
    '/devices/byData': {
      get: loadDevicesByDataPath
    },
    '/devices/byData/admin/{hemsId}': {
      get: loadDevicesByDataAdminPath
    },
    '/devices/{deviceId}': {
      put: editHemsDeviceNicknamePath,
      delete: deleteHemsDevicePath
    },
    '/regions': {
      post: addRegionPath,
      get: loadRegionsPath
    },
    '/regions/{regionId}': {
      put: editRegionPath,
      delete: deleteRegionPath
    },
    '/rooms': {
      post: addRoomPath,
      get: loadRoomsPath
    },
    '/rooms/{roomId}': {
      put: editRoomPath,
      delete: deleteRoomPath
    },
    '/tariff': {
      get: loadTariffPath,
      put: editTariffPath
    },
    '/data/{deviceId}': {
      get: hemsDeviceDataPath
    },
    '/data/{regionId}': {
      get: loadDataByRegionPath
    }
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    signupParams: signupParamsSchema,
    dataMeasures: dataMeasureSchema,
    addHemsParams: addHemsParamsSchema,
    addHemsDeviceParams: addHemsDeviceParamsSchema,
    addUserParams: addUserParamsSchema,
    addRegionParams: addRegionParamsSchema,
    addRoomParams: addRoomParamsSchema,
    hems: hemsSchema,
    device: deviceSchema,
    devices: devicesSchema,
    region: regionSchema,
    room: roomSchema,
    rooms: roomsSchema,
    profile: userProfileSchema,
    user: userSchema,
    userEdit: userEditSchema,
    userHems: userHemsSchema,
    userList: userListSchema,
    tariff: tariffSchema,
    key: keySchema
  },
  components: {
    badRequest: badRequestComponent,
    unauthorized: unauthorizedComponent,
    noContent: noContentComponent,
    notFound: notFoundComponent,
    serverError: serverErrorComponent,
    forbidden: forbiddenComponent,
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    },
    schemas: {
      Usuário: userSchema,
      Hems: hemsSchema,
      'Tomada Inteligente': deviceSchema,
      Região: regionSchema,
      Cômodo: roomSchema,
      'Dado de Medição': dataSchema
    }
  }
}
