import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Button, ButtonGroup, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap'

const LABELS = ['Region 1', 'Region 2', 'Region 3', 'Region 4', 'Region 5']

const VOLTAGE_DATA = {
  labels: LABELS,
  datasets: [
    {
      label: 'Voltage [V]',
      data: [200, 150, 127, 170, 210],
      backgroundColor: '#525f7f'
    }
  ]
}

const POWER_FACTOR_DATA = {
  labels: LABELS,
  datasets: [
    {
      label: 'Power Factor',
      data: [0.25, 0.1, 0.8, 0.5, 0.6],
      backgroundColor: '#f79300'
    }
  ]
}

const ViewQualityByRegion: React.FC = () => {
  const [filter, setFilter] = useState({
    measureType: 'voltage'
  })

  const [data, setData] = useState(VOLTAGE_DATA)

  useEffect(() => {
    if (filter.measureType === 'voltage') {
      setData(VOLTAGE_DATA)
    }

    if (filter.measureType === 'powerFactor') {
      setData(POWER_FACTOR_DATA)
    }
  }, [filter.measureType])

  return (
    <Card className="card-chart">
      <CardHeader>
        <Row className="mb-0">
          <Col className="text-left" xl="7">
            <CardTitle tag="h3">
              <i className="fas fa-leaf"></i>
              <span> Energy Quality by Region: </span>
            </CardTitle>
          </Col>
          <Col xl="5">
            <Button className="w-100 px-2" color="white" size="sm">
              <i className="fas fa-filter pr-2"></i>
              <span className="d-inline"> Filtered (5) </span> <br/>
            </Button>
          </Col>
          <Col xl="12">
            <ButtonGroup className="btn-group-toggle pt-4 float-right" data-toggle="buttons" >
              <Button color="info" size="sm">
                <span> Power Outage </span>
              </Button>
              <Button color="secondary" size="sm"
                  onClick={() => setFilter({ ...filter, measureType: 'voltage' })}>
                <span> Voltage </span>
              </Button>
              <Button color="primary" size="sm"
                onClick={() => setFilter({ ...filter, measureType: 'powerFactor' })} >
                <span> Power Factor </span>
              </Button>
            </ButtonGroup>
        </Col>
        </Row>
      </CardHeader>
      <CardBody className="p-4 m-2 mt-0 pt-2">
        <Row>
          <Col xl="12" lg="12">
            <div style={{ width: '100%', height: '250px' }}>
              <Bar
                data={data}
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

export default ViewQualityByRegion
