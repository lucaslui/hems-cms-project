import React, { ReactNode } from 'react'
import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap'

type PropsType = {
  title: string
  subtitle?: string
  icon?: string
  content?: string
  children?: ReactNode
}

const CardStats: React.FC<PropsType> = (props: PropsType) => {
  return (
        <Card className="card-stats">
            <CardBody>
            <Row>
                <div className="col">
                <CardTitle className="text-uppercase text-muted mb-0">
                    <h5>
                        {props.title}
                    </h5>
                    <h6>
                        {props.subtitle ? props.subtitle : <br/>}
                    </h6>
                </CardTitle>
                <span className="h2 font-weight-normal text-muted mb-0">
                    {props.content || ''}
                </span>
                </div>
                <Col className="col-auto">
                    <i className={props.icon} />
                </Col>
            </Row>
            <p className="mt-3 mb-0 text-sm">
                {props.children}
            </p>
            </CardBody>
        </Card>
  )
}

export default CardStats
