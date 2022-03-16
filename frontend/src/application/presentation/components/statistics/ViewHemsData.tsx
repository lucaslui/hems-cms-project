import { Measure } from '@/entities/measure'
import { Device } from '@/entities/device'
import { Hems } from '@/entities/hems'
import { Region } from '@/entities/region'
import AccountContext from '@/application/presentation/contexts/account-context'
import axios from 'axios'
import classNames from 'classnames'
import React, { useContext, useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Button, ButtonGroup, Card, CardBody, CardHeader, CardTitle, Col, Form, FormGroup, Input, Label, Row, UncontrolledCollapse } from 'reactstrap'
import DatePickerInput from '../date-picker-input/date-picker-input'
import devicesApi from '@/usecases/api/devices-api'

const HEMS_LIST_INITIAL_STATE = [] as Hems[]
const REGION_LIST_INITIAL_STATE = [] as Region[]
const DEVICE_LIST_INITIAL_STATE = [] as Device[]
const FILTER_INITIAL_STATE = {
  regionId: '',
  hemsId: '',
  deviceId: '',
  measureType: '',
  startDate: null,
  endDate: null
}
const DATA_INITIAL_STATE = [] as Measure[]

const ViewHemsData: React.FC = () => {
  const { getCurrentAccount } = useContext(AccountContext)

  const [data, setData] = useState(DATA_INITIAL_STATE)
  const [filter, setFilter] = useState(FILTER_INITIAL_STATE)
  const [regionList, setRegionList] = useState(REGION_LIST_INITIAL_STATE)
  const [hemsList, setHemsList] = useState(HEMS_LIST_INITIAL_STATE)
  const [deviceList, setDeviceList] = useState(DEVICE_LIST_INITIAL_STATE)
  const token = getCurrentAccount().accessToken

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      display: false
    },
    tooltips: {
      backgroundColor: '#f5f5f5',
      titleFontColor: '#333',
      bodyFontColor: '#666',
      bodySpacing: 4,
      xPadding: 12,
      mode: 'nearest',
      intersect: 0,
      position: 'nearest'
    },
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            fontColor: '#6c757d',
            labelString: 'Energy Consumption [kWh]'
          },
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(225,78,202,0.1)',
            zeroLineColor: 'transparent'
          },
          ticks: {
            suggestedMin: 20,
            suggestedMax: 125,
            padding: 20,
            fontColor: '#6c757d'
          }
        }
      ],
      xAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(225,78,202,0.1)',
            zeroLineColor: 'transparent'
          },
          ticks: {
            padding: 20,
            fontColor: '#6c757d'
          }
        }
      ]
    }
  }

  const dataDraw = (canvas): any => {
    const ctx = canvas.getContext('2d')

    const gradientStroke = ctx.createLinearGradient(0, 230, 0, 50)

    const { backgroundColor, borderColor } = getLineColor(filter.measureType)

    gradientStroke.addColorStop(1, backgroundColor[0])
    gradientStroke.addColorStop(0.4, backgroundColor[1])
    gradientStroke.addColorStop(0, backgroundColor[2])

    return {
      labels: data.map(measure => formatTime(measure.time)),
      datasets: [
        {
          label: 'Consumption [kWh]',
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: borderColor,
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          // pointBackgroundColor: '#1f8ef1',
          // pointBorderColor: 'rgba(255,255,255,0)',
          // pointHoverBackgroundColor: '#1f8ef1',
          // pointBorderWidth: 20,
          // pointHoverRadius: 4,
          // pointHoverBorderWidth: 15,
          pointRadius: 0,
          data: data.map(measure => measure[filter.measureType])
        }
      ]
    }
  }

  const getLineColor = (measureType: string): any => {
    switch (measureType) {
      case 'voltage':
        return { backgroundColor: ['#d33624fa', '#d3362455', '#d3362402'], borderColor: '#d33624fa' }
      case 'current':
        return { backgroundColor: ['#4e64f6fa', '#4e64f655', '#4e64f602'], borderColor: '#4e64f6' }
      case 'activePower':
        return { backgroundColor: ['#00d438fa', '#00d43855', '#00d43802'], borderColor: '#00d438' }
      case 'reactivePower':
        return { backgroundColor: ['#343946fa', '#34394655', '#34394602'], borderColor: '#343946' }
      case 'apparentPower':
        return { backgroundColor: ['#d33624fa', '#d3362455', '#d3362402'], borderColor: '#d33624fa' }
      case 'powerFactor':
        return { backgroundColor: ['#f89b00fa', '#f89b0055', '#f89b0002'], borderColor: '#f89b00' }
      default:
        return { backgroundColor: ['#f89b00fa', '#f89b0055', '#f89b0002'], borderColor: '#f89b00' }
    }
  }

  const formatTime = (timeString: string): string[] => {
    const date = new Date(timeString)

    return [date.toLocaleDateString(), date.toLocaleTimeString()]
  }

  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if (filter.deviceId && filter.startDate && filter.endDate) {
      axios.get(`${process.env.API_URL}/data/${filter.deviceId}`, { params: { startTime: filter.startDate, endTime: filter.endDate, hemsId: filter.hemsId }, headers: { 'x-access-token': getCurrentAccount().accessToken } })
        .then((result) => {
          console.log(result.data)
          setData(result.data)
        })
        .catch(error => console.log(error))
    }
  }

  useEffect(() => {
    axios.request({
      url: `${process.env.API_URL}/regions`,
      method: 'get',
      headers: { 'x-access-token': getCurrentAccount().accessToken }
    })
      .then((result) => setRegionList(result.data))
      .catch((error) => console.log(error))
  }, [])

  useEffect(() => {
    if (filter.regionId) {
      axios.get(`${process.env.API_URL}/hems`, { params: { regionId: filter.regionId }, headers: { 'x-access-token': getCurrentAccount().accessToken } })
        .then((result) => {
          setFilter({ ...filter, hemsId: result.data[0] })
          setHemsList(result.data)
        })
        .catch((error) => console.log(error))
    } else {
      setHemsList([])
    }
  }, [filter.regionId])

  useEffect(() => {
    if (filter.hemsId) {
      devicesApi.get.devicesByDataAdmin(
        token,
        filter.hemsId
      ).then(
        (deviceList) => setDeviceList(deviceList)
      ).catch(
        (error) => console.log(error)
      )
    } else {
      setDeviceList([])
    }
  }, [filter.hemsId])

  const handleChangeRegionId = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const regionId = e.target.value
    setFilter(filter => ({ ...filter, regionId }))
  }

  const handleChangeHemsId = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const hemsId = e.target.value
    setFilter(filter => ({ ...filter, hemsId }))
  }

  const handleChangeDeviceId = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const deviceId = e.target.value
    setFilter(filter => ({ ...filter, deviceId }))
  }

  const handleChangeStartDate = (date: any): void => {
    setFilter(filter => ({ ...filter, startDate: date }))
  }

  const handleChangeEndDate = (date: any): void => {
    setFilter(filter => ({ ...filter, endDate: date }))
  }

  return (
    <Card className="card-chart">
      <CardHeader>
        <Row className="mb-3">
          <Col className="text-left" xl="9">
            <CardTitle tag="h3">
              <i className="fas fa-plug"></i>
              <span> Hems Data Sending: </span>
            </CardTitle>
          </Col>
          <Col xl="3">
            <Button id="toogler-hems-data-filters" className="w-100 px-2" color="white" size="sm">
              <i className="fas fa-filter pr-2"></i>
              <span className="d-inline"> Filters </span>
            </Button>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <UncontrolledCollapse toggler="toogler-hems-data-filters">
              <Form onSubmit={handleSubmit} className="p-2 pb-4">
                <Row className="justify-content-end align-items-center">
                  <Col xl="4" sm="12">
                    <FormGroup className="mb-0">
                      <Label className="mb-0"> Region: </Label>
                      <Input onChange={handleChangeRegionId}
                        className="mb-1" type="select">
                        <option value=''> Choose a region... </option>
                        {regionList?.map((region, key) => <option value={region.id} key={key}> {region.name} </option>)}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xl="4" sm="12">
                    <FormGroup className="mb-0">
                      <Label className="mb-0"> HEMS code: </Label>
                      <Input onChange={handleChangeHemsId}
                        className="mb-1 text-nowrap" type="select">
                        <option value=''> Choose a controller... </option>
                        {hemsList?.map((hems, key) => <option value={hems.id} key={key}> {hems.id} </option>)}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xl="4" sm="12">
                    <FormGroup className="mb-0">
                      <Label className="mb-0"> Outlet code: </Label>
                      <Input onChange={handleChangeDeviceId}
                        className="mb-1 text-nowrap" type="select">
                        <option value=''> Choose a outlet... </option>
                        {deviceList?.map((device, key) => <option value={device.id} key={key}> {device.id} </option>)}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xl="4" sm="12">
                    <FormGroup className="mb-1">
                      <Label className="mb-0"> Initial date: </Label>
                      <DatePickerInput selected={filter.startDate}
                        onChange={handleChangeStartDate}
                        placeholder="Choose the initial date..." />
                    </FormGroup>
                  </Col>
                  <Col xl="4" sm="12">
                    <FormGroup className="mb-1">
                      <Label className="mb-0"> End date: </Label>
                      <DatePickerInput selected={filter.endDate}
                        onChange={handleChangeEndDate}
                        placeholder="Choose the end date..." />
                    </FormGroup>
                  </Col>
                  <Col xl="4" sm="12" className="text-right">
                    <Button className="w-100 mt-3 px-2" color="primary" type="submit">
                      <i className="fab fa-searchengin pr-2"></i>
                      <span className="d-inline"> Check Data </span>
                    </Button>
                  </Col>
                </Row>
              </Form>
            </UncontrolledCollapse>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <ButtonGroup className="btn-group-toggle float-right p-2" data-toggle="buttons" >
              <Button color="warning" size="sm" className={classNames('btn-simple', { active: filter.measureType === 'voltage' })}
                  onClick={() => setFilter({ ...filter, measureType: 'voltage' })}>
                <input defaultChecked className="d-none" name="options" type="radio" />
                <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block"> Voltage </span>
                <span className="d-block d-sm-none"> V  </span>
              </Button>
              <Button color="info" size="sm" className={classNames('btn-simple', { active: filter.measureType === 'current' })}
                onClick={() => setFilter({ ...filter, measureType: 'current' })} >
                <input className="d-none" name="options" type="radio" />
                <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block"> Current </span>
                <span className="d-block d-sm-none"> C </span>
              </Button>
              <Button color="success" size="sm" className={classNames('btn-simple', { active: filter.measureType === 'activePower' })}
                onClick={() => setFilter({ ...filter, measureType: 'activePower' })} >
                <input className="d-none" name="options" type="radio" />
                <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block"> P [W] </span>
                <span className="d-block d-sm-none"> A.P </span>
              </Button>
              <Button color="secondary" size="sm" className={classNames('btn-simple', { active: filter.measureType === 'reactivePower' })}
                onClick={() => setFilter({ ...filter, measureType: 'reactivePower' })} >
                <input className="d-none" name="options" type="radio" />
                <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block"> Q [VAR] </span>
                <span className="d-block d-sm-none"> R.P </span>
              </Button>
              <Button color="danger" size="sm" className={classNames('btn-simple', { active: filter.measureType === 'apparentPower' })}
                onClick={() => setFilter({ ...filter, measureType: 'apparentPower' })} >
                <input className="d-none" name="options" type="radio" />
                <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block"> |S| [VA] </span>
                <span className="d-block d-sm-none"> A.P </span>
              </Button>
              <Button color="primary" size="sm" className={classNames('btn-simple', { active: filter.measureType === 'powerFactor' })}
                onClick={() => setFilter({ ...filter, measureType: 'powerFactor' })} >
                <input className="d-none" name="options" type="radio" />
                <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block"> PF </span>
                <span className="d-block d-sm-none"> P.F </span>
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="p-4 m-2 mt-0 pt-2">
        <div style={{ width: '100%', height: '250px' }}>
          <Line
            data={dataDraw}
            options={chartOptions}
            type="line"
          />
        </div>
      </CardBody>
    </Card>
  )
}

export default ViewHemsData
