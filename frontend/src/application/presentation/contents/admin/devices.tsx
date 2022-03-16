import { Device } from '@/entities/device'
import { Hems } from '@/entities/hems'
import { Region } from '@/entities/region'
import deviceApi from '@/usecases/api/devices-api'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Input,
  Label,
  Row,
  Col,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap'

import AccountContext from '../../contexts/account-context'
import paginate from '../general/paginate'

const DEVICE_LIST_INITIAL_STATE = [] as Device[]

const PAGINATION_INITIAL_STATE = {
  totalPages: 0 as number,
  startPage: 0 as number,
  endPage: 0 as number,
  startIndex: 0 as number,
  endIndex: 0 as number,
  pages: [] as number[]
}

const DEVICE_INITIAL_STATE = {
  regionId: '',
  hemsId: '',
  deviceId: '',
  nickname: '',
  regionList: [] as Region[],
  hemsList: [] as Hems[]
}
/*
const FORM_STATUS_INITIAL_STATE = {
  isLoading: false,
  isFormInvalid: true,
  editMode: false,
  hemsIdError: '',
  mainError: ''
}
*/

const FILTER_INITIAL_STATE = {
  regionId: '',
  hemsId: '',
  regionList: [] as Region[],
  hemsList: [] as Hems[]
}

const TOTAL_ITEMS_INITIAL_STATE = 1
const CURRENT_PAGE_INITIAL_STATE = 1

