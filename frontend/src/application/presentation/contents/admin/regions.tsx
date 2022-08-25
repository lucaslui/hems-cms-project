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

import AccountContext from '../../../../configuration/contexts/account-context'
import paginate from '../general/paginate'

const Regions: React.FC = () => {
  const { getCurrentAccount } = useContext(AccountContext)

  const [region, setRegion] = useState({
    id: '',
    name: '',
    description: ''
  })

  const [regionList, setRegionList] = useState([{
    id: '',
    name: '',
    description: ''
  }])

  const [currentPage, setCurrentPage] = useState(1)

  const [totalItems, setTotalItems] = useState(1)

  const [paginationState, setPaginationState] = useState({
    totalPages: 10,
    startPage: 1,
    endPage: 1,
    startIndex: 1,
    endIndex: 1,
    pages: [1]
  })

  useEffect(() => {
    setPaginationState(paginate(totalItems, currentPage))
  }, [currentPage, totalItems])

  useEffect(() => {
    loadRegions()
  }, [])

  useEffect(() => {
    setTotalItems(regionList.length)
  }, [regionList])

  const loadRegions = (): void => {
    axios.request({
      url: `${process.env.API_URL}/regions`,
      method: 'get',
      headers: { 'x-access-token': getCurrentAccount().accessToken }
    }).then(result => {
      setRegionList(result.data)
      setTotalItems(result.data.length)
    }).catch(error => console.log(error))
  }

  const isEditing = (): boolean => {
    return region.id !== undefined && region.id !== ''
  }

  const handleStartEditRegion = (region: any): void => {
    setRegion(region)
  }

  const handleStartDeleteRegion = (region: any): void => {
    const regionName: string = region.name
    const canDelete = window.confirm(`Gostaria realmente de deletar a região ${regionName}?`)

    if (canDelete) {
      deleteRegion(region.id)
    }
  }

  const deleteRegion = (regionId: string): void => {
    axios.request({
      url: `${process.env.API_URL}/regions/${regionId}`,
      method: 'delete',
      headers: { 'x-access-token': getCurrentAccount().accessToken }
    }).then(() => {
      loadRegions()
    }).catch(error => console.log(error))
  }

  const handleCancel = (): void => {
    setRegion({
      id: '',
      name: '',
      description: ''
    })
  }

  const editRegion = (): void => {
    axios.request({
      url: `${process.env.API_URL}/regions/${region.id}`,
      method: 'put',
      data: {
        name: region.name,
        description: region.description
      },
      headers: { 'x-access-token': getCurrentAccount().accessToken }
    }).then(() => {
      loadRegions()
      handleCancel()
    }).catch(error => console.log(error))
  }

  const createRegion = (): void => {
    axios.request({
      url: `${process.env.API_URL}/regions`,
      method: 'post',
      data: {
        name: region.name,
        description: region.description
      },
      headers: { 'x-access-token': getCurrentAccount().accessToken }
    }).then(() => {
      loadRegions()
      handleCancel()
    }).catch(error => console.log(error))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    if (isEditing()) {
      editRegion()
    } else {
      createRegion()
    }
  }

  return (
    <div className="content">
      <Card>
        <CardBody>
          <CardTitle className="mb-0" tag="h3">
            Regiões
          </CardTitle>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle tag="h4">
            {isEditing() ? 'Edição' : 'Criação'} de região:
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <Row className="align-items-center">
              <Col xl="3" lg="5" md="6" sm="6" xs="12">
                <FormGroup>
                  <Label className="mb-0 pr-2"> Identificador Único </Label>
                  <Input
                    type="text"
                    name="name"
                    value={region.id}
                    disabled
                    placeholder="Identificador único..." />
                </FormGroup>
              </Col>
              <Col xl="3" lg="7" md="6" sm="6" xs="12">
                <FormGroup>
                  <Label className="mb-0 pr-2"> Nome* </Label>
                  <Input
                    type="text"
                    name="name"
                    onChange={(e) => setRegion({ ...region, name: e.target.value })}
                    value={region.name}
                    placeholder="Digite o nome da região..." />
                </FormGroup>
              </Col>
              <Col xl="6" lg="12" md="12">
                <FormGroup>
                  <Label className="mb-0 pr-2"> Descrição da região* </Label>
                  <Input
                    type="text"
                    name="description"
                    onChange={(e) => setRegion({ ...region, description: e.target.value })}
                    value={region.description}
                    placeholder="Digite uma descrição para região..." />
                </FormGroup>
              </Col>
            </Row>
            <Row className="justify-content-end">
              <Col xl="2" lg="12">
                <Button
                  className="w-100 px-2 float-right" color="success" type="submit">
                  <i className="fas fa-save pr-2"></i>
                  <span className="d-inline"> Salvar </span>
                </Button>
              </Col>
              { isEditing() && (
                <Col xl="2" lg="12">
                  <Button onClick={handleCancel}
                    className="w-100 px-2 float-right" color="danger" type="submit">
                    <i className="fas fa-times-circle pr-2"></i>
                    <span className="d-inline"> Cancelar </span>
                  </Button>
                </Col>
              )}
            </Row>
          </Form>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle tag="h4">
            Lista de regiões:
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Row className="align-items-center">
            <Col sm="6">
              <CardTitle tag="h4">
                {`(Exibindo ${(paginationState?.endIndex + 1) - paginationState?.startIndex} de ${totalItems} regiões)`}
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
                <th> # </th>
                <th> Nome </th>
                <th> Descrição </th>
                <th> Opções </th>
              </tr>
              {
                regionList?.slice(paginationState?.startIndex, paginationState?.endIndex + 1)?.map((region, key) => {
                  return (
                  <tr key={key}>
                    <td>{region.id}</td>
                    <td>{region.name}</td>
                    <td>{region.description}</td>
                    <td>
                      <div>
                        <Button onClick={() => handleStartEditRegion(region)}className="btn px-3 mr-1" color="success" type="button">
                          <i className="fas fa-edit"></i>
                        </Button>
                        <Button onClick={() => handleStartDeleteRegion(region)} className="btn px-3 mr-1" color="danger" type="button">
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

export default Regions
