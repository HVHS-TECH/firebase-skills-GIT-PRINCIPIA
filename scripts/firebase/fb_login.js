var login_result = null;

//------------------------------------------------------------------------------//
//fb_login()
function fb_login() {
    console.log("fb_login() :: signing in!");
    firebase.auth().signInWithRedirect(provider);
    firebase.auth()
    .getRedirectResult()
    .then(
        (result) => {
            if (result.credential) {
                //The sign in was successful
                console.log("Signed in!");
                console.log("Display name: " + login_result.displayName);
                login_result = result;
            }
        }

    );
}
//------------------------------------------------------------------------------//
