/**************************************************************
 **************************************************************
 **                                                          **
 ** script.js is where you will write most of your code.     **
 **                                                          **
 **************************************************************
 **************************************************************/

const HTML_OUTPUT = document.getElementById("databaseOutput");


initialize();

//------------------------------------------------------------------------------//
//initialize()
function initialize() {
    fb_init();
    fb_addWriteListener('messages/message', cb_updateDatabaseText);
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