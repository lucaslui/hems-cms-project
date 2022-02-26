import { Hems } from '@/domain/entities/hems'
import { Region } from '@/domain/entities/region'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'

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
  PaginationLink
} from 'reactstrap'
import { FormStatus } from '../../components'
import AccountContext from '../../contexts/account-context'
import paginate from '../general/paginate'

const HEMS_INITIAL_STATE = {
  hemsId: '' as string,
  regionId: '' as string,
  regionName: '' as string,
  mqttPassword: '' as string,
  mqttUsername: '' as string
}
const HEMS_LIST_INITIAL_STATE = [] as Hems[]

const PAGINATION_INITIAL_STATE = {
  totalPages: 0 as number,
  startPage: 0 as number,
  endPage: 0 as number,
  startIndex: 0 as number,
  endIndex: 0 as number,
  pages: [] as number[]
}
const FORM_STATUS_INITIAL_STATE = {
  isLoading: false,
  isFormInvalid: true,
  editMode: false,
  hemsIdError: '',
  mainError: ''
}

const REGION_LIST_INITIAL_STATE = []
const TOTAL_ITEMS_INITIAL_STATE = 1
const CURRENT_PAGE_INITIAL_STATE = 1

const Controllers: React.FC = () => {
  const { getCurrentAccount } = useContext(AccountContext)

  const [hems, setHems] = useState(HEMS_INITIAL_STATE)
  const [hemsList, setHemsList] = useState(HEMS_LIST_INITIAL_STATE)
  const [regionList, setRegionList] = useState(REGION_LIST_INITIAL_STATE)
  const [formStatus, setFormStatus] = useState(FORM_STATUS_INITIAL_STATE)
  const [currentPage, setCurrentPage] = useState(TOTAL_ITEMS_INITIAL_STATE)
  const [totalItems, setTotalItems] = useState(CURRENT_PAGE_INITIAL_STATE)
  const [paginationState, setPaginationState] = useState(PAGINATION_INITIAL_STATE)

  useEffect(() => {
    requestInitialData()
  }, [])

  useEffect(() => {
    if (hems.hemsId !== hems.mqttUsername) {
      setHems({ ...hems, mqttUsername: hems.hemsId })
    }
  }, [hems])

  useEffect(() => {
    setPaginationState(paginate(totalItems, currentPage))
  }, [currentPage, totalItems])

  const requestInitialData = (): void => {
    loadRegions().then(
      () => {},
      () => {}
    )
    loadHemsList().then(
      () => {},
      () => {}
    )
  }

  const resetFormData = (): void => {
    setHems(HEMS_INITIAL_STATE)
    setFormStatus(FORM_STATUS_INITIAL_STATE)
    setCurrentPage(TOTAL_ITEMS_INITIAL_STATE)
    setTotalItems(CURRENT_PAGE_INITIAL_STATE)
    setPaginationState(PAGINATION_INITIAL_STATE)

    requestInitialData()
  }

  const loadHemsList = async (): Promise<void> => {
    try {
      const result = await axios.request({
        url: `${process.env.API_URL}/hems`,
        method: 'get',
        headers: { 'x-access-token': getCurrentAccount().accessToken }
      })
      const regions = await getRegions()

      const findRegionName = (regionId: string): string => {
        const regionFound = regions.find(r => r.id === regionId)

        if (regionFound) {
          return regionFound.name
        } else {
          return ''
        }
      }

      setHemsList(result.data.map(
        hems => ({
          ...hems,
          regionName: findRegionName(hems.regionId)
        })
      ))

      setTotalItems(result.data.length)
    } catch (e) {
      console.error(e)
    }
  }

  const getRegions = async (): Promise<Region[]> => {
    return (await axios.request({
      url: `${process.env.API_URL}/regions`,
      method: 'get',
      headers: { 'x-access-token': getCurrentAccount().accessToken }
    })).data
  }

  const loadRegions = async (): Promise<void> => {
    try {
      setRegionList(await getRegions())
    } catch (e) {
      console.error(e)
    }
  }

  const deleteHems = (hemsId: string): void => {
    axios.request({
      url: `${process.env.API_URL}/hems/${hemsId}`,
      method: 'delete',
      headers: { 'x-access-token': getCurrentAccount().accessToken }
    })
      .then(() => { resetFormData() })
      .catch(error => console.warn(error))
  }

  const createHems = async (): Promise<void> => {
    return await axios.post(
      `${process.env.API_URL}/hems`,
      {
        hemsId: hems.hemsId,
        regionId: hems.regionId,
        mqttPassword: hems.mqttPassword,
        mqttUsername: hems.mqttUsername
      },
      { headers: { 'x-access-token': getCurrentAccount().accessToken } }
    )
  }

  const changeHems = async (): Promise<void> => {
    return await axios.put(
      `${process.env.API_URL}/hems/${hems.hemsId}`,
      { regionId: hems.regionId },
      { headers: { 'x-access-token': getCurrentAccount().accessToken } }
    )
  }

  const handleClickBtnSave = async (e): Promise<void> => {
    e.preventDefault()
    if (!formStatus.isLoading) {
      try {
        setFormStatus(oldState => ({ ...oldState, isLoading: true, mainError: null }))
        if (!formStatus.editMode) {
          await createHems()
        } else {
          await changeHems()
        }
        resetFormData()
      } catch (error) {
        setFormStatus({ ...formStatus, isLoading: false, mainError: error.message })
      }
    }
  }

  const handleClickBtnDelete = (hemsId): void => {
    const canDelete = confirm(`Gostaria realmente de deletar o HEMS: ${hemsId as string}?`)

    if (canDelete) {
      deleteHems(hemsId)
    }
  }

  const handleClickBtnEdit = (hems): void => {
    setHems({ ...HEMS_INITIAL_STATE, hemsId: hems.id, regionId: hems.regionId })
    setFormStatus({ ...formStatus, editMode: true })
  }

  const handleClickBtnCancel = (): void => {
    resetFormData()
  }

  const handleChangeHemsId = (event: React.FocusEvent<HTMLInputElement>): void => {
    if (!formStatus.editMode) {
      const hemsId = event.target.value
      setHems(old => ({ ...old, hemsId }))
    }
  }

  const handleChangeMqttPassword = (event: React.FocusEvent<HTMLInputElement>): void => {
    const mqttPassword = event.target.value
    setHems(old => ({ ...old, mqttPassword }))
  }

  const handleChangeRegionId = (event: React.FocusEvent<HTMLInputElement>): void => {
    const regionId = event.target.value
    setHems(old => ({ ...old, regionId }))
  }

  return (
    <div className="content">
      <Card>
        <CardBody>
          <CardTitle className="mb-0" tag="h3">
            Controladores
          </CardTitle>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle tag="h4">
            {formStatus.editMode ? 'Edição' : 'Criação'} de controlador:
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Form>
            <Row className="align-items-center">
              <Col xl="3" md="6" xs="12">
                <FormGroup>
                  <Label className="mb-0 pr-2"> Identificador Único*: </Label>
                  <Input onChange={handleChangeHemsId} value={hems.hemsId} type="text" placeholder="Digite o identificador único do Hems..." disabled={formStatus.editMode}/>
                </FormGroup>
              </Col>
              {!formStatus.editMode && (
                <Col xl="3" md="6" xs="12">
                  <FormGroup>
                    <Label className="mb-0 pr-2"> Usuário MQTT*: </Label>
                    <Input value={hems.mqttUsername} type="text" placeholder="Usuário do MQTT..." disabled/>
                  </FormGroup>
                </Col>
              )}
              {!formStatus.editMode && (
                <Col xl="3" md="6" xs="12">
                  <FormGroup>
                    <Label className="mb-0 pr-2"> Senha MQTT*: </Label>
                    <Input onChange={handleChangeMqttPassword} value={hems.mqttPassword} type="text" placeholder="Digite a senha do MQTT..." disabled={formStatus.editMode}/>
                  </FormGroup>
                </Col>
              )}
              <Col xl="3" md="6" xs="12">
                <FormGroup>
                  <Label className="mb-0 pr-2"> Região*: </Label>
                  <Input type="select"
                    value={hems.regionId} onChange={handleChangeRegionId}>
                    <option value=''> Selecione uma região... </option>
                    {regionList?.map((region, key) => <option value={region.id} key={key}> {region.name} </option>)}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row className="justify-content-end align-items-center">
              <Col xl="2" lg="4" md="3" sm="4" xs="4">
                <Button onClick={handleClickBtnSave} className="w-100 px-2" color="success" type="submit">
                  <i className="fas fa-save pr-2"></i>
                  <span className="d-inline"> Salvar </span>
                </Button>
              </Col>
              {formStatus.editMode && (
                <Col xl="2" lg="4" md="3" sm="4" xs="4">
                  <Button onClick={handleClickBtnCancel} className="w-100 px-2" color="danger" type="submit">
                    <i className="fas fa-times-circle pr-2"></i>
                    <span className="d-inline"> Cancelar </span>
                  </Button>
                </Col>
              )}
            </Row>
            <Row className="d-flex flex-row justify-content-end">
              <Col xl="3" lg="3" md="3" sm="12" xs="12">
                <FormStatus isLoading={formStatus.isLoading} mainError={formStatus.mainError} />
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle tag="h4">
            Lista de controladores:
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Row className="align-items-center">
            <Col sm="6">
              <CardTitle tag="h4">
                {`Exibindo ${(paginationState?.endIndex + 1) - paginationState?.startIndex} de ${totalItems} controlador(es)`}
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
                <th> Região </th>
                <th> Opções </th>
              </tr>
              {
                hemsList?.slice(paginationState?.startIndex, paginationState?.endIndex + 1)?.map((hems, key) => {
                  return (
                    <tr key={key}>
                      <td>{hems.id}</td>
                      <td>{hems.regionName}</td>
                      <td>
                        <div>
                          <Button onClick={() => handleClickBtnEdit(hems)} className="btn px-3 mr-1" color="success" type="button">
                            <i className="fas fa-edit"></i>
                          </Button>
                          <Button onClick={() => handleClickBtnDelete(hems.id)} className="btn px-3 mr-1" color="danger" type="button">
                            <i className="fas fa-trash"></i>
                          </Button>
                        </div>
                      </td>
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

export default Controllers
