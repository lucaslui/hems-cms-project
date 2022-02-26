import React from 'react'

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps'

import {
  Card,
  CardBody,
  Row,
  Col,
  CardTitle
} from 'reactstrap'

const Map: React.FC = () => {
  return (
    <div className="content">
      <Card>
        <CardBody>
          <CardTitle className="mb-0" tag="h3">
            Mapa
          </CardTitle>
        </CardBody>
      </Card>

      <Row>
        <Col md="12">
          <Card className="card-plain">
            <CardBody>
              <div id="map" className="map" style={{ position: 'relative', overflow: 'hidden' }} >
                <MapWrapper
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA4ThWXlWsdolLdMTJddcFVmW1sw54Qv1s"
                  loadingElement={<div style={{ height: '100%' }} />}
                  containerElement={<div style={{ height: '100%' }} />}
                  mapElement={<div style={{ height: '100%' }} />}
                />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Map

const MapWrapper: React.ComponentClass<any> = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap defaultZoom={13} defaultCenter={{ lat: -22.542002, lng: -47.33899 }} defaultOptions={{ scrollwheel: true }} >
      <Marker position={{ lat: -22.542002, lng: -47.33899 }} />
    </GoogleMap>
  ))
)
