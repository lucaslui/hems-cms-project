import Percentage from '@/presentation/components/percentage/Percentage'
import React, { useState } from 'react'
import Styles from '@/presentation/styles/content/customer/customer-dashboard.scss'
import { Alert, Card, CardBody, CardHeader, CardTitle, Col, Container, Progress, Row, Table } from 'reactstrap'
import CardStats from '@/presentation/components/cards/CardStats'

const CustomerDashboard: React.FC = () => {
  const [state, setState] = useState({
    hemsId: '93029302',
    userId: '------',
    tariffPlan: 'fixed',
    tusdTariff: 0.3160,
    tusdTariff_increase: +3,
    teTariff: 0.3121,
    teTariff_increase: -3,
    flag: 'RED',
    location: 'Campinas - SP',
    currentDate: '23/09/2021',
    closingDate: '30/09/2021',
    daysSinceOpening: 23,
    daysToClosing: 7,
    warning: 'As of 10/01/21, your account will be billed under the water scarcity banner, in the amount of $14.20 per 100kWh',
    statistics: {
      averageMonthlyConsumption_kWh: 232,
      monthConsumption_kWh: 162,
      monthConsumption_increase: +1.3,
      averageMonthlyValue_RS: 40,
      monthValue_RS: 31,
      monthValue_increase: +1.0,
      averageMonthlyGeneration_kWh: 30,
      monthGeneration_kWh: 12,
      monthGeneration_increase: -0.2,
      byMonth: [
        { name: '21/08', value: 54, percentage: 54 },
        { name: '21/07', value: 75, percentage: 75 },
        { name: '21/06', value: 82, percentage: 82 },
        { name: '21/05', value: 70, percentage: 70 },
        { name: '21/04', value: 63, percentage: 63 },
        { name: '21/03', value: 90, percentage: 90 }
        /*
        { name: '21/02', value: 100, percentage: 100 },
        { name: '21/01', value: 92, percentage: 92 },
        { name: '20/12', value: 60, percentage: 60 },
        { name: '20/11', value: 68, percentage: 68 },
        { name: '20/10', value: 69, percentage: 69 },
        { name: '20/09', value: 59, percentage: 59 }
        */
      ],
      byRoom: [
        {
          roomNickname: 'Emily\'s Bedroom',
          roomType: 'Bedroom',
          iconRoomType: 'fas fa-bed',
          averageMonthlyConsumption_kWh: 145,
          monthConsumption_kWh: 70,
          monthConsumption_increase: +1,
          averageMonthlyValue_RS: 74.00,
          monthValue_RS: 56.00,
          monthValue_increase: 0.6,
          byOutlet: [
            {
              outletId: '0323121',
              equipmentType: 'Computer',
              iconEquipmentType: 'fas fa-desktop',
              averageMonthlyConsumption_kWh: 45,
              averageMonthlyValue_RS: 23.00,
              monthConsumption_kWh: 32,
              monthConsumption_increase: +2,
              monthValue_RS: 16.00,
              monthValue_increase: +1.6
            },
            {
              outletId: '0423131',
              equipmentType: 'Air Conditioning',
              iconEquipmentType: 'fas fa-wind',
              averageMonthlyConsumption_kWh: 100,
              averageMonthlyValue_RS: 51.00,
              monthConsumption_kWh: 38,
              monthConsumption_increase: +1,
              monthValue_RS: 40.00,
              monthValue_increase: -1.2
            }
          ],
          opened: true
        },
        {
          roomNickname: 'Peter\'s Bedroom',
          roomType: 'Bedroom',
          iconRoomType: 'fas fa-bed',
          averageMonthlyConsumption_kWh: 145,
          monthConsumption_kWh: 80,
          monthConsumption_increase: -2,
          averageMonthlyValue_RS: 74.00,
          monthValue_RS: 56.00,
          monthValue_increase: 0.6,
          byOutlet: [],
          opened: false
        },
        {
          roomType: 'Living Room',
          iconRoomType: 'fas fa-couch',
          averageMonthlyConsumption_kWh: 145,
          monthConsumption_kWh: 70,
          monthConsumption_increase: +1,
          averageMonthlyValue_RS: 74.00,
          monthValue_RS: 56.00,
          monthValue_increase: 0.6,
          byOutlet: [],
          opened: false
        },
        {
          roomType: 'Kitchen',
          iconRoomType: 'fas fa-utensils',
          averageMonthlyConsumption_kWh: 145,
          monthConsumption_kWh: 70,
          monthConsumption_increase: +1,
          averageMonthlyValue_RS: 74.00,
          monthValue_RS: 56.00,
          monthValue_increase: 0.6,
          byOutlet: [],
          opened: false
        },
        {
          roomType: 'Bathroom',
          iconRoomType: 'fas fa-shower',
          averageMonthlyConsumption_kWh: 145,
          monthConsumption_kWh: 70,
          monthConsumption_increase: +1,
          averageMonthlyValue_RS: 74.00,
          monthValue_RS: 56.00,
          monthValue_increase: 0.6,
          byOutlet: [],
          opened: false
        }
      ]
    }
  })

  return (
    <div className={Styles.wrapper + ' content'}>
      <Row>
        <Col xl={12}>
          <Alert color="warning" style={{ color: 'white' }}>
            <strong>Notice: </strong> {state.warning}
          </Alert>
        </Col>
      </Row>
      <Row>
        <Col xl={12}>
          <Card>
            <CardBody>
              <Container className="information">
                <Row className="mb-2 mt-2">
                  <Col className="col" xl={4} md={12} xs={12}>
                    <Row>
                      <strong>HEMS code:&nbsp;</strong><br/>
                      <span>{state.hemsId}</span>
                    </Row>
                    <Row>
                      <strong>Consumer code:&nbsp;</strong><br/>
                      <span>{state.userId}</span>
                    </Row>
                    <Row>
                      <strong>Tariff Plan:&nbsp;</strong><br/>
                      <span>{state.tariffPlan}</span>
                    </Row>
                  </Col>
                  <Col className="col" xl={4} md={12} xs={12}>
                    <Row>
                      <strong>TUSD Tariff:&nbsp;</strong><br/>
                      <span>$ {state.tusdTariff} /kHW |&nbsp;<Percentage inverted value={state.tusdTariff_increase} /></span>
                    </Row>
                    <Row>
                      <strong>TE Tariff: &nbsp;</strong><br/>
                      <span>$ {state.teTariff} |&nbsp;<Percentage inverted value={state.teTariff_increase} /></span>
                    </Row>
                    <Row>
                      <strong>Current Flag:&nbsp;</strong><br/>
                      <span>{state.flag}</span>
                    </Row>
                  </Col>
                  <Col className="col" xl={4} md={12} xs={12}>
                    <Row>
                      <strong>Location:&nbsp;</strong><br/>
                      <span>{state.location}</span>
                    </Row>
                    <Row>
                      <strong>Current Date:&nbsp;</strong><br/>
                      <span>{state.currentDate}</span>
                    </Row>
                    <Row>
                      <strong>Closing Date:&nbsp;</strong><br/>
                      <span>{state.closingDate} &nbsp;({state.daysToClosing} days left)</span>
                    </Row>
                  </Col>
                </Row>
              </Container>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xl={9}>
          <Row>
            <Col xl={4}>
              <CardStats
                title="Average Monthly Consumption"
                subtitle="(for all outlets in the last year)"
                content={`${state.statistics.averageMonthlyConsumption_kWh} kWh`}
                icon="far fa-lightbulb"
              >
              </CardStats>
            </Col>
            <Col xl={4}>
              <CardStats
                title="Average Monthly Value"
                subtitle="(for all outlets in the last year)"
                content={`${state.statistics.averageMonthlyValue_RS} $`}
                icon="fas fa-dollar-sign"
              >
              </CardStats>
            </Col>
            <Col xl={4}>
              <CardStats
                  title="Average Monthly Generation"
                  subtitle="(for all panels in the last year)"
                  content={`${state.statistics.averageMonthlyGeneration_kWh} kWh`}
                  icon="fas fa-solar-panel"
                >
              </CardStats>
            </Col>
            <Col xl={4}>
              <CardStats
                  title="Current Consumption"
                  subtitle="(for all outlets in the current month)"
                  content={`${state.statistics.monthConsumption_kWh} kWh`}
                  icon="fa fa-lightbulb"
                >
                <span className="text-nowrap text-muted">
                  Compared to the average: &nbsp;
                  <Percentage inverted value={state.statistics.monthConsumption_increase}/>
                </span>
              </CardStats>
            </Col>
            <Col xl={4}>
              <CardStats
                  title="Current Value"
                  subtitle="(for all outlets in the current month)"
                  content={`${state.statistics.monthValue_RS} $`}
                  icon="fas fa-dollar-sign"
                >
                <span className="text-nowrap text-muted">
                  Compared to the average: &nbsp;
                  <Percentage inverted value={state.statistics.monthValue_increase}/>
                </span>
              </CardStats>
            </Col>
            <Col xl={4}>
              <CardStats
                  title="Current Generation"
                  subtitle="(for all panels in the current month)"
                  content={`${state.statistics.monthGeneration_kWh} kWh`}
                  icon="fas fa-solar-panel"
                >
                <span className="text-nowrap text-muted">
                  Compared to the average: &nbsp;
                  <Percentage value={state.statistics.monthGeneration_increase}/>
                </span>
              </CardStats>
            </Col>
          </Row>
        </Col>
        <Col xl={3}>
          <CardStats
              title="Consumption History"
              subtitle="(for all outlets in last 6 months)"
              icon="fas fa-calendar"
            >
            <Table size="sm" borderless>
              {state.statistics.byMonth.map(month => (
                <tr key={month.name} className="single-month-stats">
                  <td className="month-name">
                    {month.name}
                  </td>
                  <td className="month-value">
                    <Progress color="primary" value={month.value}/>
                  </td>
                </tr>
              ))}
            </Table>

            <span className="text-nowrap text-muted">

            </span>
          </CardStats>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                Statistics by room:
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Table responsive size="md">
                <thead>
                  <tr className="table-dark">
                    <th></th>
                    <th>Room Type / Equipment Type</th>
                    <th>{'Room Name / Outlet Id'} </th>
                    <th>Average Monthly Consumption</th>
                    <th>Average Monthly Value</th>
                    <th>Current Consumption</th>
                    <th>Current Value</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                  {state.statistics.byRoom.map((room, key) => (
                    <>
                      <tr key={key} className="room-tr">
                        <td>
                          <a
                            className="link"
                            onClick={() => {}}
                          >
                            <i className="fas fa-caret-right"></i>
                          </a>
                        </td>
                        <td>
                          <i className={room.iconRoomType}></i>&nbsp;&nbsp;
                          <span>{room.roomType}</span>
                        </td>
                        <td>
                          {room.roomNickname}
                        </td>
                        <td>
                          {room.averageMonthlyConsumption_kWh} kWh
                        </td>
                        <td>
                          {room.averageMonthlyValue_RS} $
                        </td>
                        <td>
                          {room.monthConsumption_kWh} kWh |&nbsp;
                          <Percentage inverted value={room.monthConsumption_increase}/>
                        </td>
                        <td>
                          {room.monthValue_RS} $ |&nbsp;
                          <Percentage inverted value={room.monthValue_increase}/>
                        </td>
                        <td>
                          <a className="primary">
                            More Details
                          </a>
                        </td>
                      </tr>
                      {room.byOutlet.map((outlet, subkey) => (
                        <tr
                          key={`${key}-${subkey as string}`}
                          className={`outlet-tr collapse ${room.opened && 'show'}`}
                        >
                          <td></td>
                          <td>
                            <i className={outlet.iconEquipmentType}></i>&nbsp;&nbsp;
                            <span>{outlet.equipmentType}</span>
                          </td>
                          <td>
                            {outlet.outletId}
                          </td>
                          <td>
                            {outlet.averageMonthlyConsumption_kWh} kWh
                          </td>
                          <td>
                            {outlet.averageMonthlyValue_RS} $
                          </td>
                          <td>
                            {outlet.monthConsumption_kWh} kWh |&nbsp;
                            <Percentage inverted value={outlet.monthConsumption_increase}/>
                          </td>
                          <td>
                            {outlet.monthValue_RS} $ |&nbsp;
                            <Percentage inverted value={outlet.monthValue_increase}/>
                          </td>
                          <td>
                            <a className="link">
                              More Details
                            </a>
                          </td>
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default CustomerDashboard
