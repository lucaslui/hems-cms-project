import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap'

const LABELS = ['Freeze', 'Air Conditioning', 'Washing Machine', 'TV', 'Computer']

const COLORS = ['#485463', '#f79300', '#b16207', '#4CAF50', '#EF5350']

const POWER_FACTOR_DATA = {
  labels: LABELS,
  datasets: [
    {
      label: 'Power Factor',
      data: [0.25, 0.1, 0.8, 0.5, 0.1],
      fill: false,
      backgroundColor: COLORS[4],
      tension: 0.1
    }
  ]
}

const ViewPowerFactorByEquipment: React.FC = () => {
  return (
    <Card className="card-chart">
      <CardHeader>
        <Row className="mb-0">
          <Col className="text-left" xl="7">
            <CardTitle tag="h3">
              <i className="fas fa-wave-square"></i>
              <span> Power Factor by Equipment: </span>
            </CardTitle>
          </Col>
          <Col xl="5">
            <Button className="w-100 px-2" color="white" size="sm">
              <i className="fas fa-filter pr-2"></i>
              <span className="d-inline"> Filtered (5) </span> <br/>
            </Button>
          </Col>
          <Col xl="0">
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="m-2 mt-0 pt-3 pb-3 pl-4 pl-4">
        <Row>
          <Col xl="12" lg="12">
            <div style={{ width: '100%', height: '250px' }}>
              <Bar
                data={POWER_FACTOR_DATA}
                type="bar"
                options={{
                  maintainAspectRatio: false,
                  responsive: true
                }}
              />
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default ViewPowerFactorByEquipment
