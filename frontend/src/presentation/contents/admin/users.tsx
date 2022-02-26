import Role from '@/domain/enums/role-type'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'

import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Form,
  Input,
  Table,
  Label,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap'
import { FormStatus } from '../../components'

import AccountContext from '../../contexts/account-context'
import paginate from '../general/paginate'

type UserItem = {
  id: string
  name: string
  email: string
  role?: Role
  createdAt?: string
  password?: string
  passwordConfirmation?: string
}

const INITIAL_STATE_USER = {
  id: '',
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  role: undefined
}

const Users: React.FC = () => {
  const { getCurrentAccount } = useContext(AccountContext)

  const [formStatus, setFormStatus] = useState({
    isLoading: false,
    isFormInvalid: true,
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: '',
    mainError: ''
  })

  const [user, setUser] = useState<UserItem>(INITIAL_STATE_USER)
  const [userList, setUserList] = useState<UserItem[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalItems, setTotaItems] = useState(1)

  const [paginationState, setPaginationState] = useState({
    totalPages: 10,
    startPage: 1,
    endPage: 1,
    startIndex: 1,
    endIndex: 1,
    pages: [1]
  })

  /*
  const validation = new ValidationComposite([
    ...ValidationBuilder.field('name').required().min(5).build(),
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(4).build(),
    ...ValidationBuilder.field('passwordConfirmation').required().min(4).sameAs('password').build()
  ])

  const validate = (field: string): void => {
    const { name, email, password, passwordConfirmation } = user
    const formData = { name, email, password, passwordConfirmation }
    setFormStatus(oldState => ({ ...oldState, [`${field}Error`]: validation.validate(field, formData) }))
    setFormStatus(oldState => ({ ...oldState, isFormInvalid: !!oldState.nameError || !!oldState.emailError || !!oldState.passwordError || !!oldState.passwordConfirmationError }))
  }

  useEffect(() => validate('name'), [user.name])
  useEffect(() => validate('email'), [user.email])
  useEffect(() => validate('password'), [user.password])
  useEffect(() => validate('passwordConfirmation'), [user.passwordConfirmation])
  */

  useEffect(() => {
    setPaginationState(paginate(totalItems, currentPage))
  }, [currentPage, totalItems])

  useEffect(() => {
    loadUsers()
  }, [])

  const deleteUser = (userId: string): void => {
    axios.request({
      url: `${process.env.API_URL}/users/${userId}`,
      method: 'delete',
      headers: { 'x-access-token': getCurrentAccount().accessToken }
    }).then(() => loadUsers())
      .catch((error) => console.log(error))
  }

  const loadUsers = (): void => {
    axios.request({
      url: `${process.env.API_URL}/users`,
      method: 'get',
      headers: { 'x-access-token': getCurrentAccount().accessToken }
    }).then((result) => {
      setUserList(result.data)
      setTotaItems(result.data.length)
    })
      .catch((error) => console.log(error))
  }

  const handleDeleteUser = (user: UserItem): void => {
    if (user.email === getCurrentAccount().email) {
      alert('Você não pode deletar a sua própria conta!')
    } else if (confirm(`Tem certeteza que deseja excluir a conta do usuário ${user.name}?`)) {
      deleteUser(user.id)
    }
  }

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  const addUser = (): void => {
    setFormStatus(oldState => ({ ...oldState, isLoading: true, mainError: null }))

    axios.request({
      url: `${process.env.API_URL}/users`,
      method: 'post',
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        passwordConfirmation: user.passwordConfirmation,
        role: user.role
      },
      headers: { 'x-access-token': getCurrentAccount().accessToken }
    })
      .then(() => {
        loadUsers()
        setUser(INITIAL_STATE_USER)
        setFormStatus({ ...formStatus, isLoading: false })
      })
      .catch(error => {
        setFormStatus({ ...formStatus, isLoading: false, mainError: error.message })
      })
  }

  const updateUser = (): void => {
    setFormStatus(oldState => ({ ...oldState, isLoading: true, mainError: null }))

    let newUser: any = {
      name: user.name,
      email: user.email,
      role: user.role
    }

    if (user.password && user.password !== '') {
      if (user.password === user.passwordConfirmation) {
        newUser = {
          ...newUser,
          password: user.password,
          passwordConfirmation: user.passwordConfirmation
        }
      } else {
        alert('Confirmação de senha não coincide com a senha!')
        return
      }
    }

    axios.request({
      url: `${process.env.API_URL}/users/${user.id}`,
      method: 'put',
      data: newUser,
      headers: { 'x-access-token': getCurrentAccount().accessToken }
    })
      .then(() => {
        loadUsers()
        setUser(INITIAL_STATE_USER)
        setFormStatus({ ...formStatus, isLoading: false })
      })
      .catch(error => {
        setFormStatus({ ...formStatus, isLoading: false, mainError: error.message })
      })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if (!formStatus.isLoading) {
      if (user.id === '') {
        addUser()
      } else {
        updateUser()
      }
    }
  }

  const handleChangeRole = (role: Role): void => {
    setUser((user) => ({ ...user, role }))
  }

  /*
  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }
  */

  return (
    <div className="content">
      <Card>
        <CardBody>
          <CardTitle className="mb-0" tag="h3">
            Configuração
        </CardTitle>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle tag="h4"> Criação de usuário: </CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <Row className="justify-content-end align-items-center">
              <Col xl="3" lg="6" md="6" sm="6" xs="12">
                <FormGroup>
                  <Label> Nome </Label>
                  <Input onChange={handleChange} value={user.name}
                    name="name" placeholder="Informe o Nome do Usuário..." type="text" />
                </FormGroup>
              </Col>
              <Col xl="3" lg="6" md="6" sm="6" xs="12">
                <FormGroup>
                  <Label> E-mail </Label>
                  <Input onChange={handleChange} value={user.email}
                    name="email" placeholder="Informe o E-mail do Usuário..." type="email" />
                </FormGroup>
              </Col>
              <Col xl="3" lg="6" md="6" sm="6" xs="12">
                <FormGroup>
                  <Label> Senha </Label>
                  <Input onChange={handleChange} value={user.password}
                    name="password" placeholder="Digite a senha do usuário..." type="password" />
                </FormGroup>
              </Col>
              <Col xl="3" lg="6" md="6" sm="6" xs="12">
                <FormGroup>
                  <Label> Confirmação de Senha </Label>
                  <Input onChange={handleChange} value={user.passwordConfirmation}
                    name="passwordConfirmation" placeholder="Confirme a senha do usuário..." type="password" />
                </FormGroup>
              </Col>
              <Col xl="6" lg="8" md="8" sm="12" xs="12" className="d-flex flex-row justify-content-end">
                <FormGroup check inline>
                  <Label check>
                    <Input type="radio"
                      onChange={() => handleChangeRole('admin')}
                      checked={user.role === 'admin'}/>
                    Administrador
                  </Label>
                </FormGroup>
                <FormGroup check inline>
                  <Label check>
                    <Input type="radio"
                      onChange={() => handleChangeRole('specialist')}
                      checked={user.role === 'specialist'}/>
                    Especialista
                  </Label>
                </FormGroup>
                <FormGroup check inline>
                  <Label check>
                    <Input type="radio"
                      onChange={() => handleChangeRole('customer')}
                      checked={user.role === 'customer'}/>
                    Cliente
                  </Label>
                </FormGroup>
              </Col>
              <Col xl="3" lg="4" md="4" sm="12" xs="12">
                <Button
                  className="w-100 btn-fill mt-2"
                  color="success"
                  type="submit">
                  <i className="fas fa-save pr-2"></i>
                  <span className="d-inline"> Adicionar </span>
                </Button>
              </Col>
            </Row>
            <Row className="d-flex flex-row justify-content-end">
              <Col xl="3" lg="3" md="3" sm="12" xs="12">
                <FormStatus isLoading={formStatus.isLoading} mainError={formStatus.mainError}/>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>

      <Card>
      <CardHeader>
          <CardTitle tag="h4">
            Lista de usuários:
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Row className="align-items-center">
            <Col sm="6" xs="6">
              <CardTitle tag="h4">
                {`(Exibindo ${(paginationState?.endIndex + 1) - paginationState?.startIndex} de ${totalItems} usuários)`}
              </CardTitle>
            </Col>
            <Col sm="6" xs="6">
              <Pagination className="float-right">
                <PaginationItem disabled>
                  <PaginationLink previous href="#" />
                </PaginationItem>
                {
                  paginationState?.pages?.map((page: number, key) => {
                    return (
                      <PaginationItem key={key} active={page === currentPage}>
                        <PaginationLink onClick={() => setCurrentPage(page)}>
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
                <th> # </th>
                <th> Nome </th>
                <th> Email </th>
                <th> Tipo de Conta </th>
                <th> Data de Criação </th>
                <th> Opções </th>
              </tr>
              {userList?.slice(paginationState?.startIndex, paginationState?.endIndex + 1)?.map((user, key) => {
                return (
                  <tr key={key}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.createdAt}</td>
                    <td>
                      <div>
                        {/*
                        <Button
                          onClick={() => setUser(user)}
                          className="btn px-3 mr-1" color="success" type="button">
                          <i className="fas fa-edit"></i>
                        </Button>
                        */}
                        <Button
                          onClick={() => handleDeleteUser(user)}
                          className="btn px-3 mr-1" color="danger" type="button">
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
    </div>
  )
}

export default Users
