const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
if(urlParams.has('title') && urlParams.has('game') && urlParams.has('tournamentId') && urlParams.has('division') && urlParams.has('dm') && urlParams.has('shadow'))
{
  title = urlParams.get('title');
  document.title = "Z Overlay | " + title;
  game = urlParams.get('game');
  tournamentID = urlParams.get('tournamentId');
  division = urlParams.get('division');
  darkmode = urlParams.get('dm');
  shadow = urlParams.get('shadow');
}
else
{
  console.log("sinceramente")
  // Simulate a mouse click:
  window.location.href = "404.html";

  // Simulate an HTTP redirect:
  window.location.replace("404.html");
}

/* SET TITLE */
document.getElementById("title").innerHTML = title;
/*  */

/* SET URL */
if(game == "fortnite") {
  pre = "v2/fortnite/";
}
else {
  pre = "";
}
/*  */

/* REQUEST TOURNAMENT INFO */
var requestInfo = new XMLHttpRequest()
requestInfo.open('GET', 'https://zleague-api.herokuapp.com/v2/tournament/' + tournamentID, true)
requestInfo.onload = function () {
  // Begin accessing JSON data here
  var tournamentInfo = JSON.parse(this.response)
  
  nBestGames = tournamentInfo.nBestGames;

  // Dates
  var startTime = new Date(tournamentInfo.startTime).getTime();
  var endTime = new Date(tournamentInfo.endTime).getTime();
  

  // Update the count down every 1 second
  countdown(startTime, endTime, timerCountdown);
  var timerCountdown = setInterval(function() {
    countdown(startTime, endTime, timerCountdown);
  }, 1000);
}

requestInfo.send()
/*  */

/* REQUEST AND FILL TABLE WITH STANDINGS INFO */
var header = '<tr>';
header += '<th id="h0" rowspan="2">#</th>';
header += '<th id="h1" rowspan="2">NAME</th>';
header += '<th id="h2" class="borderGames padding">GAMES</th>';
header += '<th id="h3" rowspan="2">WINS</th>';
header += '<th id="h4" colspan="2">BEST OF 2 GAMES</th>';
if(game == "warzone") {
  header += '<th id="h5" rowspan="2">KD</th>';
}
header += '<th id="h6" class="borderTotal padding">TOTAL</th>';
header += '</tr>';
header += '<tr>';
header += '<th id="h7">PLAYED</th>';
header += '<th id="h8" class="padding">KILLS</th>';
header += '<th id="h9" class="padding">PLACEMENT</th>';
header += '<th id="h10" class="borderPoints">POINTS</th>';
header += '</tr>';
document.getElementById("thead").innerHTML = header;

/* DARK MODE */
darkMode(darkmode, game);
/*  */

/* SHADOW */
shadows(shadow);
/*  */

fillTable(tournamentID, division, pre);
var timerUpdate = setInterval(function() {
  fillTable(tournamentID, division, pre);
}, 60000);

