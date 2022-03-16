import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Button, ButtonGroup, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap'

const LABELS = ['21/08', '21/07', '21/06', '21/05', '21/04', '21/03', '21/02', '21/01', '20/12', '20/11', '20/10', '20/09']

const COLORS = ['#485463', '#f79300', '#b16207', '#4CAF50', '#EF5350']

const EQUIPMENT_DATA = {
  labels: LABELS,
  datasets: [
    {
      label: 'Freeze',
      data: [65, 59, 85, 81, 56, 55, 40, 56, 49, 45, 55, 50],
      fill: false,
      backgroundColor: COLORS[0],
      borderColor: COLORS[0],
      tension: 0.1
    },
    {
      label: 'Air Conditioning',
      data: [45, 55, 50, 65, 59, 80, 81, 68, 69, 75, 65, 70],
      fill: false,
      backgroundColor: COLORS[1],
      borderColor: COLORS[1],
      tension: 0.1
    },
    {
      label: 'Washing Machine',
      data: [40, 38, 35, 42, 41, 35, 32, 40, 47, 39, 38, 34],
      fill: false,
      backgroundColor: COLORS[2],
      borderColor: COLORS[2],
      tension: 0.1
    },
    {
      label: 'TV',
      data: [11, 25, 15, 18, 10, 11, 8, 20, 21, 19, 17, 12],
      fill: false,
      backgroundColor: COLORS[3],
      borderColor: COLORS[3],
      tension: 0.1
    }
    /*
    {
      label: 'Computer',
      data: [11, 8, 20, 25, 15, 18, 17, 12, 8, 20, 21, 15],
      fill: false,
      backgroundColor: COLORS[4],
      borderColor: COLORS[4]
      tension: 0.1
    }
    */
  ]
}

const ROOM_DATA = {
  labels: LABELS,
  datasets: [
    {
      label: 'Living Room',
      data: [45, 55, 50, 65, 59, 65, 55, 56, 55, 40, 49, 56],
      fill: false,
      backgroundColor: COLORS[0],
      borderColor: COLORS[0],
      tension: 0.1
    },
    /*
    {
      label: 'Laundry',
      data: [11, 25, 15, 18, 10, 11, 8, 20, 21, 19, 17, 12],
      fill: false,
      backgroundColor: COLORS[1],
      borderColor: COLORS[1],
      tension: 0.1
    },
    */
    {
      label: 'Room',
      data: [65, 59, 80, 73, 56, 55, 40, 56, 49, 45, 55, 50],
      fill: false,
      backgroundColor: COLORS[2],
      borderColor: COLORS[2],
      tension: 0.1
    },
    {
      label: 'Bathroom',
      data: [11, 8, 20, 25, 15, 18, 17, 12, 8, 20, 21, 15],
      fill: false,
      backgroundColor: COLORS[3],
      borderColor: COLORS[3],
      tension: 0.1
    },
    {
      label: 'Kitchen',
      data: [40, 38, 35, 42, 41, 35, 32, 40, 47, 39, 38, 34],
      fill: false,
      backgroundColor: COLORS[4],
      borderColor: COLORS[4],
      tension: 0.1
    }
  ]
}

const ViewConsumptionByEquipmentAndRoom: React.FC = () => {
  const [data, setData] = useState(EQUIPMENT_DATA)
  const [filter, setFilter] = useState({
    measureType: 'equipment'
  })

  useEffect(() => {
    if (filter.measureType === 'equipment') {
      setData(EQUIPMENT_DATA)
    }

    if (filter.measureType === 'room') {
      setData(ROOM_DATA)
    }
  }, [filter.measureType])

  return (
    <Card className="card-chart">
      <CardHeader>
        <Row className="mb-0">
          <Col className="text-left" xl="8">
            <CardTitle tag="h3">
              <i className="fas fa-lightbulb"></i>
              <span> Equipment/Room Average Consumption: </span>
            </CardTitle>
          </Col>
          <Col xl="4">
            <Button className="w-100 px-2" color="white" size="sm">
              <i className="fas fa-filter pr-2"></i>
              <span className="d-inline"> Filtered (4) </span>
            </Button>
          </Col>
          <Col xl="12">
            <ButtonGroup className="float-right btn-group-toggle pt-4" data-toggle="buttons" >
              <Button color="secondary" size="sm"
                  onClick={() => setFilter({ ...filter, measureType: 'equipment' })}>
                <span>Equipment Type</span>
              </Button>
              <Button color="primary" size="sm"
                onClick={() => setFilter({ ...filter, measureType: 'room' })} >
                <span>Room Type</span>
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="p-4 m-2 mt-0 pt-2">
        <Row>
          <Col xl="12" lg="12">
            <div style={{ width: '100%', height: '250px' }}>
              <Line
                data={data}
                type="bar"
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                  scales: {
                    y: {
                      title: {
                        text: 'Consumption [kWh]',
                        display: true
                      }
                    }
                  }
                }}
              />
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default ViewConsumptionByEquipmentAndRoom
