import React, { useState } from 'react'

import classNames from 'classnames'

import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col
} from 'reactstrap'

import { Line, Bar } from 'react-chartjs-2'

import { chartMonthEnergyConsumption, chartMonthEnergyGeneration } from '../../components/charts/bar/month-energy'
import DailyConsumption from '../../components/charts/line/daily-consumption'
import DailyGeneration from '../../components/charts/line/daily-generation'

const System: React.FC = () => {
  const [state, setState] = useState({
    bigChartData: 'data1',
    startDate: new Date()
  })

  const setBgChartData = (name): void => setState({ ...state, bigChartData: name })

  return (
    <div className="content">
      <Card>
        <CardBody>
          <CardTitle className="mb-0" tag="h3">
            Sistema
          </CardTitle>
        </CardBody>
      </Card>

      <Row>
        <Col lg="6" xl="3">
          <Card className="card-stats">
            <CardBody>
              <Row>
                <div className="col">
                  <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                    Armazenamento
                      </CardTitle>
                  <span className="h2 font-weight-normal text-muted mb-0">
                    35 / 1024 Gb
                      </span>
                </div>
                <Col className="col-auto">
                  <i className="fas fa-chart-bar" />
                </Col>
              </Row>
              <p className="mt-3 mb-0 text-sm">
                <span className="text-success mr-2"> 96,6% Livre </span>
                {'   '}
                <span className="text-nowrap text-muted"> Apróx. 46,1 meses </span>
              </p>
            </CardBody>
          </Card>
        </Col>
        <Col lg="6" xl="3">
          <Card className="card-stats mb-4 mb-xl-0">
            <CardBody>
              <Row>
                <div className="col">
                  <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                    Velocidade Armazenamento
                          </CardTitle>
                  <span className="h2 font-weight-normal text-muted mb-0">
                    21,49 Gb/mês
                      </span>
                </div>
                <Col className="col-auto">
                  <i className="fas fa-chart-pie" />
                </Col>
              </Row>
              <p className="mt-3 mb-0 text-sm">
                <span className="text-success mr-2">
                  <i className="fas fa-arrow-up" /> 2.5% </span>
                {'   '}
                <span className="text-nowrap text-muted"> Desde o último mês </span>
              </p>
            </CardBody>
          </Card>
        </Col>
        <Col lg="6" xl="3">
          <Card className="card-stats mb-4 mb-xl-0">
            <CardBody>
              <Row>
                <div className="col">
                  <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                    Mensagens Recebidas
                      </CardTitle>
                  <span className="h2 font-weight-normal text-muted mb-0"> 1548 msg./dia </span>
                </div>
                <Col className="col-auto">
                  <i className="fas fa-users" />
                </Col>
              </Row>
              <p className="mt-3 mb-0 text-sm">
                <span className="text-success mr-2">
                  <i className="fas fa-arrow-up" /> 4,2% </span>
                {'   '}
                <span className="text-nowrap text-muted"> Desde o último mês </span>
              </p>
            </CardBody>
          </Card>
        </Col>
        <Col lg="6" xl="3">
          <Card className="card-stats mb-4 mb-xl-0">
            <CardBody>
              <Row>
                <div className="col">
                  <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                    Número de HEMS
                      </CardTitle>
                  <span className="h2 font-weight-normal text-muted mb-0">
                    105
                      </span>
                </div>
                <Col className="col-auto">
                  <i className="fas fa-percent" />
                </Col>
              </Row>
              <p className="mt-3 mb-0 text-sm">
                <span className="text-success mr-2">
                  <i className="fas fa-arrow-up" /> 10% </span>
                {'   '}
                <span className="text-nowrap text-muted"> Desde o último mês </span>
              </p>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col lg="6">
          <Card className="card-chart">
            <CardHeader>
              <Row>
                <Col className="text-left" sm="6">
                  <h5 className="card-category"> Última Atualização </h5>
                  <CardTitle tag="h3">
                    <i className="fas fa-plug"></i>
                    <span> Armazenamento Diário </span>
                  </CardTitle>
                </Col>
                <Col sm="6">
                  <ButtonGroup
                    className="btn-group-toggle float-right"
                    data-toggle="buttons"
                  >
                    <Button
                      tag="label"
                      className={classNames('btn-simple', {
                        active: state.bigChartData === 'data1'
                      })}
                      color="info"
                      id="0"
                      size="sm"
                      onClick={() => setBgChartData('data1')}
                    >
                      <input
                        defaultChecked
                        className="d-none"
                        name="options"
                        type="radio"
                      />
                      <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                        1 hora
                          </span>
                      <span className="d-block d-sm-none">
                        1 hora
                          </span>
                    </Button>
                    <Button
                      color="info"
                      id="1"
                      size="sm"
                      tag="label"
                      className={classNames('btn-simple', {
                        active: state.bigChartData === 'data2'
                      })}
                      onClick={() => setBgChartData('data2')}
                    >
                      <input
                        className="d-none"
                        name="options"
                        type="radio"
                      />
                      <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                        30 minutos
                          </span>
                      <span className="d-block d-sm-none">
                        30 min
                          </span>
                    </Button>
                    <Button
                      color="info"
                      id="2"
                      size="sm"
                      tag="label"
                      className={classNames('btn-simple', {
                        active: state.bigChartData === 'data3'
                      })}
                      onClick={() => setBgChartData('data3')}
                    >
                      <input
                        className="d-none"
                        name="options"
                        type="radio"
                      />
                      <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                        15 minutos
                          </span>
                      <span className="d-block d-sm-none">
                        15 min.
                          </span>
                    </Button>
                  </ButtonGroup>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                <Line
                  data={DailyConsumption[state.bigChartData]}
                  options={DailyConsumption.options}
                  type='line'
                />
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col lg="6">
          <Card className="card-chart">
            <CardHeader>
              <Row>
                <Col className="text-left" sm="6">
                  <h5 className="card-category"> Última Atualização </h5>
                  <CardTitle tag="h3">
                    <i className="fas fa-solar-panel"></i>
                    <span> Mensagens Diária </span>
                  </CardTitle>
                </Col>
                <Col sm="6">
                  <ButtonGroup
                    className="btn-group-toggle float-right"
                    data-toggle="buttons"
                  >
                    <Button
                      tag="label"
                      className={classNames('btn-simple', {
                        active: state.bigChartData === 'data1'
                      })}
                      color="warning"
                      id="0"
                      size="sm"
                      onClick={() => setBgChartData('data1')}
                    >
                      <input
                        defaultChecked
                        className="d-none"
                        name="options"
                        type="radio"
                      />
                      <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                        1 hora
                          </span>
                      <span className="d-block d-sm-none">
                        1 hora
                          </span>
                    </Button>
                    <Button
                      color="warning"
                      id="1"
                      size="sm"
                      tag="label"
                      className={classNames('btn-simple', {
                        active: state.bigChartData === 'data2'
                      })}
                      onClick={() => setBgChartData('data2')}
                    >
                      <input
                        className="d-none"
                        name="options"
                        type="radio"
                      />
                      <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                        30 minutos
                          </span>
                      <span className="d-block d-sm-none">
                        30 min.
                          </span>
                    </Button>
                    <Button
                      color="warning"
                      id="2"
                      size="sm"
                      tag="label"
                      className={classNames('btn-simple', {
                        active: state.bigChartData === 'data3'
                      })}
                      onClick={() => setBgChartData('data3')}
                    >
                      <input
                        className="d-none"
                        name="options"
                        type="radio"
                      />
                      <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                        15 minutos
                          </span>
                      <span className="d-block d-sm-none">
                        15 min.
                          </span>
                    </Button>
                  </ButtonGroup>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                <Line
                  data={DailyGeneration[state.bigChartData]}
                  options={DailyGeneration.options}
                  type='line'
                />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col lg="6">
          <Card className="card-chart">
            <CardHeader>
              <Row>
                <Col className="text-left" sm="6">
                  <h5 className="card-category"> Última Atualização </h5>
                  <CardTitle tag="h3">
                    <i className="fas fa-chart-bar" />{' '}
                        Histórico de Armazenamento
                     </CardTitle>
                </Col>
                <Col sm="6">
                  <ButtonGroup
                    className="btn-group-toggle float-right"
                    data-toggle="buttons"
                  >
                    <Button
                      tag="label"
                      className={classNames('btn-simple', {
                        active: state.bigChartData === 'data1'
                      })}
                      color="info"
                      id="0"
                      size="sm"
                      onClick={() => setBgChartData('data1')}
                    >
                      <input
                        defaultChecked
                        className="d-none"
                        name="options"
                        type="radio"
                      />
                      <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                        Semanal
                          </span>
                      <span className="d-block d-sm-none">
                        Semanal
                          </span>
                    </Button>
                    <Button
                      color="info"
                      id="1"
                      size="sm"
                      tag="label"
                      className={classNames('btn-simple', {
                        active: state.bigChartData === 'data2'
                      })}
                      onClick={() => setBgChartData('data2')}
                    >
                      <input
                        className="d-none"
                        name="options"
                        type="radio"
                      />
                      <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                        Mensal
                          </span>
                      <span className="d-block d-sm-none">
                        Mensal
                          </span>
                    </Button>
                    <Button
                      color="info"
                      id="2"
                      size="sm"
                      tag="label"
                      className={classNames('btn-simple', {
                        active: state.bigChartData === 'data3'
                      })}
                      onClick={() => setBgChartData('data3')}
                    >
                      <input
                        className="d-none"
                        name="options"
                        type="radio"
                      />
                      <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                        Anual
                          </span>
                      <span className="d-block d-sm-none">
                        Anual
                          </span>
                    </Button>
                  </ButtonGroup>
                </Col>
              </Row>
            </CardHeader>

            <CardBody>
              <div className="chart-area">
                <Bar
                  data={chartMonthEnergyConsumption.data}
                  options={chartMonthEnergyConsumption.options}
                  type='bar'
                />
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col lg="6">
          <Card className="card-chart">
            <CardHeader>
              <Row>
                <Col className="text-left" sm="6">
                  <h5 className="card-category"> Última Atualização </h5>
                  <CardTitle tag="h3">
                    <i className="fas fa-chart-bar" />{' '}
                        Histórico de Mensagens
                     </CardTitle>
                </Col>
                <Col sm="6">
                  <ButtonGroup
                    className="btn-group-toggle float-right"
                    data-toggle="buttons"
                  >
                    <Button
                      tag="label"
                      className={classNames('btn-simple', {
                        active: state.bigChartData === 'data1'
                      })}
                      color="warning"
                      id="0"
                      size="sm"
                      onClick={() => setBgChartData('data1')}
                    >
                      <input
                        defaultChecked
                        className="d-none"
                        name="options"
                        type="radio"
                      />
                      <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                        Semanal
                          </span>
                      <span className="d-block d-sm-none">
                        Semanal
                          </span>
                    </Button>
                    <Button
                      color="warning"
                      id="1"
                      size="sm"
                      tag="label"
                      className={classNames('btn-simple', {
                        active: state.bigChartData === 'data2'
                      })}
                      onClick={() => setBgChartData('data2')}
                    >
                      <input
                        className="d-none"
                        name="options"
                        type="radio"
                      />
                      <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                        Mensal
                          </span>
                      <span className="d-block d-sm-none">
                        Mensal
                          </span>
                    </Button>
                    <Button
                      color="warning"
                      id="2"
                      size="sm"
                      tag="label"
                      className={classNames('btn-simple', {
                        active: state.bigChartData === 'data3'
                      })}
                      onClick={() => setBgChartData('data3')}
                    >
                      <input
                        className="d-none"
                        name="options"
                        type="radio"
                      />
                      <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                        Anual
                          </span>
                      <span className="d-block d-sm-none">
                        Anual
                          </span>
                    </Button>
                  </ButtonGroup>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                <Bar
                  data={chartMonthEnergyGeneration.data}
                  options={chartMonthEnergyGeneration.options}
                  type='bar'
                />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default System