/**//**//**//**//**//* FUNCTIONS *//**//**//**//**//**/
/* FILL TABLE FUNCTION */
function fillTable(tournamentID, division, pre)
{
  requestTable = new XMLHttpRequest()
  requestTable.open('GET', 'https://zleague-api.herokuapp.com/' + pre + 'tournament/' + tournamentID + '/standings/' + division, true)
  requestTable.onload = function () {
    // Begin accessing JSON data here
    var table = JSON.parse(this.response)
  
    if (requestTable.status >= 200 && requestTable.status < 400) {
      lines = '';
      for(i=0;i<3;i++)
      {
        if(game == "warzone")
        {
          lines += '<tr>'
          lines += '<td>' + (i+1) + '</td>'
          lines += '<td><div style="width: 115px; overflow: hidden;">' + table[i].name + '</div></td>'
          lines += '<td>' + ("0" + table[i].total.games_played).slice(-2) + '</td>'
          lines += '<td>' + ("0" + table[i].best.wins).slice(-2) + '</td>'
          lines += '<td>' + ("00" + table[i].best.kills).slice(-2) + '</td>'
          lines += '<td>' + ("0" + table[i].best.placement).slice(-2) + '</td>'
          lines += '<td>' + Math.round((table[i].total.kills / table[i].total.deaths) * 100) / 100 + '</td>'
          lines += '<td class="borderLeft">' + ("00" + table[i].best.combined_points).slice(-2) + '</td>'
          lines += '</tr>'
        }
        else
        {
          lines += '<tr>'
          lines += '<td>' + (i+1) + '</td>'
          lines += '<td><div style="width: 207px; overflow: hidden;">' + table[i].name + '</div></td>'
          lines += '<td>' + ("0" + table[i].numberOfGames).slice(-2) + '</td>'
          lines += '<td>' + ("0" + table[i].totalWins).slice(-2) + '</td>'
          lines += '<td>' + ("00" + table[i].bestKills).slice(-2) + '</td>'
          lines += '<td>' + ("0" + table[i].bestPlacementPoints).slice(-2) + '</td>'
          lines += '<td class="borderLeft">' + ("00" + table[i].totalPoints).slice(-2) + '</td>'
          lines += '</tr>'
        }
      }
      document.getElementById("tbody").innerHTML = lines;
    } else {
      console.log('error')
    }
  }
  
  requestTable.send()
}
/*  */

/* FUNCTION COUNTDOWN */
function countdown(startTime, endTime, timerCountdown){
  // Update today's date and time
  now = new Date().getTime();

  // Set the date we're counting down to
  if(now < startTime)
  {
    countDownDate = startTime;
    strCDWN = "STARTING IN: "
  }
  else
  {
    countDownDate = endTime;
    strCDWN = "ENDING IN: "
  }

  // Update today's date and time
  now = new Date().getTime();
    
  // Find the distance between now and the count down date
  distance = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
  document.getElementById("countdown").innerHTML = strCDWN + ("0" + hours).slice(-2) + ":"
  + ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);
    
  // If the count down is over, write some text 
  if(now > endTime)
  {
    document.getElementById("countdown").innerHTML = "FINAL <br> GAME";
    clearInterval(timerCountdown);
  }
}
/*  */


/* DARK MODE FUNCTION */
function darkMode(c, game){
  if(c == 1)
  {
    document.getElementById("title").style.backgroundColor = "rgb(20, 20, 20)";
    document.getElementById("title").style.color = "white";
    document.getElementById("table").style.backgroundColor = "rgb(20, 20, 20)";
    document.getElementById("table").style.color = "white";
    document.getElementById("countdown").style.backgroundColor = "#c7764b";
    for(i=0;i<=10;i++)
    {
      if(game == "fortnite")
      {
        if(i != 5)
        {
          document.getElementById("h"+i).style.borderColor = "white";
        }
      }
      else
      {
        document.getElementById("h"+i).style.borderColor = "white";
      }
    }
  }
  else
  {
    document.getElementById("title").style.backgroundColor = "white";
    document.getElementById("title").style.color = "#020248";
    document.getElementById("table").style.backgroundColor = "white";
    document.getElementById("table").style.color = "#020248";
    document.getElementById("countdown").style.backgroundColor = "eaac8b";
    for(i=0;i<=10;i++)
    {
      if(game == "fortnite")
      {
        if(i != 5)
        {
          document.getElementById("h"+i).style.borderColor = "#020248";
        }
      }
      else
      {
        document.getElementById("h"+i).style.borderColor = "#020248";
      }
    }
  }
}
/*  */

/* SHADOWS FUNCTION */
function shadows(c){
  if(c == 1)
  {
    document.getElementById("title").style.boxShadow = "0px 0px 15px 0.5px #000";
    document.getElementById("table").style.boxShadow = "0px 0px 15px 0.5px #000";
  }
  else
  {
    document.getElementById("title").style.boxShadow = "0px 0px 0px 0px #000";
    document.getElementById("table").style.boxShadow = "0px 0px 0px 0px #000";
  }
}
/*  */