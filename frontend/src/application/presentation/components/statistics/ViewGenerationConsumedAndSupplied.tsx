import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap'

const LABELS = ['Consumed [%]', 'Supplied [%]']

const COLORS = ['#485463', '#f79300', '#b16207', '#4CAF50', '#EF5350']

const GENERATION_DATA = {
  labels: LABELS,
  datasets: [
    {
      data: [35, 65],
      fill: false,
      backgroundColor: [
        COLORS[0],
        COLORS[1]
      ]
    }
  ]
}

const ViewGenerationConsumedAndSupplied: React.FC = () => {
  return (
    <Card className="card-chart">
      <CardHeader>
        <Row className="mb-0">
          <Col className="text-left" xl="12">
            <CardTitle tag="h3">
              <i className="fas fa-solar-panel"></i>
              <span> Percentage of Generation Consumed vs Supplied to the Power Grid: </span>
            </CardTitle>
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="p-4 m-2 mt-0 pt-2">
        <Row>
          <Col xl="12" lg="12">
            <div style={{ width: '100%', height: '250px' }}>
              <Pie
                data={GENERATION_DATA}
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

export default ViewGenerationConsumedAndSupplied
