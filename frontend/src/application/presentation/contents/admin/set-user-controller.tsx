import hemsApi from '@/usecases/api/hems-api'
import regionsApi from '@/usecases/api/regions-api'
import usersApi from '@/usecases/api/users-api'
import { Hems } from '@/entities/hems'
import { Region } from '@/entities/region'
import { UserModel } from '@/entities/user'
import useForm from '@/application/presentation/hooks/useForm'
import usePaginator from '@/application/presentation/hooks/usePaginator'
import React, { useContext, useEffect, useMemo, useState } from 'react'

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
  Table,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap'

import AccountContext from '../../../../configuration/contexts/account-context'

const USER_LIST_INITIAL_STATE: UserModel[] = []
const USER_INITIAL_STATE: UserModel = { id: '', hemsId: '' }
const AVAILABLE_USER_LIST_INITIAL_STATE: UserModel[] = []
const CONTROLLER_LIST_INITIAL_STATE: Hems[] = []
const REGION_LIST_INITIAL_STATE: Region[] = []
const REGION_ID_INITIAL_STATE: string = ''

const SetUserController: React.FC = () => {
  const accountContext = useContext(AccountContext)
  const token = accountContext.getCurrentAccount().accessToken

  const [userList, setUserList] = useState(USER_LIST_INITIAL_STATE)
  const [user, setUser] = useState(USER_INITIAL_STATE)
  const [availableUserList, setAvailableUserList] = useState(AVAILABLE_USER_LIST_INITIAL_STATE)
  const [controllerList, setControllerList] = useState(CONTROLLER_LIST_INITIAL_STATE)
  const [regionList, setRegionList] = useState(REGION_LIST_INITIAL_STATE)
  const [regionId, setRegionId] = useState(REGION_ID_INITIAL_STATE)

  const isEditing = useMemo((): boolean => {
    const hasSelectedUser = user.id

    if (!hasSelectedUser) {
      return false
    } else {
      const isSelectedUserFromDatabase = userList.some(
        databaseUser => databaseUser.id === user.id && databaseUser.hemsId
      )
      return isSelectedUserFromDatabase
    }
  }, [user.id])

  useEffect(() => {
    loadUserList()
    loadAvailableUserList()
    loadRegionList()
  }, [])

  useEffect(() => {
    loadControllerList()
  }, [regionId])

  useEffect(() => {
    paginator.setTotalItems(userList.length)
  }, [userList])

  const paginator = usePaginator()
  const form = useForm()

  const handleSelectUserChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const setlectedUserId = event.target.value
    const selectedUser: UserModel = availableUserList.find(availableUser => availableUser.id === setlectedUserId)
    setUser(selectedUser)
  }
  const handleSelectedHemsIdChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const hemsId = event.target.value
    setUser({ ...user, hemsId })
  }
  const handleSelectedRegionIdChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setRegionId(event.target.value)
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if (isEditing) {
      form.try(editUserController())
    } else {
      form.try(addUserController())
    }
  }
  const handleStartEditUser = (user: UserModel): void => {
    setUser(user)
  }
  const handleStartDeleteUser = (user: UserModel): void => {
    if (confirm(`Tem certeza que deseja desvincular o controlador ${user.hemsId} do usuário ${user.name}`)) {
      form.try(deleteUserController(user))
    }
  }
  const handleCancelEditUser = (): void => {
    reset()
  }
  const handleError = (error: Error): void => {
    form.setError(error)
  }
  const deleteUserController = async (user: UserModel): Promise<any> => {
    const updatedUser: UserModel = { ...user, hemsId: '' }
    usersApi.put.users(token, updatedUser)
      .then(reset)
      .then(loadUserList)
      .then(loadAvailableUserList)
      .catch(handleError)
  }
  const editUserController = async (): Promise<any> => {
    usersApi.put.users(token, user)
      .then(reset)
      .then(loadUserList)
      .then(loadAvailableUserList)
      .catch(handleError)
  }
  const addUserController = async (): Promise<any> => {
    usersApi.put.users(token, user)
      .then(reset)
      .then(loadUserList)
      .then(loadAvailableUserList)
      .catch(handleError)
  }
  const loadUserList = (): void => {
    usersApi.get.users(token)
      .then(filterUnavailableUsers)
      .then(setUserList)
      .catch(handleError)
  }
  const loadAvailableUserList = (): void => {
    usersApi.get.users(token)
      .then(filterAvailableUsers)
      .then(setAvailableUserList)
      .catch(handleError)
  }
  const loadControllerList = (): void => {
    hemsApi.get.hems(token)
      .then(filterControllerByRegion)
      .then(filterControllerAvailable)
      .then(setControllerList)
      .catch(handleError)
  }
  const loadRegionList = (): void => {
    regionsApi.get.regions(token)
      .then(setRegionList)
      .catch(handleError)
  }
  const filterUnavailableUsers = (userList: UserModel[]): UserModel[] => {
    return userList.filter(user => user.hemsId)
  }
  const filterAvailableUsers = (userList: UserModel[]): UserModel[] => {
    return userList.filter(user => !user.hemsId)
  }
  const filterControllerByRegion = (hemsList: Hems[]): Hems[] => {
    if (!regionId) {
      return []
    }

    return hemsList.filter(hems => hems.regionId === regionId)
  }
  const filterControllerAvailable = (hemsList: Hems[]): Hems[] => {
    return hemsList.filter(hems => !userList.some(user => user.hemsId === hems.id))
  }
  const reset = (): void => {
    setUser(USER_INITIAL_STATE)
    setRegionId(REGION_ID_INITIAL_STATE)
    setControllerList(CONTROLLER_LIST_INITIAL_STATE)
  }
  return (
    <div className="content">
      <Card>
        <CardBody>
          <CardTitle className="mb-0" tag="h3">
            Vinculo de Usuário-Controlador
          </CardTitle>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle tag="h4">
            {isEditing ? 'Edição' : 'Criação'} de Vínculo
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <Row className="align-items-center">
            <Col xl="4" md="6" xs="12">
                {
                  isEditing
                    ? (
                        <FormGroup>
                          <Label className="mb-0 pr-2"> Usuário*: </Label>
                          <Input type="text" value={`${user.email}`} disabled />
                        </FormGroup>
                      )
                    : (
                        <FormGroup>
                          <Label className="mb-0 pr-2"> Usuário*: </Label>
                          <Input type="select" value={user.id}
                            onChange={handleSelectUserChanged}>
                              <option value=''> Selecione um usuário... </option>
                                {
                                  availableUserList?.map((avaiableUser, key) => (
                                    <option value={avaiableUser.id} key={key}>
                                      {`${avaiableUser.email}`}
                                    </option>
                                  ))
                                }
                          </Input>
                        </FormGroup>
                      )
                }
              </Col>
              <Col xl="4" md="6" xs="12">
                <FormGroup>
                  <Label className="mb-0 pr-2"> Região do Controlador*: </Label>
                  <Input type="select" value={regionId}
                    onChange={handleSelectedRegionIdChanged}>
                    <option value=''> Selecione uma região... </option>
                    {
                      regionList?.map((region, key) => (
                        <option value={region.id} key={key}>
                          {region.name}
                        </option>)
                      )
                    }
                  </Input>
                </FormGroup>
              </Col>
              <Col xl="4" md="6" xs="12">
                { regionId &&
                  <FormGroup>
                    <Label className="mb-0 pr-2"> Controlador HEMS*: </Label>
                    <Input type="select" value={user.hemsId}
                      onChange={handleSelectedHemsIdChanged}>
                      <option value=''> Selecione um controlador disponível... </option>
                      {
                        controllerList?.map((controller, key) => (
                          <option value={controller.id} key={key}>
                            {controller.id}
                          </option>)
                        )
                      }
                    </Input>
                  </FormGroup>
                }
              </Col>
            </Row>
            <Row className="justify-content-end">
              <Col xl="2" lg="12">
                <Button
                  className="w-100 px-2 float-right" color="success" type="submit">
                  <i className="fas fa-save pr-2"></i>
                  <span className="d-inline"> Salvar </span>
                </Button>
              </Col>

              {isEditing && (
                <Col xl="2" lg="12">
                  <Button onClick={handleCancelEditUser}
                    className="w-100 px-2 float-right" color="danger" type="submit">
                    <i className="fas fa-times-circle pr-2"></i>
                    <span className="d-inline"> Cancelar </span>
                  </Button>
                </Col>
              )}
            </Row>
          </Form>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle tag="h4">
            Lista de usuários com HEMS vinculado:
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Row className="align-items-center">
            <Col sm="6">
              <CardTitle tag="h4">
                {`(Exibindo ${(paginator.pagination?.endIndex + 1) - paginator.pagination?.startIndex} de ${paginator.totalItems} regiões)`}
              </CardTitle>
            </Col>
            <Col sm="6">
              <Pagination className="float-right">
                <PaginationItem disabled>
                  <PaginationLink previous href="#" />
                </PaginationItem>
                {
                  paginator.pagination?.pages?.map((page: number, key) => {
                    return (
                      <PaginationItem key={key} active={page === paginator.currentPage}>
                        <PaginationLink onClick={() => paginator.setCurrentPage(page)}>
                            {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  })
                }
                <PaginationItem>
                  <PaginationLink next href="#" />
                </PaginationItem>
              </Pagination>
            </Col>
          </Row>

          <Table hover responsive className="text-center">
            <tbody>
              <tr>
                <th> ID do Usuário </th>
                <th> Nome do Usuário </th>
                <th> E-mail do Usuário </th>
                <th> ID do Controlador </th>
                <th> Opções </th>
              </tr>
              {
                userList?.slice(paginator.pagination?.startIndex, paginator.pagination?.endIndex + 1)?.map((user, key) => {
                  return (
                  <tr key={key}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.hemsId}</td>
                    <td>
                      <div>
                        <Button onClick={() => handleStartEditUser(user)} className="btn px-3 mr-1" color="success" type="button">
                          <i className="fas fa-edit"></i>
                        </Button>
                        <Button onClick={() => handleStartDeleteUser(user)} className="btn px-3 mr-1" color="danger" type="button">
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

export default SetUserController
