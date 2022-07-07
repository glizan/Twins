import React, { useState, useEffect } from 'react';
import TeamBody from './TeamBody';



let teamsSetup = [
  { 'key': 0, 'teamId': 108, 'primary': '#B90020', 'secondary': '#003263', 'tertiary': '#b1b5b6', 'background': '#ffffff' },  //Los angeles Angels
  { 'key': 1, 'teamId': 109, 'primary': '#a71930', 'secondary': '#e3d4ad', 'tertiary': '#000000', 'background': '#ffffff' },  //Arizona Diamondbackss
  { 'key': 2, 'teamId': 110, 'primary': '#000000', 'secondary': '#df4601', 'tertiary': '#a2aaad', 'background': '#ffffff' },  //baltimore Ori0les
  { 'key': 3, 'teamId': 111, 'primary': '#bd3039', 'secondary': '#192c55', 'tertiary': '#ffffff', 'background': '#ffffff' },  //Boston red Sox
  { 'key': 4, 'teamId': 112, 'primary': '#0e3386', 'secondary': '#cc3433', 'tertiary': '#ffffff', 'background': '#ffffff' },  //Chicago Cubs
  { 'key': 5, 'teamId': 113, 'primary': '#c6011f', 'secondary': '#000000', 'tertiary': '#ffffff', 'background': '#ffffff' },  //Cincinnati Reds
  { 'key': 6, 'teamId': 114, 'primary': '#002b5c', 'secondary': '#d31145', 'tertiary': '#ffffff', 'background': '#ffffff' },  //Cleveland Guardians
  { 'key': 7, 'teamId': 115, 'primary': '#33006f', 'secondary': '#c4ced4', 'tertiary': '#000000', 'background': '#ffffff' },  //Colorado Rockies
  { 'key': 8, 'teamId': 116, 'primary': '#182d55', 'secondary': '#f26722', 'tertiary': '#ffffff', 'background': '#ffffff' },  //Detroit Tigers
  { 'key': 9, 'teamId': 117, 'primary': '#002147', 'secondary': '#d6492a', 'tertiary': '#e57200', 'background': '#ffffff' },  //Houston Astros
  { 'key': 10, 'teamId': 118, 'primary': '#174885', 'secondary': '#c0995a', 'tertiary': '#7bb2dd', 'background': '#ffffff' },  //Kansas City Royals
  { 'key': 11, 'teamId': 119, 'primary': '#005a9c', 'secondary': '#ffffff', 'tertiary': '#ef3e42', 'background': '#ffffff' },  //Los angeles Dodgers
  { 'key': 12, 'teamId': 120, 'primary': '#14225a', 'secondary': '#ba122b', 'tertiary': '#ffffff', 'background': '#ffffff' },  //Washington nationals
  { 'key': 13, 'teamId': 121, 'primary': '#002d72', 'secondary': '#ff5910', 'tertiary': '#ffffff', 'background': '#ffffff' },  //New York Mets
  { 'key': 14, 'teamId': 133, 'primary': '#003831', 'secondary': '#efb21e', 'tertiary': '#ffffff', 'background': '#ffffff' },  //oakland Athletics
  { 'key': 15, 'teamId': 134, 'primary': '#fcbb27', 'secondary': '#000000', 'tertiary': '#ffffff', 'background': '#ffffff' },  //Pittsburgh Pirates
  { 'key': 16, 'teamId': 135, 'primary': '#2f241d', 'secondary': '#ffc425', 'tertiary': '#ffffff', 'background': '#ffffff' },  //San Diego padres
  { 'key': 17, 'teamId': 136, 'primary': '#0c2c56', 'secondary': '#c4ced4', 'tertiary': '#005c5c', 'background': '#ffffff' },  //Seattle mariners
  { 'key': 18, 'teamId': 137, 'primary': '#000000', 'secondary': '#fd5a1e', 'tertiary': '#8b6f4e', 'background': '#ffffff' },  //San Francisco Giants
  { 'key': 19, 'teamId': 138, 'primary': '#c41e3a', 'secondary': '#22205f', 'tertiary': '#fdda00', 'background': '#ffffff' },  //St. Louis Cardinals
  { 'key': 20, 'teamId': 139, 'primary': '#092c5c', 'secondary': '#8fbce6', 'tertiary': '#f5d130', 'background': '#ffffff' },  //Tampa bay Rays
  { 'key': 21, 'teamId': 140, 'primary': '#bc032b', 'secondary': '#002c73', 'tertiary': '#ffffff', 'background': '#ffffff' },  //Texas Rangers
  { 'key': 22, 'teamId': 141, 'primary': '#134a8e', 'secondary': '#1d2d5c', 'tertiary': '#e8291c', 'background': '#ffffff' },  //Toronto Blue jays
  { 'key': 23, 'teamId': 142, 'primary': '#002b5c', 'secondary': '#d31145', 'tertiary': '#cfac7a', 'background': '#ffffff' },  //Minnesota Twins
  { 'key': 24, 'teamId': 143, 'primary': '#e81828', 'secondary': '#294898', 'tertiary': '#ffffff', 'background': '#ffffff' },  //Philadelphia Phillies
  { 'key': 25, 'teamId': 144, 'primary': '#cf1411', 'secondary': '#132650', 'tertiary': '#e7a801', 'background': '#ffffff' },  //Atlanta braves
  { 'key': 26, 'teamId': 145, 'primary': '#000000', 'secondary': '#c4ced4', 'tertiary': '#ffffff', 'background': '#ffffff' },  //Chicago White Sox
  { 'key': 27, 'teamId': 146, 'primary': '#000000', 'secondary': '#00A3E0', 'tertiary': '#ef3340', 'background': '#ffffff' },  //Miami Marlins
  { 'key': 28, 'teamId': 147, 'primary': '#001c43', 'secondary': '#ffffff', 'tertiary': '#001c43', 'background': '#ffffff' },  //New York Yankees
  { 'key': 29, 'teamId': 158, 'primary': '#162b48', 'secondary': '#8d744a', 'tertiary': '#ffc52f', 'background': '#ffffff' },  //Milwaukee Brewers
]


