import React from 'react'

import {
  Button,
  Card,
  CardTitle,
  CardBody,
  FormGroup,
  Form,
  Input,
  Label,
  Row,
  Col
} from 'reactstrap'

const ChangePassword: React.FC = () => {
  return (
    <div className="content">
      <Card>
        <CardBody>
          <Row className="align-items-center">
            <Col>
              <CardTitle className="mb-0" tag="h3">
                Alterar Senha
              </CardTitle>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Row>
        <Col md="12">
          <Card>
            <CardBody>
              <Form>
                <Row>
                  <Col md="4">
                    <FormGroup>
                      <Label> Senha atual</Label>
                      <Input placeholder="Digite a senha atual..." type="password" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="4">
                    <FormGroup>
                      <Label> Senha nova </Label>
                      <Input placeholder="Digite a nova senha...." type="password" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="4">
                    <FormGroup>
                      <Label> Confirmar senha nova </Label>
                      <Input placeholder="Confirme a nova senha..." type="password" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="4">
                    <FormGroup>
                      <div className="text-right">
                        <Button className="w-100 btn-fill" color="success" type="submit">
                          <span className="text-nowrap d-flex justify-content-center"> Salvar </span>
                        </Button>
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>

    </div >
  )
}

export default ChangePassword
