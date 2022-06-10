


import banner1 from './images/twins0.png';
import banner2 from './images/twins1.png';
import banner3 from './images/twins2.png';

import React, { useState } from 'react';


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import TeamBody from './TeamBody';

const teamID = 142; //minnesota Twins


class App extends React.Component {

  constructor() {
    super();
    this.state = {
      readingRoster: false,
      rosterLoaded: false,
      pitchers: [],
      catchers: [],
      outfield: [],
      infield: [],

    };

  }

  render() {
    return (
      <div className="App">
        <Banner />
        <div className="Body-header">
          <TeamBody dat={this.state} />
        </div>
      </div>
    );
  }


async  readRoster() {


    const readpitchers = [];
    const readcatchers = [];
    const readoutfield = [];
    const readinfield = [];




    if((false === this.state.rosterLoaded) && (false === this.state.readingRoster)){

      this.setState({readingRoster:true});

      var MLBStatsAPI = require("mlb-stats-api");
      const mlbStats = new MLBStatsAPI();
      const rosterResponse =  await mlbStats.getTeamRoster({ pathParams: { teamId: teamID } });
      if (rosterResponse.status === 200 || rosterResponse.status === 0) {
        for (var i = 0; i < 26; i++) {
          const playerResponse = await mlbStats.getPerson({ pathParams: { personId: rosterResponse.data.roster[i].person.id } });
          if (playerResponse.status === 200 || playerResponse.status === 0) {
            switch (playerResponse.data.people[0].primaryPosition.code) {
              case "1":
                readpitchers.push(playerResponse.data.people[0]);
                break;
              case "2":
                readcatchers.push(playerResponse.data.people[0]);
                break;
              case "3":
              case "4":
              case "5":
              case "6":
                readinfield.push(playerResponse.data.people[0]);
                break;
              case "7":
              case "8":
              case "9":
                readoutfield.push(playerResponse.data.people[0]);
                break;
              default:
                console.log("default= " + playerResponse.data.people[0].fullName + " " + playerResponse.data.people[0].positionCode + " " + playerResponse.data.people[0].positionName);
            }
          }
          else {
            console.log("read Player Error= " + rosterResponse.data.roster[i].fullName);
          }
        }
      } else {
        console.log("read roster ERROR = " + rosterResponse.status);
      }
      this.setState({ pitchers: readpitchers });
      this.setState({ catchers: readcatchers });
      this.setState({ infield: readinfield });
      this.setState({ outfield: readoutfield });
      this.setState({readingRoster:false});
      this.setState({rosterLoaded:true});
    }
  };


  componentDidMount() {
    this.readRoster();
  }
/*
 static getDerivedStateFromProps() {
    this.readRoster();
  }
*/

}



function Banner() {

  return (
    <header className="App-header">
      <Container fluid>
        <Row  className="justify-content-md-center ">
          <Col  sm={3} lg="3"  className=" ">
          </Col>
          <Col className="">
            <Image src={banner3} fluid style={{width:'80%'}}/>
          </Col>
          <Col sm={3} lg="3" className=" ">
          </Col>
        </Row>
      </Container>
    </header>

  );
}


export default App;
