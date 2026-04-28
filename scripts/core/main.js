/**************************************************************
 **************************************************************
 **                                                          **
 ** script.js is where you will write most of your code.     **
 **                                                          **
 **************************************************************
 **************************************************************/

const HTML_OUTPUT = document.getElementById("databaseOutput");

const HTML_USERNAME = document.getElementById("i_username");
const HTML_HIGH_SCORE = document.getElementById("i_hiscore");
const HIGH_SCORE_LIST = "high-scores/";

const HTML_HIGH_SCORE_O_SINGLE = document.getElementById("o_single_hiscore");
const HTML_HIGH_SCORE_TABLE = document.getElementById("o_hiscore_table");

const HTML_SORT_NAME = document.getElementById("i_sort_name");
const HTML_SORT_SCORE = document.getElementById("i_sort_score");

initialize();

//------------------------------------------------------------------------------//
//initialize()
function initialize() {
    fb_init();
}
//------------------------------------------------------------------------------//


//------------------------------------------------------------------------------//
//cb_updateDatabaseText(val)
function cb_updateDatabaseText(val) {
    if (val == null) {
        console.error("database read returned null");
        return;
    }
    HTML_OUTPUT.innerHTML = val.val();
}
//------------------------------------------------------------------------------//



//------------------------------------------------------------------------------//
//                                 High Scores                                  //
//------------------------------------------------------------------------------//


//------------------------------------------------------------------------------//
//addHighScore(name, score)
function addHighScore(name, score) {
    console.log("addHighScore(name, score) :: adding " + name + "'s high score of " + score);
    if (name == "") {
        //Attempting to write to the ENTIRE list
        //If we did not have this check, the high score list would be overwritten by whatever is in SCORE
        console.error("addHighScore(name, score) :: attempting to overwrite the entire high score list with '" + score + "'. Aborting.");
        console.warn("addHighScoreFromDocument() :: aborting after attempt to overwrite high score list with: '" + score + "'");
        console.warn("Attempting to convert to string from JSON: '" + JSON.stringify(score) + "'");
        return;
    }
    fb_write(HIGH_SCORE_LIST + name, "", score);
}
//------------------------------------------------------------------------------//


//------------------------------------------------------------------------------//
//addHighScoreFromDocument()
//gets the high score and username from html input boxes
function addHighScoreFromDocument() {
    const SCORE = HTML_HIGH_SCORE.value;
    const USERNAME = HTML_USERNAME.value;
    if (USERNAME == "") {
        //Attempting to write to the ENTIRE list
        //If we did not have this check, the high score list would be overwritten by whatever is in SCORE
        console.error("addHighScoreFromDocument() :: attempting to overwrite the entire high score list with '" + SCORE + "'. Aborting.");
        console.warn("addHighScoreFromDocument() :: aborting after attempt to overwrite high score list with: '" + SCORE + "'");
        console.warn("Attempting to convert to string from JSON: '" + JSON.stringify(SCORE) + "'");
        return;
    }
    addHighScore(USERNAME, SCORE);
}
//------------------------------------------------------------------------------//


//------------------------------------------------------------------------------//
//getHighScore(name)
async function getHighScore(name) {
    var score = await fb_read(HIGH_SCORE_LIST + name);
    
    return score;
}
//------------------------------------------------------------------------------//


//------------------------------------------------------------------------------//
//displaySingleHighScore(name)
async function displaySingleHighScore(name) {
    const SCORE = Number(await getHighScore(name));
    if (typeof SCORE == 'number' && name != "" && SCORE != NaN) {
        const TEXT = "Name: " + name + ", high score: " + SCORE;

        HTML_HIGH_SCORE_O_SINGLE.innerHTML = TEXT;
    }
    
}
//------------------------------------------------------------------------------//


//------------------------------------------------------------------------------//
//displayHighScoreFromDocument()
async function displayHighScoreFromDocument() {
    const NAME = HTML_USERNAME.value;
    await displaySingleHighScore(NAME);
}
//------------------------------------------------------------------------------//



//------------------------------------------------------------------------------//
//displayHighScoreTable()
async function displayHighScoreTable() {
    var obj = null;
    await fb_read(HIGH_SCORE_LIST, (value)=>{displayTable(value.val());});

    function displayTable(json) {
        if (json == null) {
            console.error("displayHighScoreTable() :: read was null");
            return;
        }
        const TEXT = JSON.stringify(json);

        const SPLIT_TEXT_ARR = TEXT.split(','); //Split into key - value pairs

        var key_val_pairs = [];

        for (var i = 0; i < SPLIT_TEXT_ARR.length; i++){
            var data = SPLIT_TEXT_ARR[i];
            //Data is any of:
            //{"key":val
            //{"key":val}
            //"key":val}
            //"key": val

            //Remove brackets
            data = data.replaceAll('{', '');
            data = data.replaceAll('}', '');

            //Data is now "key":value

            //Remove "" from around keys
            data = data.replaceAll('"', '');

            //Data is now key:value

            //Split by colon
            const KEY_VAL_PAIR = data.split(':');

            key_val_pairs.push(KEY_VAL_PAIR);
        }

        //Sort data
        var sort_name = HTML_SORT_NAME.checked;
        if (sort_name) {
            //Sort by name
            key_val_pairs.sort((a,b) => {
                return a[0].localeCompare(b[0]);
            });
        } else {
            //Sort by score
            key_val_pairs.sort((a,b) => {
                return b[1] - a[1];
            });
        }
        


        var html_table_text = "";

        //Add table tag
        html_table_text += "<table>";

        //Add header
        html_table_text += "<tr><th>Name</th><th>Score</th></tr>"

        //Add key value pairs
        for (var i = 0; i < key_val_pairs.length; i++) {
            html_table_text += "<tr><td>" + key_val_pairs[i][0] + "</td><td>" + key_val_pairs[i][1] + "</td></tr>";
        }

        //Add closing table tag
        html_table_text += "</table>";

        HTML_HIGH_SCORE_TABLE.innerHTML = html_table_text;
    }
    
}
