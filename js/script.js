const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
if(urlParams.has('title') && urlParams.has('link'))
{
    /* SAVING TITLE */
    var title = urlParams.get('title');
    /*  */

    /* SAVING DARK MODE OPTION*/
    if(urlParams.has('dm')) {
        dm = 1;
    }
    else {
        dm = 0;
    }
    /*  */

    /* SAVING SHADOW OPTION*/
    if(urlParams.has('shadow')) {
        shadow = 1;
    }
    else {
        shadow = 0;
    }
    /*  */

    /* SAVING TOURNAMENT ID / DIVISION */
    var link = urlParams.get('link');

    game = link.split('/')[3];

    linkInfo = link.split("?").pop();
    linkInfo = new URLSearchParams(linkInfo);
    if(linkInfo.has('tournamentId') && linkInfo.has('division'))
    {
        tournamentId = linkInfo.get('tournamentId');
        division = linkInfo.get('division');

        // Simulate a mouse click:
        window.location.href = "overlay.html?title=" + title + "&game=" + game + "&tournamentId=" + tournamentId + "&division=" + division + "&dm=" + dm + "&shadow=" + shadow;
        // Simulate an HTTP redirect:
        window.location.replace("overlay.html?title=" + title + "&game=" + game + "&tournamentId=" + tournamentId + "&division=" + division + "&dm=" + dm + "&shadow=" + shadow);
    }
    else
    {
        document.getElementById("error").style.visibility = "visible";
    }
    /*  */
}