const teamTheme = 23;  // Change this one value to convert site to another team. Then build



export default function App() {
  const [readingRoster, setReadingRoster] = useState(false);
  const [rosterLoaded, setRosterLoaded] = useState(false);
  const [pitchers, setPitchers] = useState({});
  const [catchers, setCatchers] = useState({});
  const [outfield, setOutfield] = useState({});
  const [infield, setInfield] = useState({});
  const [teamId, setTeamId] = useState(teamsSetup[teamTheme].teamId);

  useEffect(() => {

    async function readRoster() {
      const readpitchers = [];
      const readcatchers = [];
      const readoutfield = [];
      const readinfield = [];



      if ((false === rosterLoaded) && (false === readingRoster)) {
        setReadingRoster(true);
        var MLBStatsAPI = require("mlb-stats-api");
        const mlbStats = new MLBStatsAPI();
        const rosterResponse = await mlbStats.getTeamRoster({ pathParams: { teamId: teamId } });
        if (rosterResponse.status === 200 || rosterResponse.status === 0) {

          for (var i = 0; i < rosterResponse.data.roster.length; i++) {
            const playerResponse = await mlbStats.getPerson({ pathParams: { personId: rosterResponse.data.roster[i].person.id } });
            if (playerResponse.status === 200 || playerResponse.status === 0) {
              switch (playerResponse.data.people[0].primaryPosition.code) {
                case "1":
                  readpitchers.push(playerResponse.data.people[0]);
                  break;
                case "2":
                  readcatchers.push(playerResponse.data.people[0]);
                  break;
                case "I":
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
                  console.log("default= " + playerResponse.data.people[0].fullName + " " + rosterResponse.data.roster[i].person.id + " " + playerResponse.data.people[0].positionName);
              }
            }
            else {
              console.log("read Player Error= " + rosterResponse.data.roster[i].fullName);
            }
          }
        } else {
          console.log("read roster ERROR = " + rosterResponse.status);
        }
        setPitchers(readpitchers);
        setCatchers(readcatchers);
        setInfield(readinfield);
        setOutfield(readoutfield);
        setReadingRoster(false);
        setRosterLoaded(true);
      };
    }

    readRoster();

  }, []);


  return (
    <>
      <div style={{ background: 'linear-gradient( 90deg, ' + teamsSetup[teamTheme].primary + ' 12%,' + teamsSetup[teamTheme].secondary + ' 12%,' + teamsSetup[teamTheme].secondary + ' 24%,' + teamsSetup[teamTheme].tertiary + ' 24%,' + teamsSetup[teamTheme].tertiary + ' 25%,' + teamsSetup[teamTheme].background + ' 25%,' + teamsSetup[teamTheme].background + ' 75%,' + teamsSetup[teamTheme].tertiary + ' 75%,' + teamsSetup[teamTheme].tertiary + ' 76%,' + teamsSetup[teamTheme].secondary + ' 76%,' + teamsSetup[teamTheme].secondary + ' 88%,' + teamsSetup[teamTheme].primary + ' 88%,' + teamsSetup[teamTheme].primary + ' 100%,' + teamsSetup[teamTheme].primary + ' 100% )' }}>
        <Banner />
        <div className="Body-header">
          <TeamBody teamId={teamId} rosterLoaded={rosterLoaded} pitchers={pitchers} catchers={catchers} outfield={outfield} infield={infield}  />
        </div>
      </div>
    </>
  );
};




function Banner() {

  return (
    <header className="App-header">

      <div className="flex flex-row ">
        <div className="basis-1/2 " />
        <div className="basis-1/4 "><img className="basis-1/2 justify-items-center content-center place-items-center text-center" src={'https://www.mlbstatic.com/team-logos/' + teamsSetup[teamTheme].teamId + '.svg'} />
        </div>
        <div className="basis-1/2 " />
      </div>

    </header>

  );
};



