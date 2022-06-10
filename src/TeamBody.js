import './TeamBody.scss';

import React, { useState } from 'react';


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';

import ListGroup from 'react-bootstrap/ListGroup';
import Roster from './Roster';
import Game from './Game';


class TeamBody extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
      <>
        <Container fluid>
          <Row  >
            <Col sm={3} lg="3" >
             </Col  >
            <Col sm={6}>
              <Game />
            </Col >
            <Col sm={3} lg="3" >
            <Roster data={this.props.dat} />
            </Col  >
          </Row>
        </Container>
      </>
    );
  }

}

export default TeamBody;