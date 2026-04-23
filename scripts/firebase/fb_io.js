/**************************************************************
 **************************************************************
 **                                                          **
 ** fb_io.js is where you will put common firebase functions **
 ** used throughout your code.                               **
 **                                                          **
 **************************************************************
 **************************************************************/


 //------------------------------------------------------------------------------//
 //fb_write(msg)
 //msg: the message to write
 function fb_write(path, msg){
    console.log("fb_write(path, msg)\npath = " + path + "\nmsg = " + msg);

    //Avoid writing to database root
    if (path == "/") {
        console.warn("fb_write(path, msg) :: attempted to write " + msg + " to the database root.");
        console.log("fb_write(path, msg) :: attempted to write to database root, returning early.");
        return;
    }
    
    firebase.database().ref(path).set(
        {
        message: msg
        }
    );
}
//------------------------------------------------------------------------------//



var reads = [];

//------------------------------------------------------------------------------//
//fb_read(path, cb)
async function fb_read(path, cb) {
    console.log("fb_read(path, cb)\npath = " + path);

    if (!reads.includes(path)) {
        reads[path] = true
    };
    if (!reads[path]) console.log("fb_read(path, cb) :: waiting for read access");
    while (!reads[path]){}
    console.log("fb_read(path, cb) :: read access gained");
    reads[path] = false;
    firebase.database().ref(path).once('value', (val)=>{reads[path] = true; cb(val);});
    
}
//------------------------------------------------------------------------------//


//------------------------------------------------------------------------------//
//fb_addWriteListener(path, cb)
function fb_addWriteListener(path, cb) {
    console.log("fb_addWriteListener(path, cb)\npath = " + path);
    firebase.database().ref(path).on('value', cb);
}
//------------------------------------------------------------------------------//
