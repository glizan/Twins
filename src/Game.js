

import React, { useState } from 'react';


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';

import './Game.scss';

//replace Boston - 111 with othe team
const combinedLogoUrl = "https://img.mlbstatic.com/mlb-photos/image/upload/ar_167:211,c_crop/fl_relative,l_team:111:fill:spot.png,w_1.0,h_1,x_0.5,y_0,fl_no_overflow,e_distort:100p:0:200p:0:200p:100p:0:100p/if_w_gt_0.50/fl_relative,l_team:142:logo:spot:current,w_0.38,x_-0.25,y_-0.16/if_else/fl_relative,l_team:108:logo:spot:current,h_0.25,x_-0.25,y_-0.16/if_end/if_w_gt_0.50/fl_relative,l_team:111:logo:spot:current,w_0.38,x_0.25,y_0.16/if_else/fl_relative,l_team:111:logo:spot:current,h_0.25,x_0.25,y_0.16/if_end/w_400/team/142/fill/spot.png"
//  Detroit 116  https://img.mlbstatic.com/mlb-photos/image/upload/ar_167:211,c_crop/fl_relative,l_team:116:fill:spot.png,w_1.0,h_1,x_0.5,y_0,fl_no_overflow,e_distort:100p:0:200p:0:200p:100p:0:100p/if_w_gt_0.50/fl_relative,l_team:142:logo:spot:current,w_0.38,x_-0.25,y_-0.16/if_else/fl_relative,l_team:108:logo:spot:current,h_0.25,x_-0.25,y_-0.16/if_end/if_w_gt_0.50/fl_relative,l_team:116:logo:spot:current,w_0.38,x_0.25,y_0.16/if_else/fl_relative,l_team:116:logo:spot:current,h_0.25,x_0.25,y_0.16/if_end/w_400/team/142/fill/spot.png





