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
  Label,
  Row,
  Col
} from 'reactstrap'

import DefaultAvatar from '@/application/presentation/assets/imgs/default-avatar.png'
import axios from 'axios'
import AccountContext from '../../contexts/account-context'

const Profile: React.FC = () => {
  const { getCurrentAccount } = useContext(AccountContext)

  const { name, email, accessToken } = getCurrentAccount()

  const [profile, setProfile] = useState({
    cpf: '',
    rg: '',
    birthdate: '',
    cep: '',
    street: '',
    number: '',
    district: '',
    state: '',
    city: '',
    complement: '',
    phone: ''
  })

  useEffect(() => {
    axios.request({
      url: `${process.env.API_URL}/users/profile`,
      method: 'get',
      headers: { 'x-access-token': accessToken }
    })
      .then((result) => setProfile(result.data))
      .catch((error) => console.log(error))
  }, [])

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setProfile({
      ...profile,
      [event.target.name]: event.target.value
    })
  }

  return (
    <div className="content">
      <Card>
        <CardBody>
          <CardTitle className="mb-0" tag="h3">
            Perfil
          </CardTitle>
        </CardBody>
      </Card>

      {/* <CardBody className="d-flex flex-column">
              <img className={'text-center rounded'} alt="..." src={DefaultAvatar} />
              <Button className="btn-fill mt-2" color="primary" type="submit">
                <span className="text-center"> Escolher </span>
              </Button>
            </CardBody> */}

      <Card>
        <CardHeader>
          <CardTitle tag="h4">
            Informações Gerais:
              </CardTitle>
        </CardHeader>
        <CardBody>
          <Form>
            <Row>
              <Col xl="3" lg="4" md="4" sm="4" xs="12" className="px-2 d-flex flex-column justificy-content-center align-items-center">
                <Row>
                  <img className='img-fluid rounded' alt="..." src={DefaultAvatar} />
                </Row>
                <Row>
                  <Button className="w-100 btn-fill mt-2" color="primary">
                    <span className="text-center"> Escolher </span>
                  </Button>
                </Row>
              </Col>
              <Col xl="9" lg="8" md="8" sm="8" xs="12">
                <Row>
                  <Col xl="6" lg="6" md="6" sm="6" xs="12">
                    <FormGroup>
                      <Label> Nome </Label>
                      <Input placeholder="Digite o nome...." disabled type="text" name="name" value={name} />
                    </FormGroup>
                  </Col>
                  <Col xl="6" lg="6" md="6" sm="6" xs="12">
                    <FormGroup>
                      <Label> E-mail </Label>
                      <Input placeholder="Digite o email..." disabled type="email" name="email" value={email} />
                    </FormGroup>
                  </Col>
                  <Col xl="6" lg="6" md="6" sm="6" xs="12">
                    <FormGroup>
                      <Label> Telefone/Celular </Label>
                      <Input onChange={handleChange} value={profile.phone} placeholder="Digite o número de telefone ou celular..." type="tel" name="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" />
                    </FormGroup>
                  </Col>
                  <Col xl="6" lg="6" md="6" sm="6" xs="12">
                    <FormGroup>
                      <Label> Data de nascimento </Label>
                      <Input onChange={handleChange} value={profile.birthdate} placeholder="Digite a data de nasciment..." type="text" name="birthdate" pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}" />
                    </FormGroup>
                  </Col>
                  <Col xl="6" lg="6" md="6" sm="6" xs="12">
                    <FormGroup>
                      <Label> CPF </Label>
                      <Input onChange={handleChange} value={profile.cpf} placeholder="Digite o cpf...." type="text" name="cpf" pattern="[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}" />
                    </FormGroup>
                  </Col>
                  <Col xl="6" lg="6" md="6" sm="6" xs="12">
                    <FormGroup>
                      <Label> RG </Label>
                      <Input onChange={handleChange} value={profile.rg} placeholder="Digite o rg...." type="text" name="rg" pattern="[0-9]{2}.[0-9]{3}.[0-9]{3}-[0-9]{1}" />
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>

      <Row>
        <Col className="mb-n3" md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">
                Endereço:
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Form>
                <Row>
                  <Col md="3">
                    <FormGroup>
                      <Label> CEP (Consultar)</Label>
                      <Input onChange={handleChange} value={profile.cep} placeholder="Digite o CEP..." type="text" name="cep" pattern="[0-9]{5}-[0-9]{3}" />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label> Logradouro </Label>
                      <Input onChange={handleChange} value={profile.street} placeholder="Digite o logradouro..." type="text" name="street" />
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <Label> Número </Label>
                      <Input onChange={handleChange} value={profile.number} placeholder="Digite o número da residência..." name="number" type="number" />
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <Label> Bairro </Label>
                      <Input onChange={handleChange} value={profile.district} placeholder="Digite o bairro...." type="text" name="district" />
                    </FormGroup>
                  </Col>
                  <Col md="2">
                    <FormGroup>
                      <Label> Estado </Label>
                      <Input onChange={handleChange} value={profile.state} placeholder="Digite o estado..." type="text" name="state" />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label> Cidade </Label>
                      <Input onChange={handleChange} value={profile.city} placeholder="Digite a cidade..." type="text" name="city" />
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <Label> Complemento </Label>
                      <Input onChange={handleChange} value={profile.complement} placeholder="Digite algum complemento do endereço...." type="text" name="complement" />
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md="12">
          <FormGroup>
            <div className="text-right">
              <Button className="w-25 btn-fill " color="success" type="submit">
                <span className="text-nowrap d-flex justify-content-center"> Salvar </span>
              </Button>
            </div>
          </FormGroup>
        </Col>
      </Row>

    </div>
  )
}

export default Profile
