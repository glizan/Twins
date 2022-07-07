import './Roster.scss';
import React, { useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';


export default function Roster({ teamId, rosterLoaded, pitchers, catchers, outfield, infield }) {
  const [cardPerson, setCardPerson] = useState({});

  function handleClick(event) {
    const { id } = event.currentTarget;
    var dataIndex = pitchers.findIndex(x => x.id == id);
    if (dataIndex >= 0) { setCardPerson(pitchers[dataIndex]) }
    dataIndex = catchers.findIndex(x => x.id == id);
    if (dataIndex >= 0) { setCardPerson(catchers[dataIndex]) }
    dataIndex = infield.findIndex(x => x.id == id);
    if (dataIndex >= 0) { setCardPerson(infield[dataIndex]) }
    dataIndex = outfield.findIndex(x => x.id == id);
    if (dataIndex >= 0) { setCardPerson(outfield[dataIndex]) }
  }

  function getPitcherItems() {

    if (true === rosterLoaded && 0 < pitchers.length) {
      return (
        pitchers.map((d, index) => <ListGroup.Item as="button" className="m-0 p-0" action onClick={handleClick} id={d.id} key={d.id} eventKey={d.id}  >
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
  function getCatcherItems() {
    if (true === rosterLoaded && 0 < catchers.length) {
      return (
        catchers.map(d => <ListGroup.Item as="button" className="m-0 p-0" action onClick={handleClick} id={d.id} key={d.id} eventKey={d.id}>
          <dl className="row  m-0 p-0">
            <dt className="text-start w-75 fs-6 ">{d.firstName + " " + d.lastName}</dt>
            <dd className="text-end w-25 fs-6">{"#" + d.primaryNumber}</dd>
          </dl>
        </ListGroup.Item>)
      );
    }

  }
  function getInfieldItems() {
    if (true === rosterLoaded && 0 < infield.length) {
      return (
        infield.map(d => <ListGroup.Item as="button" className="m-0 p-0" action onClick={handleClick} id={d.id} key={d.id} eventKey={d.id}>
          <dl className="row  m-0 p-0">
            <dt className="text-start w-75 fs-6 ">{d.firstName + " " + d.lastName}</dt>
            <dd className="text-end w-25 fs-6">{"#" + d.primaryNumber}</dd>
          </dl>
        </ListGroup.Item>)
      );
    }
  }

  function getOutfieldItems() {
    if (true === rosterLoaded && 0 < outfield.length) {
      return (
        outfield.map(d => <ListGroup.Item as="button" className="m-0 p-0" action onClick={handleClick} id={d.id} key={d.id} eventKey={d.id}>
          <dl className="row  m-0 p-0">
            <dt className="text-start w-75 fs-6 ">{d.firstName + " " + d.lastName}</dt>
            <dd className="text-end w-25 fs-6">{"#" + d.primaryNumber}</dd>
          </dl>
        </ListGroup.Item>)
      );
    }
  }


  function fillCard() {
    if (true === rosterLoaded && 0 < pitchers.length) {
      if (0 >= cardPerson.length) {
        setCardPerson(pitchers[0]);
        return (<></>)
      }
    }


    const imageSrc = "https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/" + cardPerson.id + "/headshot/67/current";
    const imageSrcSet = "https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/" + cardPerson.id + "/headshot/67/current 1x";
    return (
      <Card >
        <Card.Img variant="top" src={imageSrc} srcSet={imageSrcSet} />
        <Card.Body>
          <Card.Title>

            {cardPerson.primaryNumber ?
              "#" + cardPerson.primaryNumber + " " + cardPerson.fullName + " "
              : ""}
            {cardPerson.pronunciation ?
              "(" + cardPerson.pronunciation + ")"
              : ""}
          </Card.Title>
          <Card.Text as="span">
            {cardPerson.nickName ?

              <><dt className='text-start fs-6' style={{ width: '35%' }}>{"Nickname:"}</dt> <dd className='text-end fs-6' style={{ width: '65%' }}>{cardPerson.nickName} </dd></> :
              ""}
            {cardPerson.primaryPosition ?
              <><p style={{ "textAlign": 'left' }}><strong>{"Position:"}</strong><span style={{ float: 'right' }}>{cardPerson.primaryPosition.name} </span></p></> : ""}

            {cardPerson.draftYear ?
              <><p style={{ "textAlign": 'left' }}><strong>{"Drafted:"}</strong><span style={{ float: 'right' }}>{cardPerson.draftYear} </span></p></> : ""}

            {cardPerson.mlbDebutDate ?
              <><p style={{ "textAlign": 'left' }}><strong>{"MLB Debut:"}</strong><span style={{ float: 'right' }}>{cardPerson.mlbDebutDate} </span></p></> : ""}

            {cardPerson.pitchHand ?
              <><p style={{ "textAlign": 'left' }}><strong>{"Throws:"}</strong><span style={{ float: 'right' }}>{cardPerson.pitchHand.description} </span></p></> : ""}

            {cardPerson.batSide ?
              <><p style={{ "textAlign": 'left' }}><strong>{"Bats:"}</strong><span style={{ float: 'right' }}>{cardPerson.batSide.description} </span></p></> : ""}


            {cardPerson.birthDate ?
              <><p style={{ "textAlign": 'left' }}><strong>{"Birth Date:"}</strong><span style={{ float: 'right' }}>{cardPerson.birthDate} </span></p></> : ""}

            {cardPerson.currentAge ?
              <><p style={{ "textAlign": 'left' }}><strong>{"Current Age:"}</strong><span style={{ float: 'right' }}>{cardPerson.currentAge} </span></p></> : ""}

            {cardPerson.birthCity ?
              <><p style={{ "textAlign": 'left' }}><strong>{"Birth:"}</strong><span style={{ float: 'right' }}>{cardPerson.birthCity} {cardPerson.birthStateProvince ? ", " + cardPerson.birthStateProvince : ""} {cardPerson.birthCountry ? ", " + cardPerson.birthCountry : ""} </span></p></> : ""}

            {cardPerson.height ?
              <><p style={{ "textAlign": 'left' }}><strong>{"Height:"}</strong><span style={{ float: 'right' }}>{cardPerson.height} </span></p></> : ""}

            {cardPerson.weight ?
              <><p style={{ "textAlign": 'left' }}><strong>{"Weight:"}</strong><span style={{ float: 'right' }}>{cardPerson.weight} </span></p></> : ""}

          </Card.Text>
        </Card.Body>
      </Card>
    );

  }

  function getGameFeed() {
    return (
      <div class="align-top">test2</div>
    );
  }

  return (
    <>
      <Row  >
        <Col >
          {fillCard()}
        </Col>
      </Row  >
      <Row  >
        <Col >
          <Accordion defaultActiveKey="0"  >
            <Accordion.Item eventKey="0" >
              <Accordion.Header>Pitchers</Accordion.Header>
              <Accordion.Body  >
                <ListGroup as="ul" >
                  {getPitcherItems()}
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Catchers</Accordion.Header>
              <Accordion.Body>
                <ListGroup as="ul">
                  {getCatcherItems()}
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Outfield</Accordion.Header>
              <Accordion.Body>
                <ListGroup as="ul">
                  {getOutfieldItems()}
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Infield</Accordion.Header>
              <Accordion.Body>
                <ListGroup as="ul">
                  {getInfieldItems()}
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col  >
      </Row>
    </>
  );

}

