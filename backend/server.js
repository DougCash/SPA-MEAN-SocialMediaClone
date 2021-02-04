const http = require('http');
const app = require('./app');
const debug = require("debug")("node-angular");

//Set up port
const normalizePort = val => {
  var port = parseInt(val,10);

  if (isNaN(port)) {
    //named pipe
    return val;
  }
  if (port>=0){
    //port number
    return port;
  }
  return false;
};

//If issue with setting up the connection
const onError = error => {
  if (error.syscall !== "listen"){
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  switch (error.code){
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  debug("Listening on " + bind);
};

//If we get a port from the host, use it, otherwise lets use 3000
const port = normalizePort(process.env.PORT || 3000);
app.set('port', port);

//Config and launch server
const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);

