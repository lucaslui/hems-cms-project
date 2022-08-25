import devicesApi from '@/usecases/api/devices-api'
import roomsApi from '@/usecases/api/rooms-api'
import { Device } from '@/entities/device'
import { Room } from '@/entities/room'
import { getDeviceType, deviceTypeCollection, DeviceTypeKey } from '@/application/presentation/enums/device-type'
import { getRoomType, RoomTypeKey } from '@/application/presentation/enums/room-type'
import AccountContext from '@/configuration/contexts/account-context'
import useForm from '@/application/presentation/hooks/useForm'
import useValidate from '@/application/presentation/hooks/useValidate'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { IconType } from 'react-icons'

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Label,
  Row,
  Col,
  Table
} from 'reactstrap'
import { FormStatus } from '../../components'

type RoomForTable = {
  name: string
  icon?: IconType | string
}

type UsageType = 'unique' | 'miscellaneous' | ''

const DEVICE_INITIAL_STATE: Device = {
  id: '',
  type: '',
  roomId: ''
}
const DEVICES_LIST_INITIAL_STATE: Device[] = []
const UNREGISTERED_DEVICES_LIST_INITIAL_STATE: Device[] = []
const ROOMS_LIST_INITIAL_STATE: Room[] = []

const USAGE_TYPE_INITIAL_SATE: UsageType = ''

