import React from 'react'

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Label,
  FormGroup,
  Button,
  Input
} from 'reactstrap'

const Reports: React.FC = () => {
  return (
    <div className="content">
      <Card>
        <CardBody>
          <CardTitle className="mb-0" tag="h3">
            Relatórios
        </CardTitle>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle tag="h4">
            Dashboard
              </CardTitle>
        </CardHeader>
        <CardBody>
          <Table hover responsive>
            <tbody>
              <tr>
                <th> Item </th>
                <th className="text-center"> Configuração </th>
                <th className="text-center"> Selecionar   </th>
              </tr>
              <tr>
                <td>
                  <p className="title"> Consumo diário </p>
                  <p className="text-muted"> Dados de consumo diário </p>
                </td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <Button color="primary" type="button">
                    <i className="fas fa-cog" />
                  </Button>
                </td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <FormGroup check className="mb-5">
                    <Label check>
                      <Input type="checkbox" />
                      <span className="form-check-sign"> </span>
                    </Label>
                  </FormGroup>
                </td>
              </tr>

              <tr>
                <td>
                  <p className="title"> Consumo mensal </p>
                  <p className="text-muted"> Dados de consumo mensal </p>
                </td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <Button color="primary" type="button">
                    <i className="fas fa-cog" />
                  </Button>
                </td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <FormGroup check className="mb-5">
                    <Label check>
                      <Input type="checkbox" />
                      <span className="form-check-sign"> </span>
                    </Label>
                  </FormGroup>
                </td>
              </tr>

              <tr>
                <td>
                  <p className="title"> Consumo por posto tarifário </p>
                  <p className="text-muted"> Dados de consumo diário </p>
                </td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                </td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <FormGroup check className="mb-5">
                    <Label check>
                      <Input type="checkbox" />
                      <span className="form-check-sign"> </span>
                    </Label>
                  </FormGroup>
                </td>
              </tr>

              <tr>
                <td>
                  <p className="title"> Geração diária </p>
                  <p className="text-muted"> Dados de geração diária </p>
                </td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <Button color="primary" type="button">
                    <i className="fas fa-cog" />
                  </Button>
                </td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <FormGroup check className="mb-5">
                    <Label check>
                      <Input type="checkbox" />
                      <span className="form-check-sign"> </span>
                    </Label>
                  </FormGroup>
                </td>
              </tr>

              <tr>
                <td>
                  <p className="title"> Geração mensal </p>
                  <p className="text-muted"> Dados de geração mensal </p>
                </td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <Button color="primary" type="button">
                    <i className="fas fa-cog" />
                  </Button>
                </td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <FormGroup check className="mb-5">
                    <Label check>
                      <Input type="checkbox" />
                      <span className="form-check-sign"> </span>
                    </Label>
                  </FormGroup>
                </td>
              </tr>

              <tr>
                <td>
                  <p className="title"> Consumido versus Geração em rede </p>
                  <p className="text-muted"> Comparação do consumo e geração de energia </p>
                </td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                </td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <FormGroup check className="mb-5">
                    <Label check>
                      <Input type="checkbox" />
                      <span className="form-check-sign"> </span>
                    </Label>
                  </FormGroup>
                </td>
              </tr>

              <tr>
                <td>
                  <p className="title"> Demanda diária </p>
                  <p className="text-muted"> Dados de consumo diário </p>
                </td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <Button color="primary" type="button">
                    <i className="fas fa-cog" />
                  </Button>
                </td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <FormGroup check className="mb-5">
                    <Label check>
                      <Input type="checkbox" />
                      <span className="form-check-sign"> </span>
                    </Label>
                  </FormGroup>
                </td>
              </tr>

              <tr>
                <td>
                  <p className="title"> Demanda máxima </p>
                  <p className="text-muted"> Dados de consumo diário </p>
                </td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <Button color="primary" type="button">
                    <i className="fas fa-cog" />
                  </Button>
                </td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <FormGroup check className="mb-5">
                    <Label check>
                      <Input type="checkbox" />
                      <span className="form-check-sign"> </span>
                    </Label>
                  </FormGroup>
                </td>
              </tr>

              <tr>
                <td>
                  <p className="title"> Fator de potência diário </p>
                  <p className="text-muted"> Dados de consumo diário </p>
                </td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                </td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <FormGroup check className="mb-5">
                    <Label check>
                      <Input type="checkbox" />
                      <span className="form-check-sign"> </span>
                    </Label>
                  </FormGroup>
                </td>
              </tr>

              <tr>
                <td>
                  <p className="title"> Fator de potência mínimo </p>
                  <p className="text-muted"> Dados de consumo diário </p>
                </td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <Button color="primary" type="button">
                    <i className="fas fa-cog" />
                  </Button>
                </td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <FormGroup check className="mb-5">
                    <Label check>
                      <Input type="checkbox" />
                      <span className="form-check-sign"> </span>
                    </Label>
                  </FormGroup>
                </td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle tag="h4">
            Fatura
              </CardTitle>
        </CardHeader>
        <CardBody>
          <Table hover responsive>
            <tbody>
              <tr>
                <th> Item </th>
                <th className="text-center"> Configuração </th>
                <th className="text-center"> Selecionar   </th>
              </tr>
              <tr>
                <td>
                  <p className="title"> Fatura mensal </p>
                  <p className="text-muted"> Relatório da fatural mensal do consumidor </p>
                </td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <Button color="primary" type="button">
                    <i className="fas fa-cog" />
                  </Button>
                </td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <FormGroup check className="mb-5">
                    <Label check>
                      <Input type="checkbox" />
                      <span className="form-check-sign"> </span>
                    </Label>
                  </FormGroup>
                </td>
              </tr>

              <tr>
                <td>
                  <p className="title"> Fatura anual </p>
                  <p className="text-muted"> Relatório da fatural anual do consumidor </p>
                </td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <Button color="primary" type="button">
                    <i className="fas fa-cog" />
                  </Button>
                </td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <FormGroup check className="mb-5">
                    <Label check>
                      <Input type="checkbox" />
                      <span className="form-check-sign"> </span>
                    </Label>
                  </FormGroup>
                </td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle tag="h4">
            Alertas
              </CardTitle>
        </CardHeader>
        <CardBody>
          <Table hover responsive>
            <tbody>
              <tr>
                <th> Item </th>
                <th className="text-center"> Configuração </th>
                <th className="text-center"> Selecionar   </th>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle tag="h4">
            Sistema
              </CardTitle>
        </CardHeader>
        <CardBody>
          <Table hover responsive>
            <tbody>
              <tr>
                <th> Item </th>
                <th className="text-center"> Configuração </th>
                <th className="text-center"> Selecionar   </th>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  )
}

export default Reports
