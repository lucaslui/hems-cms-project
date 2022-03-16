import React from 'react'
import Styles from '@/application/presentation/styles/content/admin/dashboard-admin.scss'

import {
  Card,
  CardBody,
  Row,
  Col,
  Container
} from 'reactstrap'

import ViewHemsData from '@/application/presentation/components/statistics/ViewHemsData'
import ViewQualityByRegion from '@/application/presentation/components/statistics/ViewQualityByRegion'
import ViewConsumptionByEquipmentAndRoom from '@/application/presentation/components/statistics/ViewConsumptionByEquipmentAndRoom'
import ViewPowerFactorByEquipment from '@/application/presentation/components/statistics/ViewPowerFactorByEquipment'
import ViewConsumptionByTariffPost from '@/application/presentation/components/statistics/ViewConsumptionByTariffPost'
import ViewGenerationConsumedAndSupplied from '@/application/presentation/components/statistics/ViewGenerationConsumedAndSupplied'

const Dashboard: React.FC = () => {
  return (
    <div className={Styles.wrapper + ' content'}>
      <Row className="information">
        <Col sm={12} className="p-0">
          <Card>
              <CardBody>
                <Container className="information">
                    <Row>
                      <Col className="info-title" xl="2" lg="3" md="6" xs="12">
                        <strong>Number of Regions:&nbsp;</strong>
                      </Col>
                      <Col className="info-value" xl="2" lg="3" md="6" xs="12">
                        <span>2 regions</span>
                      </Col>
                      <Col className="info-title" xl="2" lg="3" md="6" xs="12">
                        <strong>Number of HEMS:&nbsp;</strong>
                      </Col>
                      <Col className="info-value" xl="2" lg="3" md="6" xs="12">
                        <span>6 online /10 offline</span>
                      </Col>
                      <Col className="info-title" xl="2" lg="3" md="6" xs="12">
                        <strong>Number of Outlets:&nbsp;</strong>
                      </Col>
                      <Col className="info-value" xl="2" lg="3" md="6" xs="12">
                       <span>32 connected/ 100 total</span>
                      </Col>
                      <Col className="info-title" xl="2" lg="3" md="6" xs="12">
                        <strong>Number of Users:&nbsp;</strong>
                      </Col>
                      <Col className="info-value" xl="2" lg="3" md="6" xs="12">
                        <span>6 online / 10 offline</span>
                      </Col>
                      <Col className="info-title" xl="2" lg="3" md="6" xs="12">
                        <strong>Received Mensages Rate: &nbsp;</strong>
                      </Col>
                      <Col className="info-value" xl="2" lg="3" md="6" xs="12">
                        <span>300 kb/min</span>
                      </Col>
                      <Col className="info-title" xl="2" lg="3" md="6" xs="12">
                        <strong>Application Request Rate:&nbsp;</strong>
                      </Col>
                      <Col className="info-value" xl="2" lg="3" md="6" xs="12">
                        <span>100 kb/min</span>
                      </Col>
                      <Col className="info-title" xl="2" lg="3" md="6" xs="12">
                        <strong>Storage Write Rate:&nbsp;</strong>
                      </Col>
                      <Col className="info-value" xl="2" lg="3" md="6" xs="12">
                        <span>0,49 GB/day</span>
                      </Col>
                      <Col className="info-title" xl="2" lg="3" md="6" xs="12">
                        <strong>Storage Capacity:&nbsp;</strong>
                      </Col>
                      <Col className="info-value" xl="2" lg="3" md="6" xs="12">
                        <span>35/1024 GB</span>
                      </Col>
                    </Row>
                </Container>
              </CardBody>
            </Card>
        </Col>
      </Row>
      <Row>
        <Col xl="4">
          <Row>
            <Col>
              <ViewHemsData/>
            </Col>
          </Row>
          <Row>
            <Col>
              <ViewPowerFactorByEquipment/>
            </Col>
          </Row>
        </Col>
        <Col xl="4">
          <Row>
            <Col>
              <ViewQualityByRegion/>
            </Col>
          </Row>
          <Row>
            <Col>
              <ViewConsumptionByTariffPost/>
            </Col>
          </Row>
        </Col>
        <Col xl="4">
          <Row>
            <Col>
              <ViewConsumptionByEquipmentAndRoom/>
            </Col>
          </Row>
          <Row>
            <Col>
              <ViewGenerationConsumedAndSupplied/>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