const Devices: React.FC = () => {
  // context informations
  const { getCurrentAccount } = useContext(AccountContext)
  const token = getCurrentAccount().accessToken

  // states hooks
  const [device, setDevice] = useState(DEVICE_INITIAL_STATE)
  const [devicesList, setDevicesList] = useState(DEVICES_LIST_INITIAL_STATE)
  const [unregisteredDevicesList, setUnregisteredDevicesList] = useState(UNREGISTERED_DEVICES_LIST_INITIAL_STATE)
  const [roomsList, setRoomsList] = useState(ROOMS_LIST_INITIAL_STATE)
  const [usageType, setUsageType] = useState<UsageType>(USAGE_TYPE_INITIAL_SATE)

  // use effects hooks
  useEffect(() => {
    loadDevicesList()
    loadUnregisteredDevicesList()
    loadRoomsList()
  }, [])

  useEffect(() => {
    if (usageType === 'miscellaneous') {
      setDevice({ ...device, type: ('miscellaneous' as DeviceTypeKey) })
    } else {
      setDevice({ ...device, type: ('' as DeviceTypeKey) })
    }
  }, [usageType])

  // use memo hooks
  const isEditing = useMemo((): boolean => {
    const hasDeviceId = device.id

    if (!hasDeviceId) {
      return false
    } else {
      const isSelectedDeviceOnDatabase = devicesList.some(
        d => d.id === device.id
      )
      return isSelectedDeviceOnDatabase
    }
  }, [device.id, devicesList])

  // callback hooks
  const getRoomForTable = useCallback((roomId): RoomForTable => {
    const room = roomsList.find(r => r.id === roomId)
    if (room) {
      return getRoomForTableFromExistingRoom(room)
    } else {
      return getRoomForTableFromRoomId(roomId)
    }
  }, [device.roomId, roomsList])

  // personalized hooks
  const form = useForm()

  const validate = useValidate(() => {
    if (!device.id) {
      throw Error('O campo "Identificador da tomada" é obrigatório!')
    }
    if (!device.type) {
      throw Error('O campo "Tipo de equipamento" é obrigatório!')
    }
    if (!device.roomId) {
      throw Error('O campo "Cômodo" é obrigatório!')
    }
  })

  // handle functions
  const handleSave = async (event: React.FormEvent<HTMLButtonElement>): Promise<void> => {
    event.preventDefault()

    validate().then(() => {
      if (isEditing) {
        form.try(editDevice())
      } else {
        form.try(addDevice())
      }
    }).catch(handleError)
  }

  const handleDeleteDevice = (event: React.FormEvent<HTMLButtonElement>, device: Device): void => {
    event.preventDefault()

    if (confirm(`Tem certeza que deseja excluir as informações da tomada ${device.id}`)) {
      form.try(deleteDevice(device.id))
    }
  }

  const handleEditDevice = (event: React.FormEvent<HTMLButtonElement>, device: Device): void => {
    event.preventDefault()
    setDevice(device)
  }

  const handleCancel = (event: React.FormEvent<HTMLButtonElement>): void => {
    event.preventDefault()
    resetDevice()
  }

  const handleError = (err: Error): void => {
    console.error(err)
    form.setError(err)
  }

  const handleSelectUsageTypeChanged = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUsageType(e.target.value as UsageType)
  }

  const handleSelectDeviceIdChanged = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDevice({ ...device, id: e.target.value })
  }

  const handleSelectRoomChanged = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDevice({ ...device, roomId: e.target.value })
  }

  const handleSelectDeviceTypeChanged = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDevice({ ...device, type: e.target.value })
  }

  // api calls
  const addDevice = async (): Promise<void> => {
    await devicesApi.post
      .devices(token, device)
      .then(loadDevicesList)
      .then(loadUnregisteredDevicesList)
      .then(resetDevice)
  }

  const deleteDevice = async (deviceId): Promise<void> => {
    await devicesApi.delete
      .devices(token, deviceId)
      .then(loadDevicesList)
      .then(loadUnregisteredDevicesList)
  }

  const editDevice = async (): Promise<void> => {
    await devicesApi.put
      .devices(token, device)
      .then(loadDevicesList)
      .then(loadUnregisteredDevicesList)
      .then(resetDevice)
  }

  // form control utilities
  const resetDevice = (): void => {
    setDevice(DEVICE_INITIAL_STATE)
    setUsageType('')
  }

  const loadDevicesList = (): void => {
    devicesApi.get.devices(token)
      .then((devicesList) => setDevicesList(devicesList))
      .catch(handleError)
  }

  const loadUnregisteredDevicesList = (): void => {
    devicesApi.get.devices(token).then(
      (devicesList) => {
        devicesApi.get.devicesByData(token)
          .then(
            (devicesByData) => (
              devicesByData.filter(
                deviceByData => !devicesList.some(
                  device => device.id === deviceByData.id
                )
              )
            )
          )
          .then((unregisteredDevicesList) => {
            setUnregisteredDevicesList(unregisteredDevicesList)
          })
          .catch(handleError)
      }
    ).catch(handleError)
  }

  const loadRoomsList = (): void => {
    roomsApi.get.rooms(token)
      .then(setRoomsList)
      .catch(handleError)
  }

  // other util functions
  const getRoomForTableFromExistingRoom = (room: Room): RoomForTable => ({
    name: room.name,
    icon: getRoomType(room.type as RoomTypeKey).icon
  })

  const getRoomForTableFromRoomId = (roomId: string): RoomForTable => ({
    name: roomId
  })

  return (
    <div className="content">
      <Card>
        <CardBody>
          <CardTitle className="mb-0" tag="h3">
            Tomadas
          </CardTitle>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle tag="h4">
            {isEditing ? 'Edição' : 'Criação'} de tomadas:
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Form>
            <Row className="align-items-center">
              <Col xl="3" md="6" xs="12">
                {
                  isEditing
                    ? (
                        <FormGroup>
                          <Label className="mb-0 pr-2"> Identificador da tomada*: </Label>
                          <Input type="text" value={device.id} disabled />
                        </FormGroup>
                      )
                    : (
                        <FormGroup>
                          <Label className="mb-0 pr-2"> Identificador da tomada*: </Label>
                          <Input type="select" value={device.id}
                            onChange={handleSelectDeviceIdChanged}>
                              <option value=''> Selecione uma tomada... </option>
                                {
                                  unregisteredDevicesList?.map((unregisteredDevice, key) => (
                                    <option value={unregisteredDevice.id} key={key}>
                                      {unregisteredDevice.id}
                                    </option>
                                  ))
                                }
                          </Input>
                        </FormGroup>
                      )
                }
              </Col>
              <Col xl="3" md="6" xs="12">
                <FormGroup>
                  <Label className="mb-0 pr-2"> Cômodo*: </Label>
                  <Input type="select" value={device.roomId}
                    onChange={handleSelectRoomChanged}>
                    <option value=''> Selecione um cômodo... </option>
                    {
                      roomsList?.map((room, key) => (
                        <option value={room.id} key={key}>
                          {room.name}
                        </option>)
                      )
                    }
                  </Input>
                </FormGroup>
              </Col>
              <Col xl="3" md="6" xs="12">
                <FormGroup>
                  <Label className="mb-0 pr-2">
                    Tipo de uso*:
                  </Label>
                  <Input type="select" value={usageType}
                    onChange={handleSelectUsageTypeChanged}>
                    <option value=''> Selecione um tipo de uso... </option>
                    <option value={'unique' as UsageType}> Equipamento Fixo </option>
                    <option value={'miscellaneous' as UsageType}> Diversos Equipamentos </option>
                  </Input>
                </FormGroup>
              </Col>
              {
                usageType === 'unique' && (
                  <Col xl="3" md="6" xs="12">
                    <FormGroup>
                      <Label className="mb-0 pr-2">
                        Tipo de equipamento*:
                      </Label>
                      <Input type="select" value={device.type}
                        onChange={handleSelectDeviceTypeChanged}>
                        <option value=''> Selecione um tipo de equipamento... </option>
                        {
                          deviceTypeCollection?.map((deviceType, key) => (
                            <option value={deviceType.value} key={key}>
                              {deviceType.display}
                            </option>)
                          )
                        }
                      </Input>
                    </FormGroup>
                  </Col>
                )
              }
              {
                usageType === 'miscellaneous' && (
                  <Col xl="3" md="6" xs="12">
                    <FormGroup>
                      <Label className="mb-0 pr-2">
                        Tipo de equipamento*:
                      </Label>
                      <Input type="select" disabled>
                        <option> {getDeviceType('miscellaneous').display} </option>
                      </Input>
                    </FormGroup>
                  </Col>
                )
              }
            </Row>
            <Row className="justify-content-end align-items-center">
              <Col xl="2" lg="4" md="3" sm="4" xs="4">
                <Button onClick={handleSave} className="w-100 px-2" color="success" type="submit">
                  <i className="fas fa-save pr-2"></i>
                  <span className="d-inline"> Salvar </span>
                </Button>
              </Col>
              { isEditing && (
                <Col xl="2" lg="12">
                  <Button onClick={handleCancel}
                    className="w-100 px-2 float-right" color="danger" type="submit">
                    <i className="fas fa-times-circle pr-2"></i>
                    <span className="d-inline"> Cancelar </span>
                  </Button>
                </Col>
              )}
            </Row>
            <Row className="d-flex flex-row justify-content-end">
              <Col xl="4" lg="4" md="4" sm="12" xs="12">
                <FormStatus isLoading={form.status.isLoading} mainError={form.status.mainError} />
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle tag="h4">
            Lista de tomadas:
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Table hover responsive className="text-center">
            <tbody>
              <tr>
                <th> ID </th>
                <th> Tipo </th>
                <th> Cômodo </th>
                <th> Opções </th>
              </tr>
              {devicesList.map((device, key) => (
                <tr key={key}>
                  <td>{device.id}</td>
                  {[getDeviceType(device.type as DeviceTypeKey)].map((deviceType, key) => (
                    <td key={key} >
                      <strong>
                        <deviceType.icon style={{ height: '16.5px', width: '16.5px' }}/>&nbsp;&nbsp;
                        <span>{deviceType.display}</span>
                      </strong>
                    </td>
                  ))}

                  {[getRoomForTable(device.roomId)].map((room, key) => (
                    <td key={key}>
                      <strong>
                        {room.icon && <room.icon/>}&nbsp;&nbsp;
                        <span>{room.name}</span>
                      </strong>
                    </td>
                  ))}

                  <td>
                    <div>
                      <Button onClick={(event) => handleEditDevice(event, device)}
                        className="btn px-3 mr-1" color="success" type="button">
                        <i className="fas fa-edit"></i>
                      </Button>
                      <Button onClick={(event) => handleDeleteDevice(event, device)}
                        className="btn px-3 mr-1" color="danger" type="button">
                        <i className="fas fa-trash"></i>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div >
  )
}

export default Devices
