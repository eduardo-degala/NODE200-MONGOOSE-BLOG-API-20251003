//INDEX.JS (start server)

const server = require('./app');        //exports Express app, starts server
                                        //app.js sets up app & index.js boots server
server.listen(8080, function() {        //start server:  " node server/index.js ""
    console.log('Server is listening on http://localhost:8080');    //8080
});
/*
Mac Terminal:
cd ~/project/node200-mongoose-blog-api
background:  brew services start mongodb-community

VS Code Terminal:
manual start server:  node server/index.js

Browser:
local host link:      http://localhost:8080
*/