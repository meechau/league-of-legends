/* API RESPONSE CODES

HTTP Status Code 	Reason
400 	Bad request
401 	Unauthorized
403 	Forbidden
404 	Data not found
405 	Method not allowed
415 	Unsupported media type
429 	Rate limit exceeded
500 	Internal server error
502 	Bad gateway
503 	Service unavailable
504 	Gateway timeout
bububub
*/



//variables for  API - user input
let summonerName = document.getElementsByName( "summoner-name-input")[0].value;
let summonerRegion = document.getElementsByName( "summoner-region-select")[0].value;

//update when user presses key
document.addEventListener('keyup', function () {
    summonerName = document.getElementsByName( "summoner-name-input" )[0].value;
});
document.getElementById("summoner-region-select").addEventListener('click', function() {
    summonerRegion = document.getElementsByName( "summoner-region-select")[0].value;
})


//variables for API to fill with data
let apiResponseAccountId = "";
let apiResponseSummonerName = "";
let apiResponseSummonerLevel = "";
let apiResponseProfileIconId = "";
let apiResponsePuuid = "";
let apiResponseSummonerId = "";


//call api proxy and pass received data into variables
function loadSummonerInfo() {
    return new Promise(function(resolve, reject) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let apiResponse = JSON.parse(this.responseText);
                //error 404:user not found
                if (apiResponse.status && apiResponse.status.status_code == 404) {
                    reject();
                }
                //success
                else {
                    resolve();
                    apiResponseAccountId = apiResponse.accountId;
                    apiResponseSummonerName = apiResponse.name;
                    apiResponseSummonerLevel = apiResponse.summonerLevel;
                    apiResponseProfileIconId = apiResponse.profileIconId;
                    apiResponsePuuid = apiResponse.puuid;
                    apiResponseSummonerId = apiResponse.id;
                }
            }
        };
        /* api url /lol/summoner/v4/summoners/by-name/{summonerName} AWS gate
        returns: accountId; profileIconId; revisionDate; name; id; puuid; summonerLevel
        */
        let httpRequestUrl = "https://q8t5nf9g54.execute-api.eu-central-1.amazonaws.com/region/" + summonerName +"/" + summonerRegion;
        xhttp.open("GET", httpRequestUrl, true); 
        xhttp.send();
    });
}


function passSummonerInfo (status) {
    if (status == "failure") {
        document.getElementById("summoner-name").innerHTML = "User not found: check your spelling and try again";
        document.getElementById("summoner-level").innerHTML = "";
        document.getElementById("summoner-icon").src = "img/question-mark.png";
    } else if (status == "success") {
        document.getElementById("summoner-name").innerHTML = apiResponseSummonerName;
        document.getElementById("summoner-level").innerHTML = "Lvl " + apiResponseSummonerLevel;
        document.getElementById("summoner-icon").src = "\dragontail\\11.3.1\\img\\profileicon\\" + apiResponseProfileIconId + ".png";
    } else {
        //empty
    }
};

//variables for API to fill with data
let apiResponseSummonerTotalMastery = "";

function loadSummonerTotalMastery() {
    return new Promise(function(resolve, reject) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let apiResponse = JSON.parse(this.responseText);
            //if user is not found and thus doesn't have an id, api returns error 400
            if (apiResponse.status && apiResponse.status.status_code == 400) {
                console.log("rejected");
                reject();
            } else {
                resolve();
                apiResponseSummonerTotalMastery = apiResponse;
            }
       };
    };
    /* api url /lol/champion-mastery/v4/scores/by-summoner/{encryptedSummonerId}} AWS gate
    returns: single integer
    */
    let httpRequestUrl = "https://aibxohbq7f.execute-api.eu-central-1.amazonaws.com/summonerTotalMastery/" + apiResponseSummonerId +"/" + summonerRegion;
    console.log(apiResponseSummonerId);
    xhttp.open("GET", httpRequestUrl, true); 
    xhttp.send();
    });
};

function passSummonerTotalMastery (status) {
    if (status == "failure") {
        document.getElementById("summoner-total-mastery").innerHTML = "";
    } else if (status == "success") {
        document.getElementById("summoner-total-mastery").innerHTML = "Mastery lvl " + apiResponseSummonerTotalMastery;
    } else {
        //empty
    }
};


function handleSummonerInfo() {
    //call first api
    loadSummonerInfo().then(function() {
        /*if summoner found*/
        //pass first api
        passSummonerInfo("success");
        //call second api
        loadSummonerTotalMastery().then(function() {
            //pass second api
            passSummonerTotalMastery("success");
        });
    }, /*if summoner not found*/
      function(err) {
        passSummonerInfo("failure");
        passSummonerTotalMastery("failure");
    });
};




/*
//DRY it

//append function to button
document.getElementById("submit-button").onclick = function(){handleSummonerInfo()};

//pressing enter in input field triggers submit
document.getElementById("summoner-name-input").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        handleSummonerInfo();
    }
});

*/

(function () {
    let userFunction = () => handleSummonerInfo();
    //append function to button
    document.getElementById("submit-button").onclick = function(){userFunction()};
    //append function to enter key
    document.getElementById("summoner-name-input").addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            userFunction();
        }
    });
  })();
