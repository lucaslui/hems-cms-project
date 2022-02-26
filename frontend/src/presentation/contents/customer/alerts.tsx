import React from 'react'

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
  PaginationLink,
  Progress
} from 'reactstrap'

const Alerts: React.FC = () => {
  return (
    <div className="content">
      <Card>
        <CardBody>
          <CardTitle className="mb-0" tag="h3">
            Alertas
        </CardTitle>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle tag="h4">
            Criação de Alerta:
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Form>
            <Row className="align-items-center">
              <Col xl="2" lg="6" md="6" sm="6" xs="12">
                <FormGroup>
                  <Label className="mb-0 pr-2"> Código da Região </Label>
                  <Input type="select" placeholder="Selecione o código da região" />
                </FormGroup>
              </Col>
              <Col xl="2" lg="6" md="6" sm="6" xs="12">
                <FormGroup>
                  <Label className="mb-0 pr-2"> Código do dispositivo </Label>
                  <Input type="select" placeholder="Selecione o código da região" />
                </FormGroup>
              </Col>
              <Col xl="2" lg="6" md="6" sm="6" xs="12">
                <FormGroup>
                  <Label className="mb-0 pr-2"> Tipo de Alerta </Label>
                  <Input type="select" placeholder="Selecione o tipo de alerta...">
                    <option> Consumo </option>
                    <option> Geração </option>
                    <option> Demanda </option>
                    <option> Fatura  </option>
                  </Input>
                </FormGroup>
              </Col>
              <Col xl="2" lg="6" md="6" sm="6" xs="12">
                <FormGroup>
                  <Label className="mb-0 pr-2"> Medida </Label>
                  <Input type="select" placeholder="Selecione o tipo de medida">
                    <option> Absoluto </option>
                    <option> Percentual </option>
                  </Input>
                </FormGroup>
              </Col>
              <Col xl="2" lg="6" md="6" sm="6" xs="12">
                <FormGroup>
                  <Label className="mb-0 pr-2"> Minimo </Label>
                  <Input type="text" placeholder="Selecione o tipo de medida" />
                </FormGroup>
              </Col>
              <Col xl="2" lg="6" md="6" sm="6" xs="12">
                <FormGroup>
                  <Label className="mb-0 pr-2"> Máximo </Label>
                  <Input type="text" placeholder="Selecione o tipo de medida" />
                </FormGroup>
              </Col>
            </Row>
            <Row className="justify-content-end">
              <Col xl="2" lg="3" md="12" sm="12" xs="12">
                <Button className="w-100 px-2" color="success" type="submit">
                  <i className="fas fa-bell pr-2"></i>
                  <span className="d-inline"> Criar </span>
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle tag="h4">
            Lista de alertas:
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Form>
            <Row className="align-items-center">
              <Col xl="2" lg="6" md="6" sm="6" xs="12">
                <FormGroup>
                  <Label className="mb-0 pr-2"> Código da Região </Label>
                  <Input type="select" placeholder="Selecione o código da região" />
                </FormGroup>
              </Col>
              <Col xl="2" lg="6" md="6" sm="6" xs="12">
                <FormGroup>
                  <Label className="mb-0 pr-2"> Código do dispositivo </Label>
                  <Input type="select" placeholder="Selecione o código da região" />
                </FormGroup>
              </Col>
              <Col xl="4" lg="6" md="6" sm="6" xs="12">
                <FormGroup check inline>
                  <Label check> <Input type="radio" name="radio2" />{' '} Consumo </Label>
                </FormGroup>
                <FormGroup check inline>
                  <Label check> <Input type="radio" name="radio2" />{' '} Geração </Label>
                </FormGroup>
                <FormGroup check inline>
                  <Label check>  <Input type="radio" name="radio2" />{' '} Demanda </Label>
                </FormGroup>
                <FormGroup check inline>
                  <Label check> <Input type="radio" name="radio2" />{' '} Fatura </Label>
                </FormGroup>
              </Col>
              <Col xl="4" lg="6" md="6" sm="6" xs="12" className="d-flex flex-row">
                <Button className="w-100 btn-fill mr-2" color="success" type="submit">
                  <i className="fas fa-filter"></i>
                  <span className="d-inline"> Filtrar </span>
                </Button>
                <Button className="w-100 btn-fill" color="danger" type="submit">
                  <i className="fas fa-trash"></i>
                  <span className="d-inline"> Cancelar </span>
                </Button>
              </Col>
            </Row>
            <hr/>
            <Row className="mt-4 align-items-center">
              <Col sm="6">
                <CardTitle tag="h4">
                  (Exibindo 3 de 122 Alertas)
                </CardTitle>
              </Col>
              <Col sm="6">
                <Pagination className="h4 float-right">
                  <PaginationItem disabled>
                    <PaginationLink first href="#" />
                  </PaginationItem>
                  <PaginationItem disabled>
                    <PaginationLink previous href="#" />
                  </PaginationItem>
                  <PaginationItem active>
                    <PaginationLink href="#">
                      1
                        </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">
                      2
                        </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">
                      3
                        </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">
                      4
                        </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">
                      5
                        </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink next href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink last href="#" />
                  </PaginationItem>
                </Pagination>
              </Col>
            </Row>
          </Form>

          <Table hover responsive className="text-center">
            <tbody>
              <tr>
                <th> Região </th>
                <th> Tipo </th>
                <th> Status </th>
                <th> Ação </th>
              </tr>
              <tr>
                <td> 10:30:15 </td>
                <td> Consumo </td>
                <td>
                  <Row className="align-items-center">
                    <Col xs="2" className="text-right pr-0 pl-0">
                      <Label> 12.000 kW </Label>
                    </Col>
                    <Col>
                      <Progress color="success" value={35} />
                    </Col>
                    <Col xs="2" className="text-left pr-0 pl-0">
                      <Label> 20.000 kW </Label>
                    </Col>
                  </Row>
                </td>
                <td>
                  <div>
                    <Button className="px-3 mr-1" color="success" type="button">
                      <i className="fas fa-edit"></i>
                    </Button>
                    <Button className="px-3 mr-1" color="danger" type="button">
                      <i className="fas fa-trash"></i>
                    </Button>
                  </div>
                </td>
              </tr>
              <tr>
                <td> 05:02 </td>
                <td> Fatura </td>
                <td>
                  <Row className="align-items-center">
                    <Col xs="2" className="text-right pr-0 pl-0">
                      <Label> R$ 150 </Label>
                    </Col>
                    <Col>
                      <Progress color="primary" value={75} />
                    </Col>
                    <Col xs="2" className="text-left pr-0 pl-0">
                      <Label> R$ 250 </Label>
                    </Col>
                  </Row>
                </td>
                <td>
                  <div>
                    <Button className="px-3 mr-1" color="success" type="button">
                      <i className="fas fa-edit"></i>
                    </Button>
                    <Button className="px-3 mr-1" color="danger" type="button">
                      <i className="fas fa-trash"></i>
                    </Button>
                  </div>
                </td>
              </tr>
              <tr>
                <td> 04:16:20:137 </td>
                <td> Conexão </td>
                <td>
                  <Row className="align-items-center">
                    <Col xs="2" className="text-right pr-0 pl-0">
                      <Label> 0 hrs </Label>
                    </Col>
                    <Col>
                      <Progress color="danger" value={95} />
                    </Col>
                    <Col xs="2" className="text-left pr-0 pl-0">
                      <Label> 48 hrs </Label>
                    </Col>
                  </Row>
                </td>
                <td>
                  <Button className="px-3 mr-1" color="success" type="button">
                    <i className="fas fa-edit"></i>
                  </Button>
                  <Button className="px-3 mr-1" color="danger" type="button">
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div >
  )
}

export default Alerts
