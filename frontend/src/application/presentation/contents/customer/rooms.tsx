import roomsApi from '@/usecases/api/rooms-api'
import { Room } from '@/entities/room'
import { existsDisplayRoomType, getRoomType, roomTypeCollection, RoomTypeKey } from '@/application/presentation/enums/room-type'
import AccountContext from '@/application/presentation/contexts/account-context'
import useForm from '@/application/presentation/hooks/useForm'
import useValidate from '@/application/presentation/hooks/useValidate'
import React, { useContext, useEffect, useRef, useState } from 'react'

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

const ROOM_INITIAL_STATE: Room = {
  id: '',
  name: '',
  type: ''
}

const ROOMS_LIST_INITIAL_STATE: Room[] = []

const Rooms: React.FC = () => {
  const { getCurrentAccount } = useContext(AccountContext)
  const token = getCurrentAccount().accessToken

  const [room, setRoom] = useState(ROOM_INITIAL_STATE)
  const [roomsList, setRoomsList] = useState(ROOMS_LIST_INITIAL_STATE)
  const inputRoomName = useRef<HTMLInputElement>(null)

  const form = useForm()

  const validate = useValidate(() => {
    if (!room.type) {
      throw Error('O campo "Tipo de cômodo" é obrigatório!')
    }
    if (!room.name) {
      throw Error('O campo "Nome" é obrigatório!')
    }
  })

  useEffect(() => {
    loadRoomsList()
  }, [])

  useEffect(() => {
    if (!room.type) {
      setRoom((room) => ({ ...room, name: '' }))
    }

    if (room.type && (!room.name || existsDisplayRoomType(room.name))) {
      const roomType = getRoomType(room.type as RoomTypeKey)
      setRoom((room) => ({ ...room, name: roomType.display }))
      inputRoomName.current.focus()
    }
  }, [room.type])

  const resetRoom = (): void =>
    setRoom(ROOM_INITIAL_STATE)

  const loadRoomsList = (): void => {
    roomsApi.get.rooms(token)
      .then((roomsList) => setRoomsList(roomsList))
      .catch((err) => console.error(err))
  }

  const addRoom = async (): Promise<void> => {
    await roomsApi.post
      .rooms(token, room)
      .then(loadRoomsList)
      .then(resetRoom)
  }

  const deleteRoom = async (roomId): Promise<void> => {
    await roomsApi.delete
      .rooms(token, roomId)
      .then(loadRoomsList)
  }

  const editRoom = async (): Promise<void> => {
    await roomsApi.put
      .rooms(token, room)
      .then(loadRoomsList)
      .then(resetRoom)
  }

  const handleSave = async (event: React.FormEvent<HTMLButtonElement>): Promise<void> => {
    event.preventDefault()

    validate().then(() => {
      if (room.id) {
        form.try(editRoom())
      } else {
        form.try(addRoom())
      }
    }).catch((err) => {
      form.setError(err)
    })
  }

  const handleDeleteRoom = (event: React.FormEvent<HTMLButtonElement>, room: Room): void => {
    event.preventDefault()

    if (confirm(`Tem certeza que deseja excluir o cômodo ${room.name}`)) {
      form.try(deleteRoom(room.id))
    }
  }

  const handleEditRoom = (event: React.FormEvent<HTMLButtonElement>, room: Room): void => {
    event.preventDefault()
    setRoom(room)
  }

  return (
    <div className="content">
      <Card>
        <CardBody>
          <CardTitle className="mb-0" tag="h3">
            Cômodos
          </CardTitle>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle tag="h4">
            {room.id ? 'Edição' : 'Criação'} de cômodo:
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Form>
            <Row className="align-items-center">
              <Col xl="4" md="6" xs="12">
                <FormGroup>
                  <Label className="mb-0 pr-2"> Tipo de cômodo*: </Label>
                  <Input type="select" value={room.type}
                    onChange={e => setRoom({ ...room, type: e.target.value })}>
                    <option value=''> Selecione um tipo de cômodo... </option>
                    {roomTypeCollection?.map((roomType, key) => (
                      <option value={roomType.value} key={key}>
                        {roomType.display}
                      </option>)
                    )}
                  </Input>
                </FormGroup>
              </Col>
              <Col xl="4" md="6" xs="12">
                <FormGroup>
                  <Label className="mb-0 pr-2"> Nome*: </Label>
                  <Input type="text" placeholder=""
                    innerRef={inputRoomName}
                    value={room.name}
                    onChange={e => setRoom({ ...room, name: e.target.value })}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="justify-content-end align-items-center">
              <Col xl="2" lg="4" md="3" sm="4" xs="4">
                <Button onClick={handleSave} className="w-100 px-2" color="success" type="submit">
                  <i className="fas fa-save pr-2"></i>
                  <span className="d-inline"> Salvar </span>
                </Button>
              </Col>
            </Row>
            <Row className="d-flex flex-row justify-content-end">
              <Col xl="3" lg="3" md="3" sm="12" xs="12">
                <FormStatus isLoading={form.status.isLoading} mainError={form.status.mainError} />
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle tag="h4">
            Lista de cômodos:
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Table hover responsive className="text-center">
            <tbody>
              <tr>
                <th> ID </th>
                <th> Nome </th>
                <th> Tipo </th>
                <th> Opções </th>
              </tr>
              {roomsList.map((room, key) => {
                return (
                  <tr key={key}>
                    <td>{room.id}</td>
                    <td>{room.name}</td>
                    {[getRoomType(room.type as RoomTypeKey)].map((roomType, key) => (
                      <td key={key}>
                        <strong>
                          <roomType.icon />&nbsp;&nbsp;
                          <span>{roomType.display}</span>
                        </strong>
                      </td>
                    ))}
                    <td>
                      <div>
                        <Button onClick={(event) => handleEditRoom(event, room)} className="btn px-3 mr-1" color="success" type="button">
                          <i className="fas fa-edit"></i>
                        </Button>
                        <Button onClick={(event) => handleDeleteRoom(event, room)} className="btn px-3 mr-1" color="danger" type="button">
                          <i className="fas fa-trash"></i>
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div >
  )
}

export default Rooms
