import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import * as d3 from "d3";





export default function CurrentPlay(props) {


    if (true === props.gameRead) {
        var draw;
        draw = d3.select("svg");
        draw.selectAll("rect").remove();
        draw.selectAll("circle").remove();
        draw.selectAll("text").remove();

        if (props.currentPlay.pitchIndex.length > 0) {
            var zoneTop = props.currentPlay.playEvents[props.currentPlay.pitchIndex[0]].pitchData.strikeZoneTop + props.currentPlay.playEvents[props.currentPlay.pitchIndex[0]].pitchData.strikeZoneBottom;
            var xdraw = d3.scaleLinear().domain([-2.125, 2.125]).range([0, 360]);
            var ydraw = d3.scaleLinear().domain([0, zoneTop]).range([0, 375]);
            var ysquareheight = ydraw((props.currentPlay.playEvents[props.currentPlay.pitchIndex[0]].pitchData.strikeZoneTop - props.currentPlay.playEvents[props.currentPlay.pitchIndex[0]].pitchData.strikeZoneBottom) / 3);
            var ytop = ydraw(props.currentPlay.playEvents[props.currentPlay.pitchIndex[0]].pitchData.strikeZoneBottom);
            var ytop2 = ytop + ysquareheight;
            var ytop3 = ytop2 + ysquareheight;

            draw.append("rect").attr("x", 120).attr("y", ytop).attr("width", 40).attr("height", ysquareheight).attr("fill", props.currentPlay.matchup.batterHotColdZones[0].color).attr("style", "stroke:rgb(0,0,0)");
            draw.append("rect").attr("x", 160).attr("y", ytop).attr("width", 40).attr("height", ysquareheight).attr("fill", props.currentPlay.matchup.batterHotColdZones[1].color).attr("style", "stroke:rgb(0,0,0)");
            draw.append("rect").attr("x", 200).attr("y", ytop).attr("width", 40).attr("height", ysquareheight).attr("fill", props.currentPlay.matchup.batterHotColdZones[2].color).attr("style", "stroke:rgb(0,0,0)");
            draw.append("rect").attr("x", 120).attr("y", ytop2).attr("width", 40).attr("height", ysquareheight).attr("fill", props.currentPlay.matchup.batterHotColdZones[3].color).attr("style", "outline: thin solid black;");
            draw.append("rect").attr("x", 160).attr("y", ytop2).attr("width", 40).attr("height", ysquareheight).attr("fill", props.currentPlay.matchup.batterHotColdZones[4].color).attr("style", "outline: thin solid black;");
            draw.append("rect").attr("x", 200).attr("y", ytop2).attr("width", 40).attr("height", ysquareheight).attr("fill", props.currentPlay.matchup.batterHotColdZones[5].color).attr("style", "outline: thin solid black;");
            draw.append("rect").attr("x", 120).attr("y", ytop3).attr("width", 40).attr("height", ysquareheight).attr("fill", props.currentPlay.matchup.batterHotColdZones[6].color).attr("style", "outline: thin solid black;");
            draw.append("rect").attr("x", 160).attr("y", ytop3).attr("width", 40).attr("height", ysquareheight).attr("fill", props.currentPlay.matchup.batterHotColdZones[7].color).attr("style", "outline: thin solid black;");
            draw.append("rect").attr("x", 200).attr("y", ytop3).attr("width", 40).attr("height", ysquareheight).attr("fill", props.currentPlay.matchup.batterHotColdZones[8].color).attr("style", "outline: thin solid black;");
            props.currentPlay.pitchIndex.map((d, index) => {
                draw.append("circle")
                    .style("stroke", "gray")
                    .style("fill", props.currentPlay.playEvents[d].details.ballColor)
                    .attr("r", 10)
                    .attr("cx", xdraw(props.currentPlay.playEvents[d].pitchData.coordinates.pX))
                    .attr("cy", ydraw(props.currentPlay.playEvents[d].pitchData.strikeZoneTop + props.currentPlay.playEvents[d].pitchData.strikeZoneBottom - props.currentPlay.playEvents[d].pitchData.coordinates.pZ));
                draw.append("text")
                    .attr("x", xdraw(props.currentPlay.playEvents[d].pitchData.coordinates.pX) - 6)
                    .attr("y", ydraw(props.currentPlay.playEvents[d].pitchData.strikeZoneTop + props.currentPlay.playEvents[d].pitchData.strikeZoneBottom - props.currentPlay.playEvents[d].pitchData.coordinates.pZ) + 6)
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
                        <p>Balls: {props.currentPlay.count.balls}<br></br>
                            Strikes: {props.currentPlay.count.strikes}<br></br>
                            Outs: {props.currentPlay.count.outs}<br></br>
                        </p>
                        <br></br>
                        {props.currentPlay.pitchIndex.map((d, index) =>
                            <><a>{index + 1} - {props.currentPlay.playEvents[d].details.description} </a><br></br></>
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
