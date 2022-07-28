import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import * as d3 from "d3";

import './Game.scss';


//const combinedLogoUrl = "https://img.mlbstatic.com/mlb-photos/image/upload/ar_167:211,c_crop/fl_relative,l_team:111:fill:spot.png,w_1.0,h_1,x_0.5,y_0,fl_no_overflow,e_distort:100p:0:200p:0:200p:100p:0:100p/if_w_gt_0.50/fl_relative,l_team:142:logo:spot:current,w_0.38,x_-0.25,y_-0.16/if_else/fl_relative,l_team:108:logo:spot:current,h_0.25,x_-0.25,y_-0.16/if_end/if_w_gt_0.50/fl_relative,l_team:111:logo:spot:current,w_0.38,x_0.25,y_0.16/if_else/fl_relative,l_team:111:logo:spot:current,h_0.25,x_0.25,y_0.16/if_end/w_400/team/142/fill/spot.png"
//  Detroit 116  https://img.mlbstatic.com/mlb-photos/image/upload/ar_167:211,c_crop/fl_relative,l_team:116:fill:spot.png,w_1.0,h_1,x_0.5,y_0,fl_no_overflow,e_distort:100p:0:200p:0:200p:100p:0:100p/if_w_gt_0.50/fl_relative,l_team:142:logo:spot:current,w_0.38,x_-0.25,y_-0.16/if_else/fl_relative,l_team:108:logo:spot:current,h_0.25,x_-0.25,y_-0.16/if_end/if_w_gt_0.50/fl_relative,l_team:116:logo:spot:current,w_0.38,x_0.25,y_0.16/if_else/fl_relative,l_team:116:logo:spot:current,h_0.25,x_0.25,y_0.16/if_end/w_400/team/142/fill/spot.png


export default function Game(teamId) {

    const [teamAway, setTeamAway] = useState({});
    const [teamHome, setTeamHome] = useState({});
    const [venue, setVenue] = useState({});
    const [weather, setWeather] = useState({});
    const [allPlays, setAllPlays] = useState({});

    const [currentPlay, setCcurrentPlay] = useState({});
    const [scoringPlays, setScoringPlays] = useState({});
    const [lineScore, setLineScore] = useState({});
    const [boxScore, setBoxScore] = useState({});
    const [gameLeaders, setGameLeaders] = useState({});

    const [gameRead, setGameRead] = useState(false);
    const [gameLive, setGameLive] = useState(false);
    const [gameLiveTimer, setGameLiveTimer] = useState(false);


    async function readGameData() {
        const scheduleRresponse = await fetch('https://statsapi.mlb.com/api/v1/schedule?sportId=1&teamId=' + teamId.teamId);
        if (scheduleRresponse.status === 200 || scheduleRresponse.status === 0) {
            const data = await scheduleRresponse.json();
            //   data.totalGames == 0    then don't read game        
            const gameRresponse = await fetch('https://statsapi.mlb.com' + data.dates[0].games[0].link);
            if (gameRresponse.status === 200 || gameRresponse.status === 0) {
                const data = await gameRresponse.json();
                setTeamAway(data.gameData.teams.away);
                setTeamHome(data.gameData.teams.home);
                setVenue(data.gameData.venue);
                setWeather(data.gameData.weather);
                setAllPlays(data.liveData.plays.allPlays);
                setCcurrentPlay(data.liveData.plays.currentPlay);
                setScoringPlays(data.liveData.plays.scoringPlays);
                setLineScore(data.liveData.linescore);
                setBoxScore(data.liveData.boxscore);
                setGameLeaders(data.liveData.leaders);
                setGameRead(true);

            }
            if ("L" === data.dates[0].games[0].status.abstractGameCode || "P" === data.dates[0].games[0].status.abstractGameCode) {
                /* game is live, setup timer */
                setGameLive(true);
            }
            if (("L" !== data.dates[0].games[0].status.abstractGameCode && "P" !== data.dates[0].games[0].status.abstractGameCode) && true === gameLive) {
                //means live game just ended so stop timer
                setGameLive(false);
            }
        }
    }


    useEffect(() => {
        readGameData();

    }, []);

    useEffect(() => {
        let interval;

        if (gameLive === true) {
            setGameLiveTimer(true);
            interval = setInterval(() => {
                readGameData();
            }, 5000);
            return () => {
                setGameLiveTimer(false);
                clearInterval(interval);
            }
        }
        else if ((gameLive === false) && gameLiveTimer === true) {
            return () => {
                console.log("Clearing Timer 2");
                setGameLiveTimer(false);
                clearInterval(interval);
            }
        }
    }, [gameLive]);

    function renderSummaryTeams() {
        if (true === gameRead) {
            return (
                <>
                    <Col  >
                        <Image className="" src={"https://www.mlbstatic.com/team-logos/team-cap-on-light/" + teamHome.id + ".svg"} data-mlb-test="teamLogos" data-testid="teamLogos" width="50px" height="50px" /><br></br>
                        {teamHome.teamName}<br></br>
                        {teamHome.record.wins + "-" + teamHome.record.losses}<br></br>
                        {teamHome.record.winningPercentage}<br></br>
                    </Col>
                    <Col >
                        <h1 width="100px" height="100px">{lineScore.teams.home.runs}</h1>
                    </Col>
                    <Col className="p-0">
                        <h1  >{"\u2014"}</h1>
                    </Col>
                    <Col >
                        <h1 width="100px" height="100px">{lineScore.teams.away.runs}</h1>
                    </Col>
                    <Col >
                        <Image className="" src={"https://www.mlbstatic.com/team-logos/team-cap-on-light/" + teamAway.id + ".svg"} data-mlb-test="teamLogos" data-testid="teamLogos" width="50px" height="50px" /><br></br>
                        {teamAway.teamName}<br></br>
                        {teamAway.record.wins + "-" + teamAway.record.losses} <br></br>
                        {teamAway.record.winningPercentage}
                    </Col>

                </>
            );
        }
        else {
            return (<p>Loading</p>);
        }
    }


    function renderSummaryBoxScore() {
        if (true === gameRead) {
            return (
                <>
                    <Row className="" >
                        <Col className=""><br></br>{teamAway.abbreviation}<br></br>{teamHome.abbreviation}<br></br></Col>
                        {lineScore.innings.map((d, index) => <Col className="p-0">{index + 1}<br></br>{d.away.runs}<br></br>{d.home.runs}<br></br></Col>)}
                        <Col className="p-0">R<br></br>{lineScore.teams.away.runs}<br></br>{lineScore.teams.home.runs}<br></br></Col>
                        <Col className="p-0">H<br></br>{lineScore.teams.away.hits}<br></br>{lineScore.teams.home.runs}<br></br></Col>
                        <Col className="p-0">E<br></br>{lineScore.teams.away.errors}<br></br>{lineScore.teams.home.errors}<br></br></Col>
                    </Row>
                </>
            );
        }
        else {
            return (<p></p>);
        }
    }

    function renderSummaryField() {
        if (true === gameRead) {
            return (
                <>
                    <br></br><h2>Home Field</h2><br></br>
                    {venue.name}<br></br>
                    {venue.location.address1}<br></br>
                    {venue.location.city}, {venue.location.state}, {venue.location.country}<br></br>
                    {venue.location.postalCode}<br></br>
                    {venue.location.phone}<br></br><br></br>
                    {weather.condition + " " + weather.temp + "\u00B0F wind is " + weather.wind}<br></br>


                </>

            );
        }
        else {
            return (<p></p>);
        }
    }


    function renderScores() {
        if (true === gameRead) {
            //            const imageURL = "https://img.mlbstatic.com/mlb-photos/image/upload/ar_167:211,c_crop/fl_relative,l_team:" + teamHome.id + ":fill:spot.png,w_1.0,h_1,x_0.5,y_0,fl_no_overflow,e_distort:100p:0:200p:0:200p:100p:0:100p/if_w_gt_0.50/fl_relative,l_team:" + teamAway.id + ":logo:spot:current,w_0.38,x_-0.25,y_-0.16/if_else/fl_relative,l_team:108:logo:spot:current,h_0.25,x_-0.25,y_-0.16/if_end/if_w_gt_0.50/fl_relative,l_team:" + teamHome.id + ":logo:spot:current,w_0.38,x_0.25,y_0.16/if_else/fl_relative,l_team:" + teamHome.id + ":logo:spot:current,h_0.25,x_0.25,y_0.16/if_end/w_400/team/" + teamAway.id + "/fill/spot.png"
            const inningStr = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th"];

            return (
                <>
                    <Row>
                        {/*}                           <Image className="" src={imageURL} data-mlb-test="teamLogos" data-testid="teamLogos" /><br></br>  {*/}
                    </Row>
                    <Row>
                        <ListGroup style={{ textAlign: 'left' }}>

                            {scoringPlays.map((d, index) =>
                                <ListGroup.Item ><strong> {allPlays[d].about.halfInning} of the {inningStr[allPlays[d].about.inning - 1]}</strong>
                                    <br></br>
                                    {allPlays[d].about.isTopInning === true ?
                                        <Image className="" src={"https://www.mlbstatic.com/team-logos/team-cap-on-light/" + teamAway.id + ".svg"} data-mlb-test="teamLogos" data-testid="teamLogos" width="25px" height="25px" /> :
                                        <Image className="" src={"https://www.mlbstatic.com/team-logos/team-cap-on-light/" + teamHome.id + ".svg"} data-mlb-test="teamLogos" data-testid="teamLogos" width="25px" height="25px" />
                                    }
                                    {" " + allPlays[d].result.description}</ListGroup.Item>)}
                        </ListGroup>
                    </Row>
                </>

            );
        }
        else {
            return (<p>Loading</p>);
        }

    }

    function renderAllPlays() {
        if (true === gameRead) {
            //            const imageURL = "https://img.mlbstatic.com/mlb-photos/image/upload/ar_167:211,c_crop/fl_relative,l_team:" + teamHome.id + ":fill:spot.png,w_1.0,h_1,x_0.5,y_0,fl_no_overflow,e_distort:100p:0:200p:0:200p:100p:0:100p/if_w_gt_0.50/fl_relative,l_team:" + teamAway.id + ":logo:spot:current,w_0.38,x_-0.25,y_-0.16/if_else/fl_relative,l_team:108:logo:spot:current,h_0.25,x_-0.25,y_-0.16/if_end/if_w_gt_0.50/fl_relative,l_team:" + teamHome.id + ":logo:spot:current,w_0.38,x_0.25,y_0.16/if_else/fl_relative,l_team:" + teamHome.id + ":logo:spot:current,h_0.25,x_0.25,y_0.16/if_end/w_400/team/" + teamAway.id + "/fill/spot.png"
            const inningStr = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th"];
            return (
                <>
                    <Row>
                   {/*}                           <Image className="" src={imageURL} data-mlb-test="teamLogos" data-testid="teamLogos" /><br></br>  {*/}
                    </Row>
                    <Row>
                        <ListGroup style={{ textAlign: 'left' }}>

                            {allPlays.map((d, index) =>
                                <ListGroup.Item ><strong> {allPlays[index].about.halfInning} of the {inningStr[allPlays[index].about.inning - 1]}</strong>
                                    <br></br>
                                    {allPlays[index].about.isTopInning === true ?
                                        <Image className="" src={"https://www.mlbstatic.com/team-logos/team-cap-on-light/" + teamAway.id + ".svg"} data-mlb-test="teamLogos" data-testid="teamLogos" width="25px" height="25px" /> :
                                        <Image className="" src={"https://www.mlbstatic.com/team-logos/team-cap-on-light/" + teamHome.id + ".svg"} data-mlb-test="teamLogos" data-testid="teamLogos" width="25px" height="25px" />
                                    }
                                    {" " + d.result.description}</ListGroup.Item>)}

                        </ListGroup>

                    </Row>
                </>

            );
        }
        else {
            return (<p>Loading</p>);
        }

    }

    function renderCurrentPlay() {
        if (true === gameRead) {
            var draw;
            draw = d3.select("svg");
            draw.selectAll("rect").remove();
            draw.selectAll("circle").remove();
            draw.selectAll("text").remove();

            if (currentPlay.pitchIndex.length > 0) {
                var zoneTop = currentPlay.playEvents[currentPlay.pitchIndex[0]].pitchData.strikeZoneTop + currentPlay.playEvents[currentPlay.pitchIndex[0]].pitchData.strikeZoneBottom;
                var xdraw = d3.scaleLinear().domain([-2.125, 2.125]).range([0, 360]);
                var ydraw = d3.scaleLinear().domain([0, zoneTop]).range([0, 375]);
                var ysquareheight = ydraw((currentPlay.playEvents[currentPlay.pitchIndex[0]].pitchData.strikeZoneTop - currentPlay.playEvents[currentPlay.pitchIndex[0]].pitchData.strikeZoneBottom) / 3);
                var ytop = ydraw(currentPlay.playEvents[currentPlay.pitchIndex[0]].pitchData.strikeZoneBottom);
                var ytop2 = ytop + ysquareheight;
                var ytop3 = ytop2 + ysquareheight;

                draw.append("rect").attr("x", 120).attr("y", ytop).attr("width", 40).attr("height", ysquareheight).attr("fill", currentPlay.matchup.batterHotColdZones[0].color).attr("style", "stroke:rgb(0,0,0)");
                draw.append("rect").attr("x", 160).attr("y", ytop).attr("width", 40).attr("height", ysquareheight).attr("fill", currentPlay.matchup.batterHotColdZones[1].color).attr("style", "stroke:rgb(0,0,0)");
                draw.append("rect").attr("x", 200).attr("y", ytop).attr("width", 40).attr("height", ysquareheight).attr("fill", currentPlay.matchup.batterHotColdZones[2].color).attr("style", "stroke:rgb(0,0,0)");
                draw.append("rect").attr("x", 120).attr("y", ytop2).attr("width", 40).attr("height", ysquareheight).attr("fill", currentPlay.matchup.batterHotColdZones[3].color).attr("style", "outline: thin solid black;");
                draw.append("rect").attr("x", 160).attr("y", ytop2).attr("width", 40).attr("height", ysquareheight).attr("fill", currentPlay.matchup.batterHotColdZones[4].color).attr("style", "outline: thin solid black;");
                draw.append("rect").attr("x", 200).attr("y", ytop2).attr("width", 40).attr("height", ysquareheight).attr("fill", currentPlay.matchup.batterHotColdZones[5].color).attr("style", "outline: thin solid black;");
                draw.append("rect").attr("x", 120).attr("y", ytop3).attr("width", 40).attr("height", ysquareheight).attr("fill", currentPlay.matchup.batterHotColdZones[6].color).attr("style", "outline: thin solid black;");
                draw.append("rect").attr("x", 160).attr("y", ytop3).attr("width", 40).attr("height", ysquareheight).attr("fill", currentPlay.matchup.batterHotColdZones[7].color).attr("style", "outline: thin solid black;");
                draw.append("rect").attr("x", 200).attr("y", ytop3).attr("width", 40).attr("height", ysquareheight).attr("fill", currentPlay.matchup.batterHotColdZones[8].color).attr("style", "outline: thin solid black;");
                currentPlay.pitchIndex.map((d, index) => {
                    draw.append("circle")
                        .style("stroke", "gray")
                        .style("fill", currentPlay.playEvents[d].details.ballColor)
                        .attr("r", 10)
                        .attr("cx", xdraw(currentPlay.playEvents[d].pitchData.coordinates.pX))
                        .attr("cy", ydraw(currentPlay.playEvents[d].pitchData.strikeZoneTop + currentPlay.playEvents[d].pitchData.strikeZoneBottom - currentPlay.playEvents[d].pitchData.coordinates.pZ));
                    draw.append("text")
                        .attr("x", xdraw(currentPlay.playEvents[d].pitchData.coordinates.pX) - 6)
                        .attr("y", ydraw(currentPlay.playEvents[d].pitchData.strikeZoneTop + currentPlay.playEvents[d].pitchData.strikeZoneBottom - currentPlay.playEvents[d].pitchData.coordinates.pZ) + 6)
                        .style("font-size", "20px")
                        .style("fill", "white")
                        .text(index + 1);
                }
                );
            }
            else {
// blank piiching box                
                draw.append("rect").attr("x", 120).attr("y", 125).attr("width", 40).attr("height", 42).attr("fill", "white").attr("style", "outline: thin solid black;");
                draw.append("rect").attr("x", 160).attr("y", 125).attr("width", 40).attr("height", 42).attr("fill", "white").attr("style", "outline: thin solid black;");
                draw.append("rect").attr("x", 200).attr("y", 125).attr("width", 40).attr("height", 42).attr("fill", "white").attr("style", "outline: thin solid black;");
                draw.append("rect").attr("x", 120).attr("y", 167).attr("width", 40).attr("height", 42).attr("fill", "white").attr("style", "outline: thin solid black;");
                draw.append("rect").attr("x", 160).attr("y", 167).attr("width", 40).attr("height", 42).attr("fill", "white").attr("style", "outline: thin solid black;");
                draw.append("rect").attr("x", 200).attr("y", 167).attr("width", 40).attr("height", 42).attr("fill", "white").attr("style", "outline: thin solid black;");
                draw.append("rect").attr("x", 120).attr("y", 209).attr("width", 40).attr("height", 42).attr("fill", "white").attr("style", "outline: thin solid black;");
                draw.append("rect").attr("x", 160).attr("y", 209).attr("width", 40).attr("height", 42).attr("fill", "white").attr("style", "outline: thin solid black;");
                draw.append("rect").attr("x", 200).attr("y", 209).attr("width", 40).attr("height", 42).attr("fill", "white").attr("style", "outline: thin solid black;");

            }

            return (
                <><br></br>
                    <Row>
                        <Col style={{ textAlign: 'left' }}>
                            <a>Balls: {currentPlay.count.balls}</a><br></br>
                            <a>Strikes: {currentPlay.count.strikes}</a><br></br>
                            <a>Outs: {currentPlay.count.outs}</a><br></br>
                            <br></br>
                            {currentPlay.pitchIndex.map((d, index) =>
                                <><a>{index + 1} - {currentPlay.playEvents[d].details.description} </a><br></br></>
                            )}
                        </Col>
                        <Col>
                            <svg id="pitchCanvas" width="360" height="375" style={{ border: "1px solid #000000" }}></svg>
                        </Col>
                    </Row>
                </>

            );
        }
        else {
            return (<p></p>);
        }
    }


    return (
        <>
            <Tabs defaultActiveKey="Summary" id="uncontrolled-tab-example" className="mb-3 bg-white ">
                <Tab eventKey="Summary" title="Summary">
                    <Container className="BoxScoreContainer bg-white" >
                        <Row className="BoxScoreRow" >
                            {renderSummaryTeams()}
                        </Row>
                        <Row >
                            <Col className="" >
                                {renderSummaryBoxScore()}
                            </Col>
                        </Row>
                         <Row >
                            <Col className="BoxScoreRow bg-white">
                                {renderCurrentPlay()}
                            </Col>
                        </Row>
                        <Row >
                            <Col className="BoxScoreRow bg-white">
                                {renderSummaryField()}
                            </Col>
                        </Row>
                   </Container>

                </Tab>
                <Tab eventKey="Scoring" title="Scoring">
                    <Container className="BoxScoreContainer bg-white" >
                        <Row className="BoxScoreRow" >
                            {renderScores()}
                        </Row>
                    </Container>
                </Tab>
                <Tab eventKey="Plays" title="Plays" >
                    <Container className="BoxScoreContainer bg-white" >
                        <Row className="BoxScoreRow" >
                            {renderAllPlays()}
                        </Row>
                    </Container>
                </Tab>
            </Tabs>
        </>
    );
}

