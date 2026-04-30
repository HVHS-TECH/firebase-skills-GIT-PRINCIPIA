var login_result = null;
var username = "";

//------------------------------------------------------------------------------//
//fb_login()
function fb_login() {
    console.log("fb_login() :: signing in!");
    firebase.auth().signInWithPopup(provider)
    .then((result) => {
        serializeLoginData(result);
    });
}
//------------------------------------------------------------------------------//


//------------------------------------------------------------------------------//
//serializeLoginData(result)
//result: the result of the login
async function serializeLoginData(result) {
    login_result = result;
    if (login_result == null) {
        console.warn("serializeLoginData()::the user has not logged in successfully yet!");
        return;
    }
    username = login_result.additionalUserInfo.profile.name;
    HTML_USERNAME.value = username;

    var score = await getHighScore(username);
    if (score != null) {
        HTML_HIGH_SCORE.value = score;
        displayHighScoreFromDocument();
    }
}
//------------------------------------------------------------------------------//