class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            teamAway: [],
            teamHome: [],
            venue: [],
            weather: [],
            allPlays: [],

            currentPlay: [],
            scoringPlays: [],
            lineScore: [],
            boxScore: [],
            gameLeaders: [],
            gameRead: false
        };
    }

    async componentDidMount() {


        const scheduleRresponse = await fetch('https://statsapi.mlb.com/api/v1/schedule?sportId=1&teamId=142');
        if (scheduleRresponse.status === 200 || scheduleRresponse.status === 0) {
            const data = await scheduleRresponse.json();
            if ("L" === data.dates[0].games[0].status.abstractGameCode) {
                //Live game - setup timer for refreshes
console.log( "Game is Live ");
            }
            else{
                console.log( "Game is done " + "https://statsapi.mlb.com" + data.dates[0].games[0].link);

                const gameRresponse = await fetch('https://statsapi.mlb.com' + data.dates[0].games[0].link);
                if (gameRresponse.status === 200 || gameRresponse.status === 0) {
    
                    const data = await gameRresponse.json();
   
                    this.setState({ teamAway: data.gameData.teams.away });
                    this.setState({ teamHome: data.gameData.teams.home });
                    this.setState({ venue: data.gameData.venue });
                    this.setState({ weather: data.gameData.weather });
                    this.setState({ allPlays: data.liveData.plays.allPlays });
    
                    this.setState({ currentPlay: data.liveData.plays.currentPlay });
                    this.setState({ scoringPlays: data.liveData.plays.scoringPlays });
                    this.setState({ lineScore: data.liveData.linescore });
                    this.setState({ boxScore: data.liveData.boxscore });
                    this.setState({ gameLeaders: data.liveData.leaders });
                    this.setState({ gameRead: true });
                }
            }
        }
    }
    renderSummaryTeams() {
        if (true === this.state.gameRead) {
            return (
                <>
                    <Col  >
                        <Image className="" src={"https://www.mlbstatic.com/team-logos/team-cap-on-light/" + this.state.teamHome.id + ".svg"} data-mlb-test="teamLogos" data-testid="teamLogos" width="50px" height="50px" /><br></br>
                        {this.state.teamHome.teamName}<br></br>
                        {this.state.teamHome.record.wins + "-" + this.state.teamHome.record.losses}<br></br>
                        {this.state.teamHome.record.winningPercentage}<br></br>
                    </Col>
                    <Col >
                        <h1  width="100px" height="100px">{this.state.lineScore.teams.home.runs}</h1>
                    </Col>
                    <Col className="p-0">
                        <h1  >{"\u2014"}</h1>
                    </Col>
                    <Col >
                        <h1  width="100px" height="100px">{this.state.lineScore.teams.away.runs}</h1>
                    </Col>
                    <Col >
                        <Image className="" src={"https://www.mlbstatic.com/team-logos/team-cap-on-light/" + this.state.teamAway.id + ".svg"} data-mlb-test="teamLogos" data-testid="teamLogos" width="50px" height="50px" /><br></br>
                        {this.state.teamAway.teamName}<br></br>
                        {this.state.teamAway.record.wins + "-" + this.state.teamAway.record.losses} <br></br>
                        {this.state.teamAway.record.winningPercentage}
                    </Col>

                </>
            );
        }
        else {
            return (<p>Loading</p>);
        }
    }


    renderSummaryBoxScore() {
        if (true === this.state.gameRead) {
            return (
                <>
                    <Row className="" >
                        <Col className=""><br></br>{this.state.teamAway.abbreviation}<br></br>{this.state.teamHome.abbreviation}<br></br></Col>
                        {this.state.lineScore.innings.map((d, index) => <Col className="p-0">{index + 1}<br></br>{d.away.runs}<br></br>{d.home.runs}<br></br></Col>)}
                        <Col className="p-0">R<br></br>{this.state.lineScore.teams.away.runs}<br></br>{this.state.lineScore.teams.home.runs}<br></br></Col>
                        <Col className="p-0">H<br></br>{this.state.lineScore.teams.away.hits}<br></br>{this.state.lineScore.teams.home.runs}<br></br></Col>
                        <Col className="p-0">E<br></br>{this.state.lineScore.teams.away.errors}<br></br>{this.state.lineScore.teams.home.errors}<br></br></Col>
                    </Row>
                </>
            );
        }
        else {
            return (<p>Loading</p>);
        }
    }

    renderSummaryField() {
        if (true === this.state.gameRead) {
            return (
                <>
                    <br></br><h2>Home Field</h2><br></br>
                    {this.state.venue.name}<br></br>
                    {this.state.venue.location.address1}<br></br>
                    {this.state.venue.location.city}, {this.state.venue.location.state}, {this.state.venue.location.country}<br></br>
                    {this.state.venue.location.postalCode}<br></br>
                    {this.state.venue.location.phone}<br></br><br></br>
                    {this.state.weather.condition + " " + this.state.weather.temp + "\u00B0F wind is " + this.state.weather.wind}<br></br>


                </>

            );
        }
        else {
            return (<p>Loading</p>);
        }
    }


    renderScores() {
        if (true === this.state.gameRead) {
            const imageURL = "https://img.mlbstatic.com/mlb-photos/image/upload/ar_167:211,c_crop/fl_relative,l_team:" + this.state.teamHome.id + ":fill:spot.png,w_1.0,h_1,x_0.5,y_0,fl_no_overflow,e_distort:100p:0:200p:0:200p:100p:0:100p/if_w_gt_0.50/fl_relative,l_team:" + this.state.teamAway.id + ":logo:spot:current,w_0.38,x_-0.25,y_-0.16/if_else/fl_relative,l_team:108:logo:spot:current,h_0.25,x_-0.25,y_-0.16/if_end/if_w_gt_0.50/fl_relative,l_team:" + this.state.teamHome.id + ":logo:spot:current,w_0.38,x_0.25,y_0.16/if_else/fl_relative,l_team:" + this.state.teamHome.id + ":logo:spot:current,h_0.25,x_0.25,y_0.16/if_end/w_400/team/" + this.state.teamAway.id + "/fill/spot.png"
            const inningStr = [ "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th" ];

            return (
                <>
                        <Row>
 {/*}                           <Image className="" src={imageURL} data-mlb-test="teamLogos" data-testid="teamLogos" /><br></br>  {*/}
                        </Row>
                        <Row>
                 <ListGroup style={{ textAlign: 'left' }}>
                        
 {this.state.scoringPlays.map((d, index) => <ListGroup.Item ><strong> {this.state.allPlays[d].about.halfInning} of the {inningStr[this.state.allPlays[d].about.inning-1]}</strong><br></br>{this.state.allPlays[d].result.description}</ListGroup.Item>)}
 </ListGroup>
                         </Row>
                </>

            );
        }
        else {
            return (<p>Loading</p>);
        }

    }

    renderAllPlays() {
        if (true === this.state.gameRead) {
            const imageURL = "https://img.mlbstatic.com/mlb-photos/image/upload/ar_167:211,c_crop/fl_relative,l_team:" + this.state.teamHome.id + ":fill:spot.png,w_1.0,h_1,x_0.5,y_0,fl_no_overflow,e_distort:100p:0:200p:0:200p:100p:0:100p/if_w_gt_0.50/fl_relative,l_team:" + this.state.teamAway.id + ":logo:spot:current,w_0.38,x_-0.25,y_-0.16/if_else/fl_relative,l_team:108:logo:spot:current,h_0.25,x_-0.25,y_-0.16/if_end/if_w_gt_0.50/fl_relative,l_team:" + this.state.teamHome.id + ":logo:spot:current,w_0.38,x_0.25,y_0.16/if_else/fl_relative,l_team:" + this.state.teamHome.id + ":logo:spot:current,h_0.25,x_0.25,y_0.16/if_end/w_400/team/" + this.state.teamAway.id + "/fill/spot.png"
            const inningStr = [ "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th" ];
            return (
                <>
                        <Row>
 {/*}                           <Image className="" src={imageURL} data-mlb-test="teamLogos" data-testid="teamLogos" /><br></br>  {*/}
                        </Row>
                        <Row>
                 <ListGroup style={{ textAlign: 'left' }}>
                   
 {this.state.allPlays.map((d, index) => <ListGroup.Item ><strong> {this.state.allPlays[index].about.halfInning} of the {inningStr[this.state.allPlays[index].about.inning-1]}</strong><br></br>{d.result.description}</ListGroup.Item>)}
            
 </ListGroup>
            
                        </Row>
                </>

            );
        }
        else {
            return (<p>Loading</p>);
        }

    }



    render() {

        return (
            <>
                <Tabs defaultActiveKey="Summary" id="uncontrolled-tab-example" className="mb-3 bg-white ">
                    <Tab eventKey="Summary" title="Summary">
                        <Container className="BoxScoreContainer bg-white" >
                            <Row className="BoxScoreRow" >
                                {this.renderSummaryTeams()}
                            </Row>
                            <Row >
                                <Col className="" >
                                    {this.renderSummaryBoxScore()}
                                </Col>
                            </Row>
                            <Row >
                            <Col className="BoxScoreRow bg-white">
                                {this.renderSummaryField()}
                                </Col>

                            </Row>
                        </Container>


                    </Tab>
                    <Tab eventKey="Scoring" title="Scoring">
                    <Container className="BoxScoreContainer bg-white" >
                            <Row className="BoxScoreRow" >
                                {this.renderScores()}
                            </Row>
                        </Container>
                    </Tab>
                    <Tab eventKey="Plays" title="Plays" >
                    <Container className="BoxScoreContainer bg-white" >
                            <Row className="BoxScoreRow" >
                    {this.renderAllPlays()}
                    </Row>
                        </Container>
                    </Tab>
                </Tabs>        </>
        );
    }
}

export default Game;