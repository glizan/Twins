import './Roster.scss';

import React, { useState } from 'react';


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';

import ListGroup from 'react-bootstrap/ListGroup';


class Roster extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cardPerson: []
    };
    this.handleClick = this.handleClick.bind(this);
  }


  handleClick(event) {
    const { id } = event.currentTarget;

    var dataIndex = this.props.data.pitchers.findIndex(x => x.id == id);
    if (dataIndex >= 0) { this.setState({ cardPerson: this.props.data.pitchers[dataIndex] }) }
    dataIndex = this.props.data.catchers.findIndex(x => x.id == id);
    if (dataIndex >= 0) { this.setState({ cardPerson: this.props.data.catchers[dataIndex] }) }
    dataIndex = this.props.data.infield.findIndex(x => x.id == id);
    if (dataIndex >= 0) { this.setState({ cardPerson: this.props.data.infield[dataIndex] }) }
    dataIndex = this.props.data.outfield.findIndex(x => x.id == id);
    if (dataIndex >= 0) { this.setState({ cardPerson: this.props.data.outfield[dataIndex] }) }


  }

  getPitcherItems() {

    if (true === this.props.data.rosterLoaded && 0 < this.props.data.pitchers.length) {
      return (
        this.props.data.pitchers.map((d, index) => <ListGroup.Item as="button" className="m-0 p-0" action onClick={this.handleClick} id={d.id} key={d.id} eventKey={d.id}  >
          <dl className="row  m-0 p-0">
            <dt className="text-start w-75 fs-6 ">{d.firstName + " " + d.lastName}</dt>
            <dd className="text-end w-25 fs-6">{"#" + d.primaryNumber}</dd>
          </dl>
        </ListGroup.Item>)
      );
    }
    else {
      return (<dl className="row  m-0 p-0">
        <dt className="text-start w-75 fs-6 ">{"Loading"}</dt>
        <dd className="text-end w-25 fs-6">{"#"}</dd>
      </dl>);
    }
  }
  getCatcherItems() {
    if (true === this.props.data.rosterLoaded && 0 < this.props.data.catchers.length) {
      return (
        this.props.data.catchers.map(d => <ListGroup.Item as="button" className="m-0 p-0" action onClick={this.handleClick} id={d.id} key={d.id} eventKey={d.id}>
          <dl className="row  m-0 p-0">
            <dt className="text-start w-75 fs-6 ">{d.firstName + " " + d.lastName}</dt>
            <dd className="text-end w-25 fs-6">{"#" + d.primaryNumber}</dd>
          </dl>
        </ListGroup.Item>)
      );
    }

  }
  getInfieldItems() {
    if (true === this.props.data.rosterLoaded && 0 < this.props.data.infield.length) {
      return (
        this.props.data.infield.map(d => <ListGroup.Item as="button" className="m-0 p-0" action onClick={this.handleClick} id={d.id} key={d.id} eventKey={d.id}>
          <dl className="row  m-0 p-0">
            <dt className="text-start w-75 fs-6 ">{d.firstName + " " + d.lastName}</dt>
            <dd className="text-end w-25 fs-6">{"#" + d.primaryNumber}</dd>
          </dl>
        </ListGroup.Item>)
      );
    }
  }

  getOutfieldItems() {
    if (true === this.props.data.rosterLoaded && 0 < this.props.data.outfield.length) {
      return (
        this.props.data.outfield.map(d => <ListGroup.Item as="button" className="m-0 p-0" action onClick={this.handleClick} id={d.id} key={d.id} eventKey={d.id}>
          <dl className="row  m-0 p-0">
            <dt className="text-start w-75 fs-6 ">{d.firstName + " " + d.lastName}</dt>
            <dd className="text-end w-25 fs-6">{"#" + d.primaryNumber}</dd>
          </dl>
        </ListGroup.Item>)
      );
    }
  }

  fillCard() {

    if (true === this.props.data.rosterLoaded && 0 < this.props.data.outfield.length) {
      if (0 >= this.state.cardPerson.length) {
        this.setState({ cardPerson: this.props.data.pitchers[0] });
        console.log("inside");
        return (<></>)
      }
    }

    const imageSrc = "https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/" + this.state.cardPerson.id + "/headshot/67/current";
    const imageSrcSet = "https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/" + this.state.cardPerson.id + "/headshot/67/current 1x";
    return (
      <Card >
        <Card.Img variant="top" src={imageSrc} srcSet={imageSrcSet} />
        <Card.Body>
          <Card.Title>

            {this.state.cardPerson.primaryNumber ?
              "#" + this.state.cardPerson.primaryNumber + " " + this.state.cardPerson.fullName + " "
              : ""}
            {this.state.cardPerson.pronunciation ?
              "(" + this.state.cardPerson.pronunciation + ")"
              : ""}
          </Card.Title>
          <Card.Text as="span">
              {this.state.cardPerson.nickName ?
              
                <><dt className='text-start fs-6' style={{ width: '35%' }}>{"Nickname:"}</dt> <dd className='text-end fs-6' style={{ width: '65%' }}>{this.state.cardPerson.nickName} </dd></> :
                ""}
              {this.state.cardPerson.primaryPosition ?
                <><p style={{"text-align": 'left'}}><strong>{"Position:"}</strong><span style={{float: 'right'}}>{this.state.cardPerson.primaryPosition.name} </span></p></> : ""}

              {this.state.cardPerson.draftYear ?
                <><p style={{"text-align": 'left'}}><strong>{"Drafted:"}</strong><span style={{float: 'right'}}>{this.state.cardPerson.draftYear} </span></p></> : ""}

              {this.state.cardPerson.mlbDebutDate ?
                <><p style={{"text-align": 'left'}}><strong>{"MLB Debut:"}</strong><span style={{float: 'right'}}>{this.state.cardPerson.mlbDebutDate} </span></p></> : ""}
                
              {this.state.cardPerson.pitchHand ?
                <><p style={{"text-align": 'left'}}><strong>{"Throws:"}</strong><span style={{float: 'right'}}>{this.state.cardPerson.pitchHand.description} </span></p></> : ""}
                
              {this.state.cardPerson.batSide ?
                <><p style={{"text-align": 'left'}}><strong>{"Bats:"}</strong><span style={{float: 'right'}}>{this.state.cardPerson.batSide.description} </span></p></> : ""}
                

              {this.state.cardPerson.birthDate ?
                <><p style={{"text-align": 'left'}}><strong>{"Birth Date:"}</strong><span style={{float: 'right'}}>{this.state.cardPerson.birthDate} </span></p></> : ""}
                
              {this.state.cardPerson.currentAge ?
                <><p style={{"text-align": 'left'}}><strong>{"Current Age:"}</strong><span style={{float: 'right'}}>{this.state.cardPerson.currentAge} </span></p></> : ""}
                
              {this.state.cardPerson.birthCity ?
                <><p style={{"text-align": 'left'}}><strong>{"Birth:"}</strong><span style={{float: 'right'}}>{this.state.cardPerson.birthCity} {this.state.cardPerson.birthStateProvince ? ", " + this.state.cardPerson.birthStateProvince : ""} {this.state.cardPerson.birthCountry ? ", " + this.state.cardPerson.birthCountry : ""} </span></p></> : ""}
                
              {this.state.cardPerson.height ?
                <><p style={{"text-align": 'left'}}><strong>{"Height:"}</strong><span style={{float: 'right'}}>{this.state.cardPerson.height} </span></p></> : ""}
               
              {this.state.cardPerson.weight ?
                <><p style={{"text-align": 'left'}}><strong>{"Weight:"}</strong><span style={{float: 'right'}}>{this.state.cardPerson.weight} </span></p></> : ""}
                
          </Card.Text>
        </Card.Body>
      </Card>
    );

  }
  getGameFeed() {
    return (
      <div class="align-top">test2</div>
    );
  }

  render() {
    return (
      <>
          <Row  >
            <Col >
              {this.fillCard()}
            </Col>
          </Row  >
          <Row  >
            <Col >
              <Accordion defaultActiveKey="0"  >
                <Accordion.Item eventKey="0" >
                  <Accordion.Header>Pitchers</Accordion.Header>
                  <Accordion.Body  >
                    <ListGroup as="ul" >
                      {this.getPitcherItems()}
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Catchers</Accordion.Header>
                  <Accordion.Body>
                    <ListGroup as="ul">
                      {this.getCatcherItems()}
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Outfield</Accordion.Header>
                  <Accordion.Body>
                    <ListGroup as="ul">
                      {this.getOutfieldItems()}
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>Infield</Accordion.Header>
                  <Accordion.Body>
                    <ListGroup as="ul">
                      {this.getInfieldItems()}
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col  >
          </Row>
      </>
    );
  }

}

export default Roster;