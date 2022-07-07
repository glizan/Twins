import './TeamBody.scss';
import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Roster from './Roster';
import Game from './Game';


export default function TeamBody({ teamId, rosterLoaded, pitchers, catchers, outfield, infield }) {


  return (
    <>
      <Container fluid>
        <Row  >
          <Col sm={3} lg="3" >
          </Col  >
          <Col sm={6}>
            <Game teamId={teamId} />
          </Col >
          <Col sm={3} lg="3" >
            <Roster teamId={teamId} rosterLoaded={rosterLoaded} pitchers={pitchers} catchers={catchers} outfield={outfield} infield={infield}  />
          </Col  >
        </Row>
      </Container>
    </>
  );

};
