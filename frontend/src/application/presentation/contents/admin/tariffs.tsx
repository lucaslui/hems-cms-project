import { Tariffs as TariffsModel } from '@/entities/tariffs'
import flagTypesList from '@/application/presentation/enums/flag-type'
import useForm from '@/application/presentation/hooks/useForm'
import React, { useContext, useEffect, useState } from 'react'
import AccountContext from '../../../../configuration/contexts/account-context'

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
  Col
} from 'reactstrap'
import tariffsApi from '@/usecases/api/tariffs-api'
import { FormStatus } from '@/application/presentation/components'

const TARIFFS_INITIAL_STATE: TariffsModel = {
  tariffFlag: '',
  tariffTe: '',
  tariffTusd: ''
}

const IS_EDITING_INITIAL_STATE: boolean = false

const Tariffs: React.FC = () => {
  const token = useContext(AccountContext).getCurrentAccount().accessToken
  const form = useForm()

  const [tariffs, setTariffs] = useState(TARIFFS_INITIAL_STATE)
  const [isEditing, setEditing] = useState(IS_EDITING_INITIAL_STATE)

  useEffect(() => {
    loadTariffs()
  }, [])

  useEffect(() => {
    if (!isEditing) {
      loadTariffs()
    }
  }, [isEditing])

  const handleChangeInputTusd = (event: React.ChangeEvent<HTMLInputElement>): void => {
    let value = event.target.value

    if (!Number.isNaN(value)) {
      if (Number(value) <= 0) {
        value = '0'
      }

      const tariffTusd = value
      setTariffs({ ...tariffs, tariffTusd })
    }
  }

  const handleChangeInputTe = (event: React.ChangeEvent<HTMLInputElement>): void => {
    let value = event.target.value

    if (!Number.isNaN(value)) {
      if (Number(value) <= 0) {
        value = '0'
      }
      const tariffTe = value
      setTariffs({ ...tariffs, tariffTe })
    }
  }

  const handleChangeInputFlag = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value
    setTariffs({ ...tariffs, tariffFlag: value })
  }

  const handleStartEditTariff = (): void => {
    setEditing(true)
  }

  const handleCancel = (): void => {
    setEditing(false)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    saveTariffs()
  }

  const saveTariffs = (): void => {
    form.try(tariffsApi.put.tariffs(token, tariffs)
      .then(loadTariffs)
      .then(() => setEditing(false))
    )
  }

  const loadTariffs = (): void => {
    form.try(tariffsApi.get.tariffs(token)
      .then(setTariffs)
    )
  }

  return (
    <div className="content">
      <Card>
        <CardBody>
          <CardTitle className="mb-0" tag="h3">
            Tarifas
          </CardTitle>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">
            Configuração de tarifas:
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <Row className="align-items-center">
              <Col xl="3" lg="5" md="6" sm="6" xs="12">
                <FormGroup>
                  <Label className="mb-0 pr-2"> Tarifa de Uso do Sistema de Distribuição - TUDS (R$/kWh):</Label>
                  <Input
                    type="number"
                    step="any"
                    onChange={handleChangeInputTusd}
                    value={tariffs.tariffTusd}
                    disabled={!isEditing}
                    placeholder="Digite um valor para TUDS..." />
                </FormGroup>
              </Col>
              <Col xl="3" lg="5" md="6" sm="6" xs="12">
                <FormGroup>
                  <Label className="mb-0 pr-2"> Tarifa de Energia - TE (R$/kWh):</Label>
                  <Input
                    type="number"
                    step="any"
                    onChange={handleChangeInputTe}
                    value={tariffs.tariffTe}
                    disabled={!isEditing}
                    placeholder="Digite um valor para TE..." />
                </FormGroup>
              </Col>
              <Col xl="3" lg="5" md="6" sm="6" xs="12">
                <FormGroup>
                  <Label className="mb-0 pr-2"> Bandeira Tarifária:</Label>
                  <Input
                    type="select"
                    onChange={handleChangeInputFlag}
                    value={tariffs.tariffFlag}
                    disabled={!isEditing}>
                      <option value="">
                        Selecione uma bandeira tarifária:
                      </option>
                      {
                        flagTypesList.map(flag => (
                          <option className="form-control" key={`flag-${flag.key}`} value={flag.key}>
                            {flag.display}
                          </option>
                        ))
                      }
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row className="justify-content-end">
              { !isEditing && (
                <Col xl="2" lg="12">
                  <Button onClick={handleStartEditTariff}
                    className="w-100 px-2 float-right" color="primary" type="submit">
                    <i className="fas fa-pen pr-2"></i>
                    <span className="d-inline"> Editar </span>
                  </Button>
                </Col>
              )}
              { isEditing && (
                <>
                  <Col xl="2" lg="12">
                    <Button
                      className="w-100 px-2 float-right" color="success" type="submit">
                      <i className="fas fa-save pr-2"></i>
                      <span className="d-inline"> Salvar </span>
                    </Button>
                  </Col>
                  <Col xl="2" lg="12">
                    <Button onClick={handleCancel}
                      className="w-100 px-2 float-right" color="danger" type="submit">
                      <i className="fas fa-times-circle pr-2"></i>
                      <span className="d-inline"> Cancelar </span>
                    </Button>
                  </Col>
                </>
              )}
            </Row>
            <Row className="d-flex flex-row justify-content-end">
              <Col xl="4" lg="4" md="4" sm="12" xs="12">
                <FormStatus isLoading={form.status.isLoading} mainError={form.status.mainError} />
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </div >
  )
}

export default Tariffs