const Devices: React.FC = () => {
  const { getCurrentAccount } = useContext(AccountContext)

  const [device, setDevice] = useState(DEVICE_INITIAL_STATE)
  const [deviceList, setDeviceList] = useState(DEVICE_LIST_INITIAL_STATE)
  const [filter, setFilter] = useState(FILTER_INITIAL_STATE)

  // const [formStatus, setFormStatus] = useState(FORM_STATUS_INITIAL_STATE)
  const [currentPage, setCurrentPage] = useState(TOTAL_ITEMS_INITIAL_STATE)
  const [totalItems, setTotalItems] = useState(CURRENT_PAGE_INITIAL_STATE)
  const [paginationState, setPaginationState] = useState(PAGINATION_INITIAL_STATE)

  useEffect(() => {
    loadDeviceRegionList()
    loadFilterRegionList()
  }, [])

  useEffect(() => {
    loadDeviceHemsList()
  }, [device.regionId])

  useEffect(() => {
    loadFilterHemsList()
  }, [filter.regionId])

  useEffect(() => {
    loadDeviceList()
  }, [filter.hemsId])

  /*
  useEffect(() => {
    loadDeviceList()
  }, [device.hemsId])
  */

  useEffect(() => {
    setTotalItems(deviceList.length)
  }, [deviceList])

  useEffect(() => {
    setPaginationState(paginate(totalItems, currentPage))
  }, [currentPage, totalItems])

  const token: string = getCurrentAccount().accessToken

  const loadDeviceRegionList = (): void => {
    getRegionList()
      .then(result => setDevice({ ...device, regionList: result }))
      .catch(e => console.error(e))
  }

  const loadDeviceHemsList = (): void => {
    getHemsList(device.regionId)
      .then(result => setDevice({ ...device, hemsList: result }))
      .catch(e => console.error(e))
  }

  const loadFilterRegionList = (): void => {
    getRegionList()
      .then(result => setFilter({ ...filter, regionList: result }))
      .catch(e => console.error(e))
  }

  const loadDeviceList = (): void => {
    if (filter.hemsId) {
      deviceApi.get
        .devicesByDataAdmin(token, filter.hemsId)
        .then(result => {
          setDeviceList(result)
        })
        .catch(e => console.error(e))
    } else {
      setDeviceList([])
    }
  }

  const loadFilterHemsList = (): void => {
    const filterUpdated = ({ ...filter, hemsId: '' })

    if (filter.regionId) {
      getHemsList(filter.regionId)
        .then(result => setFilter({ ...filterUpdated, hemsList: result }))
        .catch(e => console.error(e))
    } else {
      setFilter({ ...filterUpdated, hemsList: [] })
    }
  }
  /*
  const loadDevices = (hemsId: string): void => {
    setDevice({ ...device, hemsId })
    setFormStatus({ ...formStatus, editMode: true })
  }
  */
  const getRegionList = async (): Promise<any[]> => {
    return (await axios.request({
      url: `${process.env.API_URL}/regions`,
      method: 'get',
      headers: { 'x-access-token': getCurrentAccount().accessToken }
    })).data
  }

  const getHemsList = async (regionId): Promise<any[]> => {
    return (await axios.get(
      `${process.env.API_URL}/hems`, {
        params: { regionId: regionId },
        headers: { 'x-access-token': getCurrentAccount().accessToken }
      }
    )).data
  }

  /*
  const handleChangeDeviceRegionId = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDevice({ ...device, regionId: e.target.value })
  }

  const handleChangeDeviceHemsId = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDevice({ ...device, hemsId: e.target.value })
  }

  const handleChangeDeviceId = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDevice({ ...device, deviceId: e.target.value })
  }

  const handleChangeDeviceNickname = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDevice({ ...device, nickname: e.target.value })
  }
  */

  const handleChangeFilterRegionId = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFilter({ ...filter, regionId: e.target.value })
  }

  const handleChangeFilterHemsId = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFilter({ ...filter, hemsId: e.target.value })
  }

  const handleClickBtnSearch = (): void => {
    loadDeviceHemsList()
  }

  /*
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
  }

  const deleteDevices = (hemsId: string): void => {
    axios.request({
      url: `${process.env.API_URL}/hems/${hemsId}`,
      method: 'delete',
      headers: { 'x-access-token': getCurrentAccount().accessToken }
    })// .then(() => setHemsList(hemsList))
      .catch(error => console.warn(error))
  }

  const handleCancel = (): void => {
    setDevice({ ...device, deviceId: null })
    setFormStatus({ ...formStatus, editMode: false })
  }
  */

  /*
  const createDevice = async (): Promise<void> => {
    return await axios.post(
      `${process.env.API_URL}/hems/devices`,
      {
        deviceId: device.deviceId,
        nickname: device.nickname,
        hemsId: device.hemsId,
        regionId: device.regionId
      },
      { headers: { 'x-access-token': getCurrentAccount().accessToken } })
  }
  */

  /*
  const editDevice = async (): Promise<void> => {
    return await axios.put(
      `${process.env.API_URL}/hems/${device.hemsId}`,
      {
        regionId: device.regionId
      },
      { headers: { 'x-access-token': getCurrentAccount().accessToken } })
  }
  */

  /*
  const handleBtnSave = async (): Promise<void> => {
    if (!formStatus.isLoading) {
      try {
        setFormStatus(oldState => ({ ...oldState, isLoading: true, mainError: null }))
        if (!formStatus.editMode) {
          await createDevice()
        } else {
          await editDevice()
        }
        // setHemsList(hemsList)
        setFormStatus({ ...formStatus, isLoading: false })
      } catch (error) {
        setFormStatus({ ...formStatus, isLoading: false, mainError: error.message })
      }
    }
  }
  */

  return (
    <div className="content">
      <Card>
        <CardBody>
          <CardTitle className="mb-0" tag="h3">
            Tomadas Inteligentes
          </CardTitle>
        </CardBody>
      </Card>
      {/*
      <Card>
        <CardHeader>
          <CardTitle tag="h4">
            Criação/Edição da tomada inteligente:
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <Row className="align-items-center">
              <Col xl="3" md="6" xs="12">
                <FormGroup className="mb-0">
                  <Label className="mb-0"> Região: </Label>
                  <Input onChange={handleChangeDeviceRegionId} value={device.regionId} className="text-nowrap" type="select">
                    <option value=''> Selecione uma região... </option>
                    {device.regionList?.map((region, key) => <option value={region.id} key={key}> {region.name} </option>)}
                  </Input>
                </FormGroup>
              </Col>
              <Col xl="3" md="6" xs="12">
                <FormGroup className="mb-0">
                  <Label className="mb-0"> Hems: </Label>
                  <Input onChange={handleChangeDeviceHemsId} value={device.hemsId} className="text-nowrap" type="select">
                    <option value=''> Selecione um controlador... </option>
                    {device.hemsList?.map((hems, key) => <option value={hems.id} key={key}> {hems.id} </option>)}
                  </Input>
                </FormGroup>
              </Col>
              <Col xl="3" md="6" xs="12">
                <FormGroup>
                  <Label className="mb-0 pr-2"> Identificador Único: </Label>
                  <Input onChange={handleChangeDeviceId} value={device.deviceId} type="text" placeholder="Digite o identificador único do Hems..." disabled={formStatus.editMode}/>
                </FormGroup>
              </Col>
              <Col xl="3" md="6" xs="12">
                <FormGroup>
                  <Label className="mb-0 pr-2"> Apelido da Tomada: </Label>
                  <Input onChange={handleChangeDeviceNickname} value={device.nickname} type="text" placeholder="Digite a região desejada para o HEMS..."/>
                </FormGroup>
              </Col>
            </Row>
            <Row className="justify-content-end align-items-center">
              <Col xl="2" lg="4" md="3" sm="4" xs="4">
                <Button onClick={handleBtnSave} className="w-100 px-2" color="success" type="submit">
                  <i className="fas fa-save pr-2"></i>
                  <span className="d-inline"> Salvar </span>
                </Button>
              </Col>
              <Col xl="2" lg="4" md="3" sm="4" xs="4">
                <Button onClick={handleCancel} className="w-100 px-2" color="danger" type="submit">
                  <i className="fas fa-times-circle pr-2"></i>
                  <span className="d-inline"> Cancelar </span>
                </Button>
              </Col>
            </Row>
            <Row className="d-flex flex-row justify-content-end">
              <Col xl="3" lg="3" md="3" sm="12" xs="12">
                <FormStatus isLoading={formStatus.isLoading} mainError={formStatus.mainError} />
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
      */}
      <Card>
        <CardHeader>
          <CardTitle tag="h4">
            Lista de tomadas inteligentes:
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Row className="mb-4 justify-content-end">
            <Col xl="4" md="6" xs="12">
              <FormGroup className="mb-0">
                <Label className="mb-0"> Região: </Label>
                <Input onChange={handleChangeFilterRegionId} value={filter.regionId} className="mb-1 text-nowrap" type="select">
                  <option value=''> Selecione uma região... </option>
                  {filter.regionList?.map((region, key) => <option value={region.id} key={key}> {region.name} </option>)}
                </Input>
              </FormGroup>
            </Col>
            <Col xl="5" md="6" xs="12">
              <FormGroup className="mb-0">
                <Label className="mb-0"> Hems: </Label>
                <Input onChange={handleChangeFilterHemsId} value={filter.hemsId} className="mb-1 text-nowrap" type="select">
                  <option value=''> Selecione um controlador... </option>
                  {filter.hemsList?.map((hems, key) => <option value={hems.id} key={key}> {hems.id} </option>)}
                </Input>
              </FormGroup>
            </Col>
            <Col xl="3" md="6" xs="12" className="text-right">
              <Button onClick={handleClickBtnSearch} className="w-100 mt-3 px-2" color="primary">
                <i className="fab fa-searchengin pr-2"></i>
                <span className="d-inline"> Pesquisar </span>
              </Button>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col sm="6">
              <CardTitle tag="h4">
                {`Exibindo ${(paginationState?.endIndex + 1) - paginationState?.startIndex} de ${totalItems} tomada(as)`}
              </CardTitle>
            </Col>
            <Col sm="6">
              <Pagination className="float-right">
                <PaginationItem disabled>
                  <PaginationLink previous href="#" />
                </PaginationItem>
                {
                  paginationState?.pages?.map((page: number, key) => {
                    return (
                      <PaginationItem key={key} active={page === currentPage}>
                        <PaginationLink onClick={() => setCurrentPage(page)}>
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  })
                }
                <PaginationItem>
                  <PaginationLink next href="#" />
                </PaginationItem>
              </Pagination>
            </Col>
          </Row>

          <Table hover responsive className="text-center">
            <tbody>
              <tr>
                <th> ID </th>
                <th> Categoria </th>
                <th> Localidade </th>
                <th> Descrição </th>
                {/*
                <th> Opções </th>
                */}
              </tr>
              {
                deviceList?.slice(paginationState?.startIndex, paginationState?.endIndex + 1)?.map((device, key) => {
                  return (
                    <tr key={key}>
                      <td>{device.id}</td>
                      <td></td>
                      <td></td>
                      <td> * privado </td>
                      {/*
                      <td>
                        <div>
                          <Button onClick={() => loadDevices(device.id)} className="btn px-3 mr-1" color="success" type="button">
                            <i className="fas fa-edit"></i>
                          </Button>
                          <Button onClick={() => deleteDevices(device.id)} className="btn px-3 mr-1" color="danger" type="button">
                            <i className="fas fa-trash"></i>
                          </Button>
                        </div>
                      </td>
                      */}
                    </tr>
                  )
                })}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div >
  )
}

export default Devices